import React, { useEffect, useRef } from 'react';

// --- Constants & Configuration ---

// Visual Styling
const OBJECT_SCALE = 200;
const MAX_BOUNCES = 6; 
const STAR_COUNT = 120;
const DUST_COUNT = 60;

// Spectrum
interface SpectralBand {
  name: string;
  color: string;
  opacity: number; 
  n: number; 
}

// Exaggerated IOR spread (1.40-1.80) for dramatic rainbow separation
const SPECTRUM: SpectralBand[] = [
  { name: 'red',    color: '#ff2a6d', opacity: 0.85, n: 1.40 },  // Low IOR = less bend
  { name: 'orange', color: '#ff9f0a', opacity: 0.85, n: 1.47 },
  { name: 'yellow', color: '#ffd60a', opacity: 0.85, n: 1.54 },
  { name: 'green',  color: '#05f7a5', opacity: 0.85, n: 1.61 },
  { name: 'blue',   color: '#0a84ff', opacity: 0.90, n: 1.68 },
  { name: 'indigo', color: '#5e5ce6', opacity: 0.90, n: 1.74 },
  { name: 'violet', color: '#bf5af2', opacity: 0.95, n: 1.80 }   // High IOR = more bend
];

const N_AIR = 1.0;

// --- Math Helpers ---

type Vec2 = { x: number; y: number };
type Vec3 = { x: number; y: number; z: number };

const vec2 = (x: number, y: number): Vec2 => ({ x, y });
const vec3 = (x: number, y: number, z: number): Vec3 => ({ x, y, z });

const add = (v1: Vec2, v2: Vec2): Vec2 => ({ x: v1.x + v2.x, y: v1.y + v2.y });
const sub = (v1: Vec2, v2: Vec2): Vec2 => ({ x: v1.x - v2.x, y: v1.y - v2.y });
const mul = (v: Vec2, s: number): Vec2 => ({ x: v.x * s, y: v.y * s });
const dot = (v1: Vec2, v2: Vec2): number => v1.x * v2.x + v1.y * v2.y;
const len = (v: Vec2): number => Math.sqrt(v.x * v.x + v.y * v.y);
const norm = (v: Vec2): Vec2 => {
  const l = len(v);
  return l > 0 ? mul(v, 1 / l) : vec2(0, 0);
};
const reflect = (dir: Vec2, normal: Vec2): Vec2 => {
    return sub(dir, mul(normal, 2 * dot(dir, normal)));
};
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;
const distToSegment = (p: Vec2, v: Vec2, w: Vec2) => {
    const l2 = (v.x - w.x)**2 + (v.y - w.y)**2;
    if (l2 === 0) return len(sub(p, v));
    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.sqrt((p.x - (v.x + t * (w.x - v.x)))**2 + (p.y - (v.y + t * (w.y - v.y)))**2);
};

// 3D Math
const sub3 = (v1: Vec3, v2: Vec3) => ({x:v1.x-v2.x, y:v1.y-v2.y, z:v1.z-v2.z});
const cross3 = (a: Vec3, b: Vec3) => ({x: a.y*b.z - a.z*b.y, y: a.z*b.x - a.x*b.z, z: a.x*b.y - a.y*b.x});
const dot3 = (a: Vec3, b: Vec3) => a.x*b.x + a.y*b.y + a.z*b.z;
const norm3 = (v: Vec3) => { const l = Math.sqrt(v.x*v.x+v.y*v.y+v.z*v.z); return l>0?{x:v.x/l, y:v.y/l, z:v.z/l}:{x:0,y:0,z:0}; };

// Rotation
const rotateX = (v: Vec3, angle: number): Vec3 => {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: v.x, y: v.y * c - v.z * s, z: v.y * s + v.z * c };
};
const rotateY = (v: Vec3, angle: number): Vec3 => {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: v.x * c + v.z * s, y: v.y, z: -v.x * s + v.z * c };
};
const rotateZ = (v: Vec3, angle: number): Vec3 => {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return { x: v.x * c - v.y * s, y: v.x * s + v.y * c, z: v.z };
};

// Convex Hull
const crossProduct = (o: Vec2, a: Vec2, b: Vec2) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

const getConvexHull = (points: Vec2[]): Vec2[] => {
    if (points.length <= 3) return points;
    const sorted = [...points].sort((a, b) => a.x === b.x ? a.y - b.y : a.x - b.x);
    
    const lower: Vec2[] = [];
    for (const p of sorted) {
        while (lower.length >= 2 && crossProduct(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
            lower.pop();
        }
        lower.push(p);
    }

    const upper: Vec2[] = [];
    for (let i = sorted.length - 1; i >= 0; i--) {
        const p = sorted[i];
        while (upper.length >= 2 && crossProduct(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
            upper.pop();
        }
        upper.push(p);
    }

    lower.pop();
    upper.pop();
    return [...lower, ...upper]; 
};

// Ray-Segment
const intersectRaySegment = (rayOrigin: Vec2, rayDir: Vec2, p1: Vec2, p2: Vec2) => {
  const v1 = sub(rayOrigin, p1);
  const v2 = sub(p2, p1);
  const v3 = vec2(-rayDir.y, rayDir.x);
  const d = dot(v2, v3);
  if (Math.abs(d) < 0.00001) return null;
  const t1 = (v2.x * v1.y - v2.y * v1.x) / d;
  const t2 = dot(v1, v3) / d;
  if (t1 >= 0 && t2 >= 0 && t2 <= 1) return { t: t1, point: add(rayOrigin, mul(rayDir, t1)) };
  return null;
};

// Ray-Hull
const intersectRayHull = (origin: Vec2, dir: Vec2, hull: Vec2[], ignoreIndex: number = -1) => {
    let minT = Infinity;
    let point: Vec2 | null = null;
    let normal = vec2(0, 0);
    let index = -1;
    let center = vec2(0,0);
    
    if (hull.length === 0) return null;
    hull.forEach(p => { center.x += p.x; center.y += p.y; });
    center.x /= hull.length;
    center.y /= hull.length;

    for (let i = 0; i < hull.length; i++) {
        if (i === ignoreIndex) continue;
        const p1 = hull[i];
        const p2 = hull[(i + 1) % hull.length];
        const hit = intersectRaySegment(origin, dir, p1, p2);
        if (hit && hit.t < minT && hit.t > 0.001) { 
            minT = hit.t;
            point = hit.point;
            index = i;
            
            const edge = sub(p2, p1);
            let N = norm(vec2(-edge.y, edge.x));
            if (dot(N, sub(p1, center)) < 0) N = mul(N, -1);
            normal = N;
        }
    }
    return point ? { t: minT, point, normal, index } : null;
};

// Ray-Bounds
const intersectRayBounds = (origin: Vec2, dir: Vec2, width: number, height: number) => {
    let tMin = Infinity;
    let normal = vec2(0, 0);

    if (dir.x !== 0) { // Left
        const t = (0 - origin.x) / dir.x;
        if (t > 0.001 && t < tMin) {
             const y = origin.y + t * dir.y;
             if (y >= 0 && y <= height) { tMin = t; normal = vec2(1, 0); }
        }
    }
    if (dir.x !== 0) { // Right
        const t = (width - origin.x) / dir.x;
        if (t > 0.001 && t < tMin) {
             const y = origin.y + t * dir.y;
             if (y >= 0 && y <= height) { tMin = t; normal = vec2(-1, 0); }
        }
    }
    if (dir.y !== 0) { // Top
        const t = (0 - origin.y) / dir.y;
        if (t > 0.001 && t < tMin) {
             const x = origin.x + t * dir.x;
             if (x >= 0 && x <= width) { tMin = t; normal = vec2(0, 1); }
        }
    }
    if (dir.y !== 0) { // Bottom
        const t = (height - origin.y) / dir.y;
        if (t > 0.001 && t < tMin) {
             const x = origin.x + t * dir.x;
             if (x >= 0 && x <= width) { tMin = t; normal = vec2(0, -1); }
        }
    }

    if (tMin === Infinity) return null;
    return { t: tMin, point: add(origin, mul(dir, tMin)), normal };
};

const refract2D = (dir: Vec2, normal: Vec2, n1: number, n2: number): Vec2 | null => {
  let N = normal;
  let cosI = -dot(dir, N);
  if (cosI < 0) { N = mul(N, -1); cosI = -dot(dir, N); }
  const eta = n1 / n2;
  const sinT2 = eta * eta * (1.0 - cosI * cosI);
  if (sinT2 > 1.0) return null; 
  const cosT = Math.sqrt(1.0 - sinT2);
  return norm(add(mul(dir, eta), mul(N, eta * cosI - cosT)));
};

// --- Geometry Generation ---

const t_val = (1.0 + Math.sqrt(5.0)) / 2.0;
const BASE_VERTS: Vec3[] = [
  vec3(-1, t_val, 0), vec3(1, t_val, 0), vec3(-1, -t_val, 0), vec3(1, -t_val, 0),
  vec3(0, -1, t_val), vec3(0, 1, t_val), vec3(0, -1, -t_val), vec3(0, 1, -t_val),
  vec3(t_val, 0, -1), vec3(t_val, 0, 1), vec3(-t_val, 0, -1), vec3(-t_val, 0, 1)
];
const BASE_FACES = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
];

let VERTS: Vec3[] = [];
let FACES: number[][] = [];

const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

// Add face spikes/craters to create asteroid-like geometry
const addFaceSpikes = (verts: Vec3[], faces: number[][]): { v: Vec3[], f: number[][] } => {
    const newVerts = [...verts];
    const newFaces: number[][] = [];

    faces.forEach((face, idx) => {
        const v0 = verts[face[0]];
        const v1 = verts[face[1]];
        const v2 = verts[face[2]];

        // Calculate face centroid
        const cx = (v0.x + v1.x + v2.x) / 3;
        const cy = (v0.y + v1.y + v2.y) / 3;
        const cz = (v0.z + v1.z + v2.z) / 3;

        // Normalize to get direction
        const cLen = Math.sqrt(cx * cx + cy * cy + cz * cz);
        const nx = cx / cLen, ny = cy / cLen, nz = cz / cLen;

        // Random: 30% craters (negative), 70% spikes (positive)
        // Subtle faceting for crystal appearance (not asteroid-like)
        const rand = seededRandom(idx * 123.456);
        const rand2 = seededRandom(idx * 789.123);
        let height: number;
        if (rand < 0.3) {
            // Crater (very subtle indent)
            height = -0.02 - rand2 * 0.03;
        } else {
            // Spike (subtle extrude for faceting)
            height = 0.03 + rand2 * 0.07;
        }

        // Add spike/crater vertex
        const spikeIdx = newVerts.length;
        newVerts.push({
            x: cx + nx * height,
            y: cy + ny * height,
            z: cz + nz * height
        });

        // Replace original face with 3 triangles
        newFaces.push([face[0], face[1], spikeIdx]);
        newFaces.push([face[1], face[2], spikeIdx]);
        newFaces.push([face[2], face[0], spikeIdx]);
    });

    return { v: newVerts, f: newFaces };
};

const generateGeometry = () => {
    VERTS = [];
    FACES = [];
    BASE_VERTS.forEach(v => {
       const l = Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
       VERTS.push({ x: v.x/l, y: v.y/l, z: v.z/l });
    });
    BASE_FACES.forEach(f => FACES.push([...f]));

    const subdivide = (currentVerts: Vec3[], currentFaces: number[][]) => {
        const newVerts = [...currentVerts];
        const newFaces: number[][] = [];
        const midPointCache = new Map<string, number>();

        const getMidPointIndex = (i1: number, i2: number): number => {
            const key = i1 < i2 ? `${i1}-${i2}` : `${i2}-${i1}`;
            if (midPointCache.has(key)) return midPointCache.get(key)!;
            const v1 = newVerts[i1];
            const v2 = newVerts[i2];
            const mid = { x: (v1.x + v2.x)/2, y: (v1.y + v2.y)/2, z: (v1.z + v2.z)/2 };
            const l = Math.sqrt(mid.x*mid.x + mid.y*mid.y + mid.z*mid.z);
            const idx = newVerts.length;
            newVerts.push({ x: mid.x/l, y: mid.y/l, z: mid.z/l });
            midPointCache.set(key, idx);
            return idx;
        };

        currentFaces.forEach(face => {
            const [i0, i1, i2] = face;
            const a = getMidPointIndex(i0, i1);
            const b = getMidPointIndex(i1, i2);
            const c = getMidPointIndex(i2, i0);
            newFaces.push([i0, a, c], [i1, b, a], [i2, c, b], [a, b, c]);
        });
        return { v: newVerts, f: newFaces };
    };

    // Only subdivide once (fewer, larger faces = more visible facets)
    let mesh = { v: VERTS, f: FACES };
    mesh = subdivide(mesh.v, mesh.f);

    // Add face spikes/craters for asteroid-like appearance
    mesh = addFaceSpikes(mesh.v, mesh.f);

    VERTS = mesh.v;
    FACES = mesh.f;

    // Apply subtle per-vertex noise for roughness while keeping uniform proportions
    VERTS = VERTS.map((v, i) => {
        const seed = i * 999.9;
        const noise = (seededRandom(seed) - 0.5) * 0.06;
        const scale = 1.0 + noise;

        return {
            x: v.x * scale,
            y: v.y * scale,
            z: v.z * scale
        };
    });
};

generateGeometry();

// --- Systems ---

class Particle {
    x: number;
    y: number;
    z: number;
    size: number;
    blinkSpeed: number;
    phase: number;
    origX: number;
    origY: number;
    isDust: boolean;
    drift: Vec2;

    constructor(width: number, height: number, isDust: boolean) {
        this.isDust = isDust;
        this.x = (Math.random() - 0.5) * width * (isDust ? 1.5 : 2.5);
        this.y = (Math.random() - 0.5) * height * (isDust ? 1.5 : 2.5);
        this.origX = this.x;
        this.origY = this.y;
        this.z = Math.random() * width;
        this.size = isDust ? Math.random() * 2 : Math.random() * 1.2;
        this.blinkSpeed = 0.01 + Math.random() * 0.04;
        this.phase = Math.random() * Math.PI * 2;
        this.drift = { x: (Math.random() - 0.5) * 0.2, y: (Math.random() - 0.5) * 0.2 };
    }

    update(parallaxX: number, parallaxY: number) {
        this.phase += this.blinkSpeed;
        if (this.isDust) {
            this.x += this.drift.x;
            this.y += this.drift.y;
        } else {
            const depthFactor = 0.05 + (1000 / (1000 + this.z)) * 0.1;
            this.x = this.origX - parallaxX * depthFactor;
            this.y = this.origY - parallaxY * depthFactor;
        }
    }

    draw(ctx: CanvasRenderingContext2D, width: number, height: number, beams: {p1:Vec2, p2:Vec2}[]) {
        const scale = 1000 / (1000 + this.z); 
        const sx = width/2 + this.x * scale;
        const sy = height/2 + this.y * scale;
        
        if (sx < -50 || sx > width + 50 || sy < -50 || sy > height + 50) return;

        let alpha = 0.2 + Math.sin(this.phase) * 0.4;
        
        // Volumetric Light Check (for dust)
        if (this.isDust) {
            alpha = 0.05; 
            for (const beam of beams) {
                const d = distToSegment({x:sx, y:sy}, beam.p1, beam.p2);
                if (d < 25) {
                    alpha += (1.0 - d/25) * 0.6; 
                }
            }
        }

        ctx.beginPath();
        ctx.arc(sx, sy, this.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, alpha)})`;
        ctx.fill();
    }
}

// --- Smoke Texture Generation ---
const createSmokeFrame = (phase: number): HTMLCanvasElement => {
    const cvs = document.createElement('canvas');
    cvs.width = 128;
    cvs.height = 128;
    const cx = cvs.getContext('2d');
    if (!cx) return cvs;

    cx.fillStyle = '#000000';
    cx.fillRect(0, 0, 128, 128);

    // Create cloud-like noise with phase offset
    for (let i = 0; i < 30; i++) {
        const seed = i * 17.31;
        const x = ((Math.sin(seed + phase * Math.PI * 2) * 0.5 + 0.5) * 128 + phase * 40) % 128;
        const y = (Math.cos(seed * 2.1 + phase * Math.PI) * 0.5 + 0.5) * 128;
        const r = 15 + Math.sin(seed * 3.7) * 10;

        const g = cx.createRadialGradient(x, y, 0, x, y, r);
        const alpha = 0.04 + Math.sin(seed) * 0.02;
        g.addColorStop(0, `rgba(255,255,255,${alpha})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        cx.fillStyle = g;
        cx.beginPath();
        cx.arc(x, y, r, 0, Math.PI * 2);
        cx.fill();
    }
    return cvs;
};

// Pre-generate smoke frames
const SMOKE_FRAME_COUNT = 12;
let smokeFrames: HTMLCanvasElement[] = [];
const initSmokeFrames = () => {
    if (typeof document === 'undefined') return;
    smokeFrames = [];
    for (let i = 0; i < SMOKE_FRAME_COUNT; i++) {
        smokeFrames.push(createSmokeFrame(i / SMOKE_FRAME_COUNT));
    }
};

// --- Helper to parse color to RGB ---
const parseColorToRGB = (color: string): { r: number; g: number; b: number } => {
    // Handle hex colors
    if (color.startsWith('#')) {
        const hex = color.slice(1);
        return {
            r: parseInt(hex.slice(0, 2), 16),
            g: parseInt(hex.slice(2, 4), 16),
            b: parseInt(hex.slice(4, 6), 16)
        };
    }
    // Default white
    return { r: 255, g: 255, b: 255 };
};

// --- Volumetric Beam Drawing ---
const drawVolumetricBeam = (
    ctx: CanvasRenderingContext2D,
    start: Vec2,
    end: Vec2,
    color: string,
    baseWidth: number,
    alpha: number,
    isIncoming: boolean,
    time: number,
    dpr: number
) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length < 1) return;

    const angle = Math.atan2(dy, dx);
    const rgb = parseColorToRGB(color);

    ctx.save();
    ctx.translate(start.x, start.y);
    ctx.rotate(angle);

    // Layer 1: Ultra-wide atmospheric haze (very diffuse)
    const hazeWidth = baseWidth * 6;
    const hazeGrad = ctx.createLinearGradient(0, -hazeWidth / 2, 0, hazeWidth / 2);
    hazeGrad.addColorStop(0, 'rgba(0,0,0,0)');
    hazeGrad.addColorStop(0.2, `rgba(${rgb.r},${rgb.g},${rgb.b},0.01)`);
    hazeGrad.addColorStop(0.35, `rgba(${rgb.r},${rgb.g},${rgb.b},0.03)`);
    hazeGrad.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b},0.05)`);
    hazeGrad.addColorStop(0.65, `rgba(${rgb.r},${rgb.g},${rgb.b},0.03)`);
    hazeGrad.addColorStop(0.8, `rgba(${rgb.r},${rgb.g},${rgb.b},0.01)`);
    hazeGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = hazeGrad;
    ctx.globalAlpha = alpha * 0.7;
    ctx.fillRect(0, -hazeWidth / 2, length, hazeWidth);

    // Layer 2: Wide outer glow
    const outerWidth = baseWidth * 4;
    const outerGrad = ctx.createLinearGradient(0, -outerWidth / 2, 0, outerWidth / 2);
    outerGrad.addColorStop(0, 'rgba(0,0,0,0)');
    outerGrad.addColorStop(0.15, `rgba(${rgb.r},${rgb.g},${rgb.b},0.02)`);
    outerGrad.addColorStop(0.3, `rgba(${rgb.r},${rgb.g},${rgb.b},0.06)`);
    outerGrad.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b},0.1)`);
    outerGrad.addColorStop(0.7, `rgba(${rgb.r},${rgb.g},${rgb.b},0.06)`);
    outerGrad.addColorStop(0.85, `rgba(${rgb.r},${rgb.g},${rgb.b},0.02)`);
    outerGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = outerGrad;
    ctx.globalAlpha = alpha * 0.6;
    ctx.fillRect(0, -outerWidth / 2, length, outerWidth);

    // Layer 3: Medium diffuse ribbon
    const midWidth = baseWidth * 2.5;
    const midGrad = ctx.createLinearGradient(0, -midWidth / 2, 0, midWidth / 2);
    midGrad.addColorStop(0, 'rgba(0,0,0,0)');
    midGrad.addColorStop(0.1, `rgba(${rgb.r},${rgb.g},${rgb.b},0.04)`);
    midGrad.addColorStop(0.25, `rgba(${rgb.r},${rgb.g},${rgb.b},0.12)`);
    midGrad.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b},0.2)`);
    midGrad.addColorStop(0.75, `rgba(${rgb.r},${rgb.g},${rgb.b},0.12)`);
    midGrad.addColorStop(0.9, `rgba(${rgb.r},${rgb.g},${rgb.b},0.04)`);
    midGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = midGrad;
    ctx.globalAlpha = alpha * 0.7;
    ctx.fillRect(0, -midWidth / 2, length, midWidth);

    // Layer 4: Soft core ribbon
    const softWidth = baseWidth * 1.5;
    const softGrad = ctx.createLinearGradient(0, -softWidth / 2, 0, softWidth / 2);
    softGrad.addColorStop(0, 'rgba(0,0,0,0)');
    softGrad.addColorStop(0.15, `rgba(${rgb.r},${rgb.g},${rgb.b},0.15)`);
    softGrad.addColorStop(0.35, `rgba(${rgb.r},${rgb.g},${rgb.b},0.35)`);
    softGrad.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b},0.5)`);
    softGrad.addColorStop(0.65, `rgba(${rgb.r},${rgb.g},${rgb.b},0.35)`);
    softGrad.addColorStop(0.85, `rgba(${rgb.r},${rgb.g},${rgb.b},0.15)`);
    softGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = softGrad;
    ctx.globalAlpha = alpha * 0.8;
    ctx.fillRect(0, -softWidth / 2, length, softWidth);

    // Layer 5: Bright core
    const coreWidth = baseWidth * 0.8;
    const coreGrad = ctx.createLinearGradient(0, -coreWidth / 2, 0, coreWidth / 2);
    coreGrad.addColorStop(0, 'rgba(0,0,0,0)');
    coreGrad.addColorStop(0.2, `rgba(${rgb.r},${rgb.g},${rgb.b},0.4)`);
    coreGrad.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b},0.7)`);
    coreGrad.addColorStop(0.8, `rgba(${rgb.r},${rgb.g},${rgb.b},0.4)`);
    coreGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = coreGrad;
    ctx.globalAlpha = alpha * 0.85;
    ctx.fillRect(0, -coreWidth / 2, length, coreWidth);

    // Layer 6: Hot center line - REMOVED for softer, more diffuse look
    // Only keep for incoming white beam, completely removed for spectral colors
    if (isIncoming) {
        const hotWidth = baseWidth * 0.1;
        const centerGrad = ctx.createLinearGradient(0, -hotWidth / 2, 0, hotWidth / 2);
        centerGrad.addColorStop(0, 'rgba(255,255,255,0)');
        centerGrad.addColorStop(0.3, `rgba(255,255,255,0.3)`);
        centerGrad.addColorStop(0.5, `rgba(255,255,255,0.5)`);
        centerGrad.addColorStop(0.7, `rgba(255,255,255,0.3)`);
        centerGrad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = centerGrad;
        ctx.globalAlpha = alpha * 0.6;
        ctx.fillRect(0, -hotWidth / 2, length, hotWidth);
    }

    // Layer 7: Smoke texture overlay (enhanced drifting effect)
    if (smokeFrames.length > 0) {
        const frameIndex = Math.floor((time * 2.5) % SMOKE_FRAME_COUNT);
        const smokeCanvas = smokeFrames[frameIndex];
        const pattern = ctx.createPattern(smokeCanvas, 'repeat');
        if (pattern) {
            ctx.globalCompositeOperation = 'screen';
            ctx.globalAlpha = alpha * (isIncoming ? 0.08 : 0.15);
            const offset = (time * 30) % 128;
            ctx.translate(-offset, 0);
            ctx.fillStyle = pattern;
            ctx.fillRect(offset, -midWidth / 2, length + 128, midWidth);
        }
    }

    ctx.restore();
};

// --- Soft Color Dispersion (atmospheric color clouds, not beam-like) ---
const drawColorDispersion = (
    ctx: CanvasRenderingContext2D,
    exitPoint: Vec2,
    direction: Vec2,
    band: SpectralBand,
    maxLength: number,
    alpha: number,
    time: number,
    dpr: number
) => {
    const rgb = parseColorToRGB(band.color);

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    // Create expanding color clouds along the direction
    // This creates soft, atmospheric dispersion instead of beam-like shapes
    const steps = 10;
    for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const dist = t * maxLength * 0.7; // Spread distance
        const pos = add(exitPoint, mul(direction, dist));

        // Radius grows with distance (cone-like spread)
        // IOR affects spread - higher IOR = more spread
        const iorSpread = (band.n - 1.40) * 150;
        const radius = (40 + t * 180 + iorSpread) * dpr;

        // Opacity fades with distance
        const fadeAlpha = alpha * (1 - t * 0.6) * band.opacity;

        // Layer 1: Ultra-soft outer haze (larger radius, softer, keeps rainbow)
        const outerRad = radius * 2.0; // Increased from 1.6 for softer spread
        const outerGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, outerRad);
        outerGrad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.03 * fadeAlpha})`);
        outerGrad.addColorStop(0.2, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.02 * fadeAlpha})`);
        outerGrad.addColorStop(0.45, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.01 * fadeAlpha})`);
        outerGrad.addColorStop(0.7, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.004 * fadeAlpha})`);
        outerGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = outerGrad;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, outerRad, 0, Math.PI * 2);
        ctx.fill();

        // Layer 2: Main color cloud (softer opacity, keeps rainbow)
        const mainGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, radius);
        mainGrad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.07 * fadeAlpha})`);
        mainGrad.addColorStop(0.2, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.045 * fadeAlpha})`);
        mainGrad.addColorStop(0.45, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.02 * fadeAlpha})`);
        mainGrad.addColorStop(0.7, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.008 * fadeAlpha})`);
        mainGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = mainGrad;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Layer 3: Soft core (softer opacity, keeps rainbow)
        const coreRad = radius * 0.4;
        const coreGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, coreRad);
        coreGrad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.08 * fadeAlpha})`);
        coreGrad.addColorStop(0.35, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.04 * fadeAlpha})`);
        coreGrad.addColorStop(0.7, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.015 * fadeAlpha})`);
        coreGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = coreGrad;
        ctx.globalAlpha = 1.0;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, coreRad, 0, Math.PI * 2);
        ctx.fill();
    }

    // NO center line - this is not a beam
    ctx.restore();
};

// --- Atmospheric Fog Layer ---
const drawAtmosphericFog = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    center: Vec2,
    time: number
) => {
    // Dark vignette
    const vignetteGrad = ctx.createRadialGradient(
        center.x, center.y, 0,
        center.x, center.y, Math.max(width, height) * 0.75
    );
    vignetteGrad.addColorStop(0, 'rgba(0,0,0,0)');
    vignetteGrad.addColorStop(0.5, 'rgba(0,0,0,0)');
    vignetteGrad.addColorStop(0.8, 'rgba(0,0,0,0.15)');
    vignetteGrad.addColorStop(1, 'rgba(0,0,0,0.4)');

    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = vignetteGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle drifting fog patches
    ctx.globalCompositeOperation = 'multiply';
    ctx.globalAlpha = 0.05;

    for (let i = 0; i < 5; i++) {
        const seed = i * 123.456;
        const x = (Math.sin(time * 0.08 + seed) * 0.3 + 0.5) * width;
        const y = (Math.cos(time * 0.06 + seed * 1.5) * 0.3 + 0.5) * height;
        const r = 180 + Math.sin(seed) * 80;

        const fogGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
        fogGrad.addColorStop(0, 'rgba(0,0,0,0.4)');
        fogGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = fogGrad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
};

// --- Quartz Crystal Interior (cloudy with inclusions) ---
const drawQuartzInterior = (
    ctx: CanvasRenderingContext2D,
    hull: Vec2[],
    time: number,
    dpr: number
) => {
    if (hull.length < 3) return;

    ctx.save();

    // Create clipping path from hull
    ctx.beginPath();
    ctx.moveTo(hull[0].x, hull[0].y);
    for (let i = 1; i < hull.length; i++) {
        ctx.lineTo(hull[i].x, hull[i].y);
    }
    ctx.closePath();
    ctx.clip();

    // Calculate hull center
    let cx = 0, cy = 0;
    hull.forEach(p => { cx += p.x; cy += p.y; });
    cx /= hull.length;
    cy /= hull.length;

    const radius = OBJECT_SCALE * dpr * 1.2;

    // Layer 1: Base cloudy fill (very subtle quartz appearance)
    const baseGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    baseGrad.addColorStop(0, 'rgba(255,255,255,0.03)');
    baseGrad.addColorStop(0.4, 'rgba(255,255,255,0.018)');
    baseGrad.addColorStop(0.7, 'rgba(255,255,255,0.008)');
    baseGrad.addColorStop(1, 'rgba(255,255,255,0.003)');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    // Layer 2: Cloudy patches (inclusions) - enhanced for better quartz look
    const patchCount = 20;
    for (let i = 0; i < patchCount; i++) {
        const seed = i * 73.419;
        const px = cx + (seededRandom(seed) - 0.5) * radius * 1.0;
        const py = cy + (seededRandom(seed + 100) - 0.5) * radius * 1.0;
        const pr = (12 + seededRandom(seed + 200) * 30) * dpr;

        // Subtle animation drift for organic feel
        const drift = Math.sin(time * 0.25 + seed) * 2 * dpr;

        const patchGrad = ctx.createRadialGradient(
            px + drift, py, 0,
            px + drift, py, pr
        );
        patchGrad.addColorStop(0, 'rgba(255,255,255,0.07)');
        patchGrad.addColorStop(0.4, 'rgba(255,255,255,0.035)');
        patchGrad.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.fillStyle = patchGrad;
        ctx.beginPath();
        ctx.arc(px + drift, py, pr, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
};

// --- Crystal Interior Haze (soft fog effect for "glowing orbs in fog" aesthetic) ---
const drawCrystalHaze = (
    ctx: CanvasRenderingContext2D,
    hull: Vec2[],
    entryPoint: Vec2,
    dpr: number
) => {
    if (hull.length < 3) return;

    ctx.save();

    // Clip to hull
    ctx.beginPath();
    hull.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.closePath();
    ctx.clip();

    // Calculate hull center
    let cx = 0, cy = 0;
    hull.forEach(p => { cx += p.x; cy += p.y; });
    cx /= hull.length;
    cy /= hull.length;

    const radius = OBJECT_SCALE * dpr * 1.3;

    // Soft white haze gradient centered on entry point (light source)
    ctx.globalCompositeOperation = 'lighter';

    const hazeGrad = ctx.createRadialGradient(
        entryPoint.x, entryPoint.y, 0,
        entryPoint.x, entryPoint.y, radius
    );
    hazeGrad.addColorStop(0, 'rgba(255,255,255,0.1)');
    hazeGrad.addColorStop(0.15, 'rgba(255,255,255,0.06)');
    hazeGrad.addColorStop(0.35, 'rgba(255,255,255,0.03)');
    hazeGrad.addColorStop(0.6, 'rgba(255,255,255,0.01)');
    hazeGrad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = hazeGrad;
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    ctx.restore();
};

// --- Internal Caustics (light focusing patterns inside crystal) ---
const drawInternalCaustics = (
    ctx: CanvasRenderingContext2D,
    entryPoint: Vec2,
    exitPoint: Vec2,
    band: SpectralBand,
    alpha: number,
    time: number,
    dpr: number
) => {
    const rgb = parseColorToRGB(band.color);

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    // Calculate path parameters
    const pathVec = sub(exitPoint, entryPoint);
    const pathLen = len(pathVec);
    if (pathLen < 1) { ctx.restore(); return; }

    const pathDir = norm(pathVec);
    const perp = vec2(-pathDir.y, pathDir.x);

    // Focus point position varies by IOR (higher IOR = earlier focus, more bend)
    const focusRatio = 0.32 + (band.n - 1.40) * 0.25;
    const focusPoint = add(entryPoint, mul(pathVec, focusRatio));

    // === Layer 1: Soft scattered glow along path (softer, larger) ===
    const scatterSteps = 8;
    for (let i = 0; i < scatterSteps; i++) {
        const t = (i + 0.5) / scatterSteps;
        const pos = add(entryPoint, mul(pathVec, t));

        // Width varies: wider at entry, narrow at focus, wider at exit
        const widthFactor = Math.abs(t - focusRatio) * 0.8 + 0.25;
        const radius = (25 + widthFactor * 40) * dpr; // Larger for softer look

        const scatterGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, radius);
        const baseAlpha = alpha * 0.08 * (1 - Math.abs(t - 0.5) * 0.3); // Slightly lower
        scatterGrad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${baseAlpha * 0.7})`);
        scatterGrad.addColorStop(0.3, `rgba(${rgb.r},${rgb.g},${rgb.b},${baseAlpha * 0.4})`);
        scatterGrad.addColorStop(0.6, `rgba(${rgb.r},${rgb.g},${rgb.b},${baseAlpha * 0.15})`);
        scatterGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = scatterGrad;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    // === Layer 2: Caustic lines (softer, thicker, more diffuse) ===
    const subRayCount = 5;
    const beamHalfWidth = 10 * dpr;

    ctx.globalAlpha = alpha * 0.2; // Reduced from 0.4 for softer look
    for (let i = 0; i < subRayCount; i++) {
        const offset = (i - (subRayCount - 1) / 2) * (beamHalfWidth * 2 / subRayCount);
        const startOffset = add(entryPoint, mul(perp, offset));
        const endOffset = add(exitPoint, mul(perp, offset * 0.3)); // Converge slightly

        // Bezier curve through focus point
        ctx.beginPath();
        ctx.moveTo(startOffset.x, startOffset.y);
        ctx.quadraticCurveTo(focusPoint.x, focusPoint.y, endOffset.x, endOffset.y);

        // Gradient along path - softer intensity
        const lineGrad = ctx.createLinearGradient(
            entryPoint.x, entryPoint.y,
            exitPoint.x, exitPoint.y
        );
        lineGrad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},0.05)`);
        lineGrad.addColorStop(Math.max(0, focusRatio - 0.12), `rgba(${rgb.r},${rgb.g},${rgb.b},0.12)`);
        lineGrad.addColorStop(focusRatio, `rgba(${rgb.r},${rgb.g},${rgb.b},0.2)`); // Reduced from 0.4
        lineGrad.addColorStop(Math.min(1, focusRatio + 0.12), `rgba(${rgb.r},${rgb.g},${rgb.b},0.12)`);
        lineGrad.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0.06)`);

        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 2.5 * dpr; // Thicker but more transparent
        ctx.stroke();
    }

    // === Layer 3: Caustic focus point (bigger, softer glow with band color) ===
    const causticRad = 18 * dpr; // Larger for softer appearance
    const causticGrad = ctx.createRadialGradient(
        focusPoint.x, focusPoint.y, 0,
        focusPoint.x, focusPoint.y, causticRad
    );
    causticGrad.addColorStop(0, `rgba(255,255,255,${alpha * 0.3})`); // White core
    causticGrad.addColorStop(0.15, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.25})`); // Band color
    causticGrad.addColorStop(0.4, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.1})`); // Fading
    causticGrad.addColorStop(0.7, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.03})`);
    causticGrad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = causticGrad;
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(focusPoint.x, focusPoint.y, causticRad, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
};

// --- Surface Highlight (soft round bloom - sci-fi stage light) ---
const drawSurfaceHighlight = (
    ctx: CanvasRenderingContext2D,
    pos: Vec2,
    normal: Vec2,  // Still accept but ignore for round shape
    color: string,
    intensity: number,
    dpr: number
) => {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    // Large soft round bloom - no elongation
    const coreRadius = 8 * dpr;
    const haloRadius = 45 * dpr;

    // Outer halo: very soft falloff
    const outerGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, haloRadius);
    outerGrad.addColorStop(0, `rgba(255,255,255,${intensity * 0.3})`);
    outerGrad.addColorStop(0.08, `rgba(255,255,255,${intensity * 0.22})`);
    outerGrad.addColorStop(0.2, `rgba(255,255,255,${intensity * 0.12})`);
    outerGrad.addColorStop(0.4, `rgba(255,255,255,${intensity * 0.05})`);
    outerGrad.addColorStop(0.65, `rgba(255,255,255,${intensity * 0.02})`);
    outerGrad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = outerGrad;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, haloRadius, 0, Math.PI * 2);
    ctx.fill();

    // Blown-out white core
    const coreGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, coreRadius);
    coreGrad.addColorStop(0, `rgba(255,255,255,${intensity * 0.6})`);
    coreGrad.addColorStop(0.5, `rgba(255,255,255,${intensity * 0.3})`);
    coreGrad.addColorStop(1, `rgba(255,255,255,0)`);

    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, coreRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
};

// --- Exit Caustic Bloom (round soft orb with rainbow band color) ---
const drawExitCausticBloom = (
    ctx: CanvasRenderingContext2D,
    exitPoint: Vec2,
    exitDir: Vec2,  // Ignored - no directional bias
    band: SpectralBand,
    alpha: number,
    dpr: number
) => {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    // Round orb - no teardrop shape
    const coreRadius = 6 * dpr;
    const haloRadius = 40 * dpr;

    // Use band color for rainbow effect
    const rgb = parseColorToRGB(band.color);

    // Soft outer halo with band color
    const haloGrad = ctx.createRadialGradient(
        exitPoint.x, exitPoint.y, 0,
        exitPoint.x, exitPoint.y, haloRadius
    );
    haloGrad.addColorStop(0, `rgba(255,255,255,${alpha * 0.2})`);
    haloGrad.addColorStop(0.1, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.15})`);
    haloGrad.addColorStop(0.3, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.08})`);
    haloGrad.addColorStop(0.55, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.03})`);
    haloGrad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(exitPoint.x, exitPoint.y, haloRadius, 0, Math.PI * 2);
    ctx.fill();

    // Blown-out white core
    const coreGrad = ctx.createRadialGradient(
        exitPoint.x, exitPoint.y, 0,
        exitPoint.x, exitPoint.y, coreRadius
    );
    coreGrad.addColorStop(0, `rgba(255,255,255,${alpha * 0.4})`);
    coreGrad.addColorStop(0.6, `rgba(255,255,255,${alpha * 0.18})`);
    coreGrad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(exitPoint.x, exitPoint.y, coreRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
};

export const PrismScene: React.FC<{ showOverlay?: boolean }> = ({ showOverlay = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const mouseRef = useRef<Vec2>({ x: 0, y: 0 });
  const smoothMouseRef = useRef<Vec2>({ x: 0, y: 0 }); 
  const rotationRef = useRef<{x:number, y:number, z:number}>({ x: 0, y: 0, z: 0 });
  const globalAlphaRef = useRef(0);
  const starsRef = useRef<Particle[]>([]);
  const dustRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    // Initialize smoke frames
    initSmokeFrames();

    const handleResize = () => {
        if (containerRef.current && canvasRef.current) {
            const { clientWidth, clientHeight } = containerRef.current;
            const dpr = window.devicePixelRatio || 1;
            canvasRef.current.width = clientWidth * dpr;
            canvasRef.current.height = clientHeight * dpr;
            canvasRef.current.style.width = `${clientWidth}px`;
            canvasRef.current.style.height = `${clientHeight}px`;

            starsRef.current = Array.from({ length: STAR_COUNT }, () => new Particle(clientWidth, clientHeight, false));
            dustRef.current = Array.from({ length: DUST_COUNT }, () => new Particle(clientWidth, clientHeight, true));

            mouseRef.current = { x: clientWidth/2, y: clientHeight/2 };
            smoothMouseRef.current = { x: clientWidth/2, y: clientHeight/2 };
        }
    };
    const handleMouseMove = (e: MouseEvent) => {
        if (canvasRef.current) {
           const rect = canvasRef.current.getBoundingClientRect();
           const padding = 20;
           let x = e.clientX - rect.left;
           let y = e.clientY - rect.top;
           x = Math.max(padding, Math.min(rect.width - padding, x));
           y = Math.max(padding, Math.min(rect.height - padding, y));
           mouseRef.current = { x, y };
        }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();
    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const render = () => {
          const width = canvas.width;
          const height = canvas.height;
          const dpr = window.devicePixelRatio || 1;
          
          timeRef.current += 0.01;
          
          // HEAVY SMOOTHING: Lowered factor from 0.1 to 0.04 for weighty, smooth feel
          smoothMouseRef.current.x = lerp(smoothMouseRef.current.x, mouseRef.current.x, 0.04);
          smoothMouseRef.current.y = lerp(smoothMouseRef.current.y, mouseRef.current.y, 0.04);

          const mx = smoothMouseRef.current.x * dpr;
          const my = smoothMouseRef.current.y * dpr;
          const center = vec2(width / 2, height / 2);
          
          // REDUCED ROTATION: Reduced base speed and mouse influence significantly for stability
          // This ensures the hull doesn't change shape rapidly, making refraction rays stable and smooth.
          rotationRef.current.x += 0.0005 + (smoothMouseRef.current.y - height/2) * 0.000001;
          rotationRef.current.y += 0.0010 + (smoothMouseRef.current.x - width/2) * 0.000001;

          // 1. Background
          const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width * 0.9);
          grad.addColorStop(0, '#0d1117');
          grad.addColorStop(0.6, '#050505');
          grad.addColorStop(1, '#000000');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);

          // 1.5. Atmospheric Fog Layer
          drawAtmosphericFog(ctx, width, height, center, timeRef.current);

          // Prepare Geometries
          const scale = OBJECT_SCALE * dpr;
          const transformed3D = VERTS.map(v => {
              let rv = rotateX(v, rotationRef.current.x);
              rv = rotateY(rv, rotationRef.current.y);
              rv = rotateZ(rv, rotationRef.current.z);
              return rv;
          });

          const projectedVerts = transformed3D.map(v => {
              return vec2(center.x + v.x * scale, center.y + v.y * scale);
          });

          const mouseVec = sub(center, vec2(mx, my));
          const rayDir = norm(mouseVec);
          const lightDir = norm3({ x: -rayDir.x, y: -rayDir.y, z: 0.8 });

          // 2. Stars (Back Layer)
          const parallaxX = smoothMouseRef.current.x - width/2; // Use smooth mouse for parallax too
          const parallaxY = smoothMouseRef.current.y - height/2;
          starsRef.current.forEach(star => {
              star.update(parallaxX, parallaxY);
              star.draw(ctx, width, height, []);
          });

          // 3. Mesh Rendering
          const facesWithDepth = FACES.map(faceIndices => {
              let z = 0;
              faceIndices.forEach(i => { z += transformed3D[i].z; });
              z /= faceIndices.length;
              const v0 = transformed3D[faceIndices[0]];
              const v1 = transformed3D[faceIndices[1]];
              const v2 = transformed3D[faceIndices[2]];
              const edge1 = sub3(v1, v0);
              const edge2 = sub3(v2, v0);
              const normal = norm3(cross3(edge1, edge2));
              const viewDot = Math.abs(normal.z); 
              const fresnel = 1.0 - viewDot; 
              const intensity = Math.max(0, dot3(normal, lightDir));
              const p0 = projectedVerts[faceIndices[0]];
              const p1 = projectedVerts[faceIndices[1]];
              const p2 = projectedVerts[faceIndices[2]];
              const area = (p1.x - p0.x) * (p1.y + p0.y) + 
                           (p2.x - p1.x) * (p2.y + p1.y) + 
                           (p0.x - p2.x) * (p0.y + p2.y);
              return { indices: faceIndices, z, isFront: area < 0, intensity, fresnel };
          }).sort((a, b) => a.z - b.z);

          ctx.lineJoin = 'round';
          ctx.lineCap = 'round';

          // Get hull first for solid glass body rendering
          const hull = getConvexHull(projectedVerts);

          if (hull.length > 0) {
              ctx.save();

              // 1. Fill hull with glass gradient (center brighter, edges subtle glow)
              ctx.beginPath();
              hull.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
              ctx.closePath();

              const cx = hull.reduce((s, p) => s + p.x, 0) / hull.length;
              const cy = hull.reduce((s, p) => s + p.y, 0) / hull.length;
              const radius = OBJECT_SCALE * dpr;

              // Subtle ambient glow - crystal catches light (visibly transparent)
              const glassGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
              glassGrad.addColorStop(0, 'rgba(255,255,255,0.04)');
              glassGrad.addColorStop(0.4, 'rgba(255,255,255,0.025)');
              glassGrad.addColorStop(0.7, 'rgba(255,255,255,0.015)');
              glassGrad.addColorStop(1, 'rgba(255,255,255,0.06)');
              ctx.fillStyle = glassGrad;
              ctx.fill();

              // 2. Diamond facet edges - VERY PROMINENT (user preference)
              facesWithDepth.filter(f => f.isFront).forEach(f => {
                  const pts = f.indices.map(i => projectedVerts[i]);
                  ctx.beginPath();
                  pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
                  ctx.closePath();

                  // Strong Fresnel-based brightness (0.25-0.85 range)
                  const edgeOpacity = 0.25 + f.fresnel * 0.6;
                  ctx.strokeStyle = `rgba(255,255,255,${edgeOpacity})`;
                  ctx.lineWidth = 0.9 * dpr;
                  ctx.stroke();

                  // Specular flash on well-lit facets (exponential falloff)
                  if (f.intensity > 0.4) {
                      const flashOpacity = Math.pow(f.intensity, 2) * 0.25;
                      ctx.fillStyle = `rgba(255,255,255,${flashOpacity})`;
                      ctx.fill();
                  }

                  // Soft prismatic rainbow fire - lower saturation, bigger glow
                  if (f.fresnel > 0.5) {
                      const hue = (f.fresnel * 360 + timeRef.current * 15) % 360;
                      // Add soft glow around rainbow edge
                      ctx.shadowBlur = 8 * dpr;
                      ctx.shadowColor = `hsla(${hue}, 60%, 60%, 0.3)`;
                      ctx.strokeStyle = `hsla(${hue}, 50%, 75%, ${f.fresnel * 0.12})`;
                      ctx.lineWidth = 1.5 * dpr;
                      ctx.stroke();
                      ctx.shadowBlur = 0;
                  }
              });

              // 2b. Back faces - VERY visible internal structure
              facesWithDepth.filter(f => !f.isFront).forEach(f => {
                  const pts = f.indices.map(i => projectedVerts[i]);
                  ctx.beginPath();
                  pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
                  ctx.closePath();
                  ctx.strokeStyle = `rgba(255,255,255,0.18)`;
                  ctx.lineWidth = 0.5 * dpr;
                  ctx.stroke();
              });

              // 3. Strong diamond hull outline with glow
              ctx.beginPath();
              hull.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
              ctx.closePath();
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
              ctx.lineWidth = 1.0 * dpr;
              ctx.shadowBlur = 10 * dpr;
              ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
              ctx.stroke();
              ctx.shadowBlur = 0;

              ctx.restore();
          }

          // 4. Light Tracing
          const activeBeams: {p1:Vec2, p2:Vec2}[] = [];
          const pulse = 0.92 + Math.sin(timeRef.current * 2) * 0.08;

          const traceSpectralRay = (
              startPoint: Vec2,
              direction: Vec2,
              band: SpectralBand,
              depth: number,
              currentAlpha: number,
              isFirstExit: boolean = false
          ) => {
              if (depth <= 0 || currentAlpha < 0.01) return;

              const hullHit = intersectRayHull(add(startPoint, mul(direction, 1.0)), direction, hull);
              const wallHit = intersectRayBounds(add(startPoint, mul(direction, 1.0)), direction, width, height);

              let target = null;
              let type = 'none';

              if (hullHit && wallHit) {
                  if (hullHit.t < wallHit.t) { target = hullHit; type = 'hull'; }
                  else { target = wallHit; type = 'wall'; }
              } else if (hullHit) { target = hullHit; type = 'hull'; }
              else if (wallHit) { target = wallHit; type = 'wall'; }

              if (!target) return;

              const modAlpha = currentAlpha * pulse;
              activeBeams.push({ p1: startPoint, p2: target.point });

              // Draw color dispersion (soft atmospheric clouds, not beams)
              if (isFirstExit && type === 'wall') {
                  // Soft color dispersion to edge of canvas
                  const maxLen = Math.sqrt(width * width + height * height);
                  drawColorDispersion(ctx, startPoint, direction, band, maxLen, modAlpha, timeRef.current, dpr);
                  // No flare at wall - just natural dispersion fade
              } else if (!isFirstExit) {
                  // Regular volumetric beam for bounces after first exit
                  const baseWidth = 30;
                  drawVolumetricBeam(ctx, startPoint, target.point, band.color, baseWidth * dpr, modAlpha, false, timeRef.current, dpr);
              }

              if (type === 'wall') {
                  // Wall reflection (no flare)
                  const dReflect = reflect(direction, target.normal);
                  traceSpectralRay(target.point, dReflect, band, depth - 1, currentAlpha * 0.7, false);
              }
              else if (type === 'hull' && hullHit) {
                  // Re-entry into crystal - surface highlight instead of flare
                  drawSurfaceHighlight(ctx, target.point, hullHit.normal, band.color, 0.3 * modAlpha, dpr);

                  const dIn = refract2D(direction, hullHit.normal, N_AIR, band.n);
                  if (!dIn) {
                       const dReflect = reflect(direction, hullHit.normal);
                       traceSpectralRay(target.point, dReflect, band, depth - 1, currentAlpha * 0.5, false);
                       return;
                  }
                  const exitHit = intersectRayHull(add(hullHit.point, mul(dIn, 0.1)), dIn, hull, hullHit.index);
                  if (!exitHit) return;

                  // Internal caustics instead of thin line
                  drawInternalCaustics(
                      ctx,
                      hullHit.point,
                      exitHit.point,
                      band,
                      currentAlpha * pulse,
                      timeRef.current,
                      dpr
                  );

                  const dOut = refract2D(dIn, exitHit.normal, band.n, N_AIR);
                  if (!dOut) return;

                  // Exit caustic bloom
                  drawExitCausticBloom(ctx, exitHit.point, dOut, band, currentAlpha * 0.5, dpr);

                  traceSpectralRay(exitHit.point, dOut, band, depth - 1, currentAlpha * 0.85, false);
              }
          };

          const mouse = vec2(mx, my);
          const entryHit = intersectRayHull(mouse, rayDir, hull);
          const targetAlpha = entryHit ? 1.0 : 0.0;
          globalAlphaRef.current += (targetAlpha - globalAlphaRef.current) * 0.1;

          ctx.save();
          ctx.globalAlpha = globalAlphaRef.current;
          ctx.globalCompositeOperation = 'lighter'; 
          
          const beamEnd = entryHit ? entryHit.point : add(mouse, mul(rayDir, Math.max(width, height)));
          activeBeams.push({ p1: mouse, p2: beamEnd });

          // Main Incoming Beam (wider, more diffuse white volumetric)
          drawVolumetricBeam(ctx, mouse, beamEnd, '#ffffff', 18 * dpr, globalAlphaRef.current, true, timeRef.current, dpr);

          // Additional sharp white core with glow (reduced brightness)
          ctx.save();
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(255,255,255,0.4)';
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(beamEnd.x, beamEnd.y);
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5 * dpr;
          ctx.globalAlpha = globalAlphaRef.current * 0.5;
          ctx.stroke();
          ctx.shadowBlur = 0;
          ctx.restore();

          if (entryHit && globalAlphaRef.current > 0.01) {
              // Step 1: Crystal interior haze (soft fog for "orbs in fog" aesthetic)
              drawCrystalHaze(ctx, hull, entryHit.point, dpr);

              // Step 2: Entry surface highlight (soft round bloom)
              drawSurfaceHighlight(ctx, entryHit.point, entryHit.normal, '#ffffff', 0.8, dpr);

              // Step 3: Process each spectral band
              SPECTRUM.forEach(band => {
                  const dIn = refract2D(rayDir, entryHit.normal, N_AIR, band.n);
                  if (!dIn) return;
                  const exitHit = intersectRayHull(add(entryHit.point, mul(dIn, 0.1)), dIn, hull, entryHit.index);
                  if (!exitHit) return;

                  // Step 4: Draw internal caustics (replaces thin lines)
                  drawInternalCaustics(
                      ctx,
                      entryHit.point,
                      exitHit.point,
                      band,
                      globalAlphaRef.current * pulse,
                      timeRef.current,
                      dpr
                  );

                  const dOut = refract2D(dIn, exitHit.normal, band.n, N_AIR);
                  if (dOut) {
                      // Step 5: Directional exit caustic bloom (replaces spherical flare)
                      drawExitCausticBloom(ctx, exitHit.point, dOut, band, globalAlphaRef.current * 0.6, dpr);

                      // Step 6: External color dispersion (keep existing)
                      const maxLen = Math.sqrt(width * width + height * height);
                      drawColorDispersion(ctx, exitHit.point, dOut, band, maxLen, globalAlphaRef.current * pulse, timeRef.current, dpr);

                      // Step 7: Continue tracing bounces
                      traceSpectralRay(exitHit.point, dOut, band, MAX_BOUNCES, globalAlphaRef.current * 0.8, true);
                  }
              });
              // Composite exit flare REMOVED - was not physically motivated
          }

          // 5. Dust (Volumetric)
          // Draw on top of beams but inside the additive context
          dustRef.current.forEach(d => {
              d.update(0,0);
              d.draw(ctx, width, height, activeBeams);
          });

          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = 1.0;
          ctx.restore();

          animationFrameRef.current = requestAnimationFrame(render);
      };
      render();
      return () => {
          if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-screen bg-[#050505] overflow-hidden ${showOverlay ? 'cursor-none' : ''}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
      
      {/* UI Overlay */}
      {showOverlay && (
        <>
          <div className="absolute top-8 left-8 z-10 pointer-events-none select-none mix-blend-difference">
            <h1 className="text-white font-serif text-4xl tracking-tight mb-2">Spectral Refraction Lab</h1>
            <div className="flex items-center gap-3">
              <div className="w-12 h-[1px] bg-[#17f7f7]"></div>
              <p className="text-[#17f7f7] font-mono text-xs uppercase tracking-widest opacity-90">
                Volumetric Optics • High-Fidelity Physics
              </p>
            </div>
          </div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-center w-full px-4">
            <p className="text-white/30 font-mono text-[10px] uppercase tracking-[0.3em] animate-pulse">
              Interact
            </p>
          </div>
        </>
      )}
    </div>
  );
};
