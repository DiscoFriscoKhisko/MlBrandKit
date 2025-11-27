import React, { useEffect, useRef } from 'react';

// --- Constants & Configuration ---

const OBJECT_SCALE = 135;
const MAX_BOUNCES = 4; // Reduced for clarity with wider beams
const STAR_COUNT = 150; // More background stars for depth
const DUST_COUNT = 80;

// Spectrum
interface SpectralBand {
  name: string;
  color: string;
  opacity: number; 
  n: number; 
}

const SPECTRUM: SpectralBand[] = [
  { name: 'red',    color: '#ff2a6d', opacity: 0.8, n: 1.42 }, 
  { name: 'orange', color: '#ff9f0a', opacity: 0.8, n: 1.52 },
  { name: 'yellow', color: '#ffd60a', opacity: 0.8, n: 1.62 },
  { name: 'green',  color: '#05f7a5', opacity: 0.8, n: 1.72 }, 
  { name: 'blue',   color: '#0a84ff', opacity: 0.9, n: 1.82 },
  { name: 'indigo', color: '#5e5ce6', opacity: 0.9, n: 1.92 },
  { name: 'violet', color: '#bf5af2', opacity: 1.0, n: 2.02 }  
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

    let mesh = { v: VERTS, f: FACES };
    mesh = subdivide(mesh.v, mesh.f); 
    mesh = subdivide(mesh.v, mesh.f); 
    VERTS = mesh.v;
    FACES = mesh.f;

    VERTS = VERTS.map((v, i) => {
        const seed = i * 999.9; 
        const n1 = seededRandom(seed);
        const n2 = seededRandom(seed * 7.13);
        const n3 = seededRandom(seed * 1.41);
        const n4 = seededRandom(seed * 0.2);
        let scale = 1.0;
        if (n1 < 0.35) scale -= 0.15 + (n1 * 0.15); 
        else if (n1 > 0.75) scale += 0.1 + (n2 * 0.05);
        scale += (n3 - 0.5) * 0.06;
        scale += (n4 - 0.5) * 0.12;
        return { x: v.x * scale, y: v.y * scale, z: v.z * scale };
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
                if (d < 35) {
                    alpha += (1.0 - d/35) * 0.8; 
                }
            }
        }

        ctx.beginPath();
        ctx.arc(sx, sy, this.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, alpha)})`;
        ctx.fill();
    }
}

// Noise Generation for Smoky Fog
const createNoiseTexture = () => {
    if (typeof document === 'undefined') return null;
    const cvs = document.createElement('canvas');
    cvs.width = 256; 
    cvs.height = 256;
    const cx = cvs.getContext('2d');
    if (!cx) return null;
    
    cx.fillStyle = '#000000';
    cx.fillRect(0,0,256,256);
    
    // Create cloud-like noise
    for (let i = 0; i < 60; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        const r = 20 + Math.random() * 60;
        const g = cx.createRadialGradient(x,y,0, x,y,r);
        g.addColorStop(0, `rgba(255,255,255, ${0.05 + Math.random()*0.05})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        cx.fillStyle = g;
        cx.beginPath(); cx.arc(x,y,r,0,Math.PI*2); cx.fill();
    }
    return cvs;
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
  const noisePatternRef = useRef<CanvasImageSource | null>(null);

  useEffect(() => {
    // Init Noise
    const noise = createNoiseTexture();
    if (noise) noisePatternRef.current = noise;

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
          
          timeRef.current += 0.005;
          
          smoothMouseRef.current.x = lerp(smoothMouseRef.current.x, mouseRef.current.x, 0.04);
          smoothMouseRef.current.y = lerp(smoothMouseRef.current.y, mouseRef.current.y, 0.04);

          const mx = smoothMouseRef.current.x * dpr;
          const my = smoothMouseRef.current.y * dpr;
          const center = vec2(width / 2, height / 2);
          
          rotationRef.current.x += 0.0005 + (smoothMouseRef.current.y - height/2) * 0.000001;
          rotationRef.current.y += 0.0010 + (smoothMouseRef.current.x - width/2) * 0.000001;

          // 1. Deep Atmospheric Background
          const bgGrad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width * 1.2);
          bgGrad.addColorStop(0, '#0a0a0a'); 
          bgGrad.addColorStop(0.4, '#050505');
          bgGrad.addColorStop(1, '#000000');
          ctx.fillStyle = bgGrad;
          ctx.fillRect(0, 0, width, height);

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
          const parallaxX = smoothMouseRef.current.x - width/2; 
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
          
          facesWithDepth.forEach(f => {
              if (f.isFront) return; 
              const pts = f.indices.map(i => projectedVerts[i]);
              ctx.beginPath();
              ctx.moveTo(pts[0].x, pts[0].y);
              ctx.lineTo(pts[1].x, pts[1].y);
              ctx.lineTo(pts[2].x, pts[2].y);
              ctx.closePath();
              ctx.strokeStyle = `rgba(23, 247, 247, 0.04)`;
              ctx.lineWidth = 0.5 * dpr;
              ctx.stroke();
          });

          facesWithDepth.forEach(f => {
              if (!f.isFront) return; 
              const pts = f.indices.map(i => projectedVerts[i]);
              ctx.beginPath();
              ctx.moveTo(pts[0].x, pts[0].y);
              ctx.lineTo(pts[1].x, pts[1].y);
              ctx.lineTo(pts[2].x, pts[2].y);
              ctx.closePath();
              const baseFill = 0.02;
              const specular = f.intensity * 0.25; 
              const fresnelGlow = f.fresnel * 0.15;
              const fillOpacity = baseFill + specular + fresnelGlow;
              ctx.fillStyle = `rgba(23, 247, 247, ${fillOpacity})`;
              ctx.fill();
              const strokeOpacity = 0.05 + f.fresnel * 0.3 + f.intensity * 0.2;
              ctx.strokeStyle = `rgba(23, 247, 247, ${strokeOpacity})`; 
              ctx.lineWidth = 0.5 * dpr; 
              ctx.stroke();
          });

          const hull = getConvexHull(projectedVerts);
          if (hull.length > 0) {
              ctx.beginPath();
              ctx.moveTo(hull[0].x, hull[0].y);
              for (let i = 1; i < hull.length; i++) { ctx.lineTo(hull[i].x, hull[i].y); }
              ctx.closePath();
              ctx.lineWidth = 2.0 * dpr;
              ctx.strokeStyle = '#17f7f7'; 
              ctx.shadowBlur = 15; 
              ctx.shadowColor = '#17f7f7';
              ctx.stroke();
              ctx.shadowBlur = 0;
          }

          // 4. Volumetric Light Systems
          const activeBeams: {p1:Vec2, p2:Vec2}[] = [];
          const pulse = 0.9 + Math.sin(timeRef.current * 3) * 0.1;

          // Helper for Volumetric Beams ("Ribbons")
          const drawVolumetricBeam = (
              start: Vec2, 
              end: Vec2, 
              color: string, 
              widthPx: number, 
              alpha: number,
              hasSmoke: boolean
          ) => {
              const dx = end.x - start.x;
              const dy = end.y - start.y;
              const length = Math.sqrt(dx*dx + dy*dy);
              const angle = Math.atan2(dy, dx);

              ctx.save();
              ctx.translate(start.x, start.y);
              ctx.rotate(angle);

              // 1. Core Ribbon (Gradient across width)
              // We draw a rect from (0, -w/2) to (len, w/2)
              // Gradient is vertical (y-axis in local space)
              const grad = ctx.createLinearGradient(0, -widthPx/2, 0, widthPx/2);
              grad.addColorStop(0, 'rgba(0,0,0,0)');
              grad.addColorStop(0.2, color.replace(')', ', 0.0)')); // Fade in
              grad.addColorStop(0.5, color); // Bright Center
              grad.addColorStop(0.8, color.replace(')', ', 0.0)')); // Fade out
              grad.addColorStop(1, 'rgba(0,0,0,0)');
              
              ctx.fillStyle = grad;
              ctx.globalAlpha = alpha;
              // Composite lighter for additive blending
              ctx.globalCompositeOperation = 'lighter';
              ctx.fillRect(0, -widthPx/2, length, widthPx);

              // 2. Smoky Texture (Drifting)
              if (hasSmoke && noisePatternRef.current) {
                   ctx.globalAlpha = alpha * 0.4;
                   ctx.globalCompositeOperation = 'overlay'; 
                   const pattern = ctx.createPattern(noisePatternRef.current as any, 'repeat');
                   if (pattern) {
                       // Scroll the texture
                       const offset = (timeRef.current * 20) % 256;
                       ctx.translate(-offset, 0);
                       ctx.fillStyle = pattern;
                       ctx.fillRect(offset, -widthPx/2, length, widthPx);
                   }
              }

              ctx.restore();
          };

          const drawFlare = (pos: Vec2, color: string, scale: number, isExit: boolean = false) => {
               const rad = (isExit ? 60 : 20) * scale * dpr;
               const g = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, rad);
               g.addColorStop(0, isExit ? '#ffffff' : 'rgba(255,255,255,0.9)');
               g.addColorStop(isExit ? 0.2 : 0.4, color);
               g.addColorStop(1, 'rgba(0,0,0,0)');
               ctx.fillStyle = g;
               ctx.globalCompositeOperation = 'lighter';
               ctx.beginPath();
               ctx.arc(pos.x, pos.y, rad, 0, Math.PI*2);
               ctx.fill();
          };

          const traceSpectralRay = (
              startPoint: Vec2, 
              direction: Vec2, 
              band: SpectralBand, 
              depth: number,
              currentAlpha: number
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

              // Draw Wide Ribbon Beam
              // Width increases with depth? Or constant? User said "broader diverging beams".
              // Let's make them fairly wide (e.g. 40px) to look like sheets
              drawVolumetricBeam(
                  startPoint, 
                  target.point, 
                  band.color, 
                  40 * dpr, 
                  modAlpha * 0.4,
                  true
              );

              if (type === 'wall') {
                  drawFlare(target.point, band.color, 0.8 * modAlpha);
                  const dReflect = reflect(direction, target.normal);
                  traceSpectralRay(target.point, dReflect, band, depth - 1, currentAlpha * 0.8);
              } 
              else if (type === 'hull' && hullHit) {
                  drawFlare(target.point, band.color, 0.8 * modAlpha);
                  const dIn = refract2D(direction, hullHit.normal, N_AIR, band.n);
                  if (!dIn) {
                       const dReflect = reflect(direction, hullHit.normal);
                       traceSpectralRay(target.point, dReflect, band, depth - 1, currentAlpha * 0.6);
                       return;
                  }
                  const exitHit = intersectRayHull(add(hullHit.point, mul(dIn, 0.1)), dIn, hull, hullHit.index);
                  if (!exitHit) return; 

                  // Internal Beam (keep sharp/thin)
                  ctx.beginPath();
                  ctx.moveTo(hullHit.point.x, hullHit.point.y);
                  ctx.lineTo(exitHit.point.x, exitHit.point.y);
                  ctx.strokeStyle = band.color;
                  ctx.lineWidth = 2 * dpr;
                  ctx.globalAlpha = currentAlpha * 0.8 * pulse; 
                  ctx.stroke();

                  const dOut = refract2D(dIn, exitHit.normal, band.n, N_AIR);
                  if (!dOut) return; 
                  traceSpectralRay(exitHit.point, dOut, band, depth - 1, currentAlpha * 0.9);
              }
          };

          const mouse = vec2(mx, my);
          const entryHit = intersectRayHull(mouse, rayDir, hull);
          const targetAlpha = entryHit ? 1.0 : 0.0;
          globalAlphaRef.current += (targetAlpha - globalAlphaRef.current) * 0.1;

          ctx.save();
          // Apply global 'lighter' for the beam system
          ctx.globalCompositeOperation = 'lighter'; 
          
          const beamEnd = entryHit ? entryHit.point : add(mouse, mul(rayDir, Math.max(width, height)));
          activeBeams.push({ p1: mouse, p2: beamEnd });

          // Main Beam: Sharp White -> Slightly Soft
          if (globalAlphaRef.current > 0.001) {
               // Draw Main Beam
               drawVolumetricBeam(
                   mouse,
                   beamEnd,
                   'rgba(255,255,255,1)',
                   8 * dpr, // Sharper than spectrum
                   0.8,
                   true
               );
          }

          if (entryHit) {
               drawFlare(entryHit.point, '#ffffff', 1.5); // Impact Flare
          }

          if (entryHit && globalAlphaRef.current > 0.01) {
              
              // Find the "Exit Point" (Brightest Spot) logic
              // We'll trace spectral rays. The first exit point of the prism is the "source" of the rainbow.
              // We can add a massive flare there.
              
              SPECTRUM.forEach((band, i) => {
                  const dIn = refract2D(rayDir, entryHit.normal, N_AIR, band.n);
                  if (!dIn) return;
                  const exitHit = intersectRayHull(add(entryHit.point, mul(dIn, 0.1)), dIn, hull, entryHit.index);
                  if (!exitHit) return;

                  // Draw Internal Beam
                  ctx.beginPath();
                  ctx.moveTo(entryHit.point.x, entryHit.point.y);
                  ctx.lineTo(exitHit.point.x, exitHit.point.y);
                  ctx.strokeStyle = band.color;
                  ctx.lineWidth = 2 * dpr;
                  ctx.globalAlpha = band.opacity * 0.6 * globalAlphaRef.current * pulse;
                  ctx.stroke();

                  // Massive Exit Flare (Only draw once effectively or per band with add)
                  // We'll draw it per band but smaller, stacking up to white/bright
                  drawFlare(exitHit.point, band.color, 1.0, true);

                  const dOut = refract2D(dIn, exitHit.normal, band.n, N_AIR);
                  if (dOut) {
                      traceSpectralRay(exitHit.point, dOut, band, MAX_BOUNCES, globalAlphaRef.current);
                  }
              });
          }

          // 5. Dust (Volumetric)
          // Draw on top but subtle
          ctx.globalCompositeOperation = 'source-over';
          dustRef.current.forEach(d => {
              d.update(0,0);
              d.draw(ctx, width, height, activeBeams);
          });

          ctx.restore();
          animationFrameRef.current = requestAnimationFrame(render);
      };
      render();
      return () => {
          if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${showOverlay ? 'cursor-none' : ''}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
