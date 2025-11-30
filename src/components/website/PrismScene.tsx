import React, { useEffect, useRef, useState, useCallback } from 'react';

// --- Config Interface ---
interface PrismConfig {
  // === CRYSTAL SHAPE ===
  crystalScale: number;           // 80-350 (size)
  subdivisionLevel: number;       // 0-3 (smoothness)
  facetDepth: number;             // 0-1 (outer spikes/craters)

  // === INTERNAL STRUCTURE === (outer space crystal look)
  internalFacets: number;         // 0-1 (phantom crystal layers inside)
  needleDensity: number;          // 0-1 (rutile-like needle inclusions)
  fractureDensity: number;        // 0-1 (rainbow-creating internal cracks)
  veilOpacity: number;            // 0-1 (milky cloud wisps inside)

  // === SURFACE ===
  edgeBrightness: number;         // 0-1 (wireframe visibility)
  surfaceGlow: number;            // 0-0.2 (ambient glow)
  rainbowFire: number;            // 0-1 (prismatic edge colors)

  // === LIGHT PHYSICS ===
  iorBase: number;                // 1.0-2.5 (base refraction index)
  abbeNumber: number;             // 15-70 (dispersion: lower = more rainbow)
  dispersionStrength: number;     // 0.1-3.0 (how much colors spread apart)
  absorption: number;             // 0-0.8 (light absorbed inside)
  scattering: number;             // 0-1 (internal light scatter)

  // === LIGHT BEAM ===
  beamWidth: number;              // 5-60
  beamIntensity: number;          // 0-1
  exitRaySpread: number;          // 0-1 (how much colors fan out)
  flareIntensity: number;         // 0-1 (bloom at exit points)

  // === MOTION (Spring Physics) ===
  motionMass: number;             // 0.5-3 (inertia/weight)
  motionStiffness: number;        // 50-300 (snap response)
  motionDamping: number;          // 10-40 (settling speed)
  rotationSpeed: number;          // 0-0.01 (auto-rotate)

  // === ENVIRONMENT ===
  atmosphereHaze: number;         // 0-1 (scene fog)
  vignette: number;               // 0-1 (edge darkening)
}

const DEFAULT_CONFIG: PrismConfig = {
  // === CRYSTAL SHAPE ===
  crystalScale: 150,
  subdivisionLevel: 3,
  facetDepth: 0.1,

  // === INTERNAL STRUCTURE ===
  internalFacets: 0.2,
  needleDensity: 0.0,
  fractureDensity: 0.2,
  veilOpacity: 0.25,

  // === SURFACE ===
  edgeBrightness: 0.3,
  surfaceGlow: 0.0,
  rainbowFire: 0.3,

  // === LIGHT PHYSICS ===
  iorBase: 1.52,
  abbeNumber: 25,
  dispersionStrength: 3.0,
  absorption: 0.8,
  scattering: 0.6,

  // === LIGHT BEAM ===
  beamWidth: 59,
  beamIntensity: 0.35,
  exitRaySpread: 0.4,
  flareIntensity: 0.01,

  // === MOTION (SPRING PHYSICS) ===
  motionMass: 2.0,
  motionStiffness: 80,
  motionDamping: 18,
  rotationSpeed: 0.001,

  // === ENVIRONMENT ===
  atmosphereHaze: 1.0,
  vignette: 0.5,
};

// --- Control Panel Components ---
const Slider: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}> = ({ label, value, min, max, step, unit = '', onChange }) => (
  <div className="mb-3">
    <div className="flex justify-between text-xs mb-1">
      <span className="text-white/60">{label}</span>
      <span className="text-[#17f7f7] font-mono">{value.toFixed(step < 0.01 ? 4 : step < 0.1 ? 2 : 0)}{unit}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={e => onChange(parseFloat(e.target.value))}
      className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer
                 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                 [&::-webkit-slider-thumb]:bg-[#17f7f7] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
    />
  </div>
);

const Select: React.FC<{
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}> = ({ label, value, options, onChange }) => (
  <div className="mb-3">
    <label className="text-white/60 text-xs mb-1 block">{label}</label>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-xs focus:border-[#17f7f7] outline-none"
    >
      {options.map(opt => (
        <option key={opt} value={opt} className="bg-black">{opt}</option>
      ))}
    </select>
  </div>
);

const ColorPicker: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ label, value, onChange }) => (
  <div className="mb-3 flex items-center justify-between">
    <span className="text-white/60 text-xs">{label}</span>
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-6 h-6 rounded cursor-pointer bg-transparent border border-white/10"
      />
      <span className="text-[#17f7f7] font-mono text-xs">{value}</span>
    </div>
  </div>
);

const Section: React.FC<{
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ title, isOpen, onToggle, children }) => (
  <div className="border-b border-white/5">
    <button
      onClick={onToggle}
      className="w-full px-3 py-2 flex items-center justify-between text-white/80 hover:text-white text-xs uppercase tracking-wider"
    >
      {title}
      <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    {isOpen && <div className="px-3 pb-3">{children}</div>}
  </div>
);

interface ControlPanelProps {
  config: PrismConfig;
  onChange: (key: keyof PrismConfig, value: PrismConfig[keyof PrismConfig]) => void;
  onReset: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ config, onChange, onReset, isOpen, onToggle }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    crystal: true,
    internal: false,
    surface: false,
    physics: false,
    beam: false,
    motion: false,
    environment: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className={`fixed top-4 right-4 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-[calc(100%+1rem)]'}`}>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -left-12 top-0 w-10 h-10 bg-black/80 border border-white/10 rounded-l-md flex items-center justify-center text-[#17f7f7] hover:bg-black/90 transition-colors"
      >
        <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Panel */}
      <div className="w-80 max-h-[85vh] overflow-y-auto bg-black/95 backdrop-blur-md border border-white/10 rounded-md scrollbar-thin scrollbar-thumb-white/10">
        <div className="p-3 border-b border-white/10 flex items-center justify-between gap-4">
          <h2 className="text-[#17f7f7] font-mono text-xs uppercase tracking-widest truncate flex-1">Controls</h2>
          <button
            onClick={onReset}
            className="text-white/40 hover:text-[#17f7f7] text-xs uppercase tracking-wider transition-colors flex-shrink-0"
          >
            Reset
          </button>
        </div>

        {/* Crystal Shape */}
        <Section title="Crystal Shape" isOpen={openSections.crystal} onToggle={() => toggleSection('crystal')}>
          <Slider label="Crystal Size" value={config.crystalScale} min={80} max={350} step={10} onChange={v => onChange('crystalScale', v)} />
          <Slider label="Subdivision Level" value={config.subdivisionLevel} min={0} max={3} step={1} onChange={v => onChange('subdivisionLevel', v)} />
          <Slider label="Facet Depth" value={config.facetDepth} min={0} max={1} step={0.05} onChange={v => onChange('facetDepth', v)} />
        </Section>

        {/* Internal Structure */}
        <Section title="Internal Structure" isOpen={openSections.internal} onToggle={() => toggleSection('internal')}>
          <Slider label="Phantom Crystals" value={config.internalFacets} min={0} max={1} step={0.05} onChange={v => onChange('internalFacets', v)} />
          <Slider label="Needle Inclusions" value={config.needleDensity} min={0} max={1} step={0.05} onChange={v => onChange('needleDensity', v)} />
          <Slider label="Fracture Density" value={config.fractureDensity} min={0} max={1} step={0.05} onChange={v => onChange('fractureDensity', v)} />
          <Slider label="Cloud Veils" value={config.veilOpacity} min={0} max={1} step={0.05} onChange={v => onChange('veilOpacity', v)} />
        </Section>

        {/* Surface */}
        <Section title="Surface" isOpen={openSections.surface} onToggle={() => toggleSection('surface')}>
          <Slider label="Edge Brightness" value={config.edgeBrightness} min={0} max={1} step={0.05} onChange={v => onChange('edgeBrightness', v)} />
          <Slider label="Surface Glow" value={config.surfaceGlow} min={0} max={0.2} step={0.01} onChange={v => onChange('surfaceGlow', v)} />
          <Slider label="Rainbow Fire" value={config.rainbowFire} min={0} max={1} step={0.05} onChange={v => onChange('rainbowFire', v)} />
        </Section>

        {/* Light Physics */}
        <Section title="Light Physics" isOpen={openSections.physics} onToggle={() => toggleSection('physics')}>
          <Slider label="IOR Base" value={config.iorBase} min={1.0} max={2.5} step={0.05} onChange={v => onChange('iorBase', v)} />
          <Slider label="Abbe Number" value={config.abbeNumber} min={15} max={70} step={1} unit="" onChange={v => onChange('abbeNumber', v)} />
          <Slider label="Dispersion Strength" value={config.dispersionStrength} min={0.1} max={3.0} step={0.1} onChange={v => onChange('dispersionStrength', v)} />
          <Slider label="Absorption" value={config.absorption} min={0} max={0.8} step={0.05} onChange={v => onChange('absorption', v)} />
          <Slider label="Scattering" value={config.scattering} min={0} max={1} step={0.05} onChange={v => onChange('scattering', v)} />
        </Section>

        {/* Light Beam */}
        <Section title="Light Beam" isOpen={openSections.beam} onToggle={() => toggleSection('beam')}>
          <Slider label="Beam Width" value={config.beamWidth} min={5} max={60} step={2} onChange={v => onChange('beamWidth', v)} />
          <Slider label="Beam Intensity" value={config.beamIntensity} min={0} max={1} step={0.05} onChange={v => onChange('beamIntensity', v)} />
          <Slider label="Exit Ray Spread" value={config.exitRaySpread} min={0} max={1} step={0.05} onChange={v => onChange('exitRaySpread', v)} />
          <Slider label="Flare Intensity" value={config.flareIntensity} min={0} max={1} step={0.05} onChange={v => onChange('flareIntensity', v)} />
        </Section>

        {/* Motion (Spring Physics) */}
        <Section title="Motion (Spring Physics)" isOpen={openSections.motion} onToggle={() => toggleSection('motion')}>
          <Slider label="Mass (Weight)" value={config.motionMass} min={0.5} max={3} step={0.1} onChange={v => onChange('motionMass', v)} />
          <Slider label="Stiffness (Snap)" value={config.motionStiffness} min={50} max={300} step={10} onChange={v => onChange('motionStiffness', v)} />
          <Slider label="Damping (Settle)" value={config.motionDamping} min={10} max={40} step={1} onChange={v => onChange('motionDamping', v)} />
          <Slider label="Rotation Speed" value={config.rotationSpeed * 1000} min={0} max={10} step={0.1} onChange={v => onChange('rotationSpeed', v / 1000)} />
        </Section>

        {/* Environment */}
        <Section title="Environment" isOpen={openSections.environment} onToggle={() => toggleSection('environment')}>
          <Slider label="Atmosphere Haze" value={config.atmosphereHaze} min={0} max={1} step={0.05} onChange={v => onChange('atmosphereHaze', v)} />
          <Slider label="Vignette" value={config.vignette} min={0} max={1} step={0.05} onChange={v => onChange('vignette', v)} />
        </Section>
      </div>
    </div>
  );
};

// --- Wavelength to RGB Conversion ---
// Based on CIE 1931 color matching approximation
const wavelengthToRGB = (wavelength: number): string => {
  let r = 0, g = 0, b = 0;

  if (wavelength >= 380 && wavelength < 440) {
    r = -(wavelength - 440) / (440 - 380);
    g = 0;
    b = 1;
  } else if (wavelength >= 440 && wavelength < 490) {
    r = 0;
    g = (wavelength - 440) / (490 - 440);
    b = 1;
  } else if (wavelength >= 490 && wavelength < 510) {
    r = 0;
    g = 1;
    b = -(wavelength - 510) / (510 - 490);
  } else if (wavelength >= 510 && wavelength < 580) {
    r = (wavelength - 510) / (580 - 510);
    g = 1;
    b = 0;
  } else if (wavelength >= 580 && wavelength < 645) {
    r = 1;
    g = -(wavelength - 645) / (645 - 580);
    b = 0;
  } else if (wavelength >= 645 && wavelength <= 700) {
    r = 1;
    g = 0;
    b = 0;
  }

  // Intensity adjustment for edges of visible spectrum
  let factor = 1.0;
  if (wavelength >= 380 && wavelength < 420) {
    factor = 0.3 + 0.7 * (wavelength - 380) / (420 - 380);
  } else if (wavelength >= 645 && wavelength <= 700) {
    factor = 0.3 + 0.7 * (700 - wavelength) / (700 - 645);
  }

  // Apply gamma correction and intensity
  const gamma = 0.8;
  r = Math.round(255 * Math.pow(r * factor, gamma));
  g = Math.round(255 * Math.pow(g * factor, gamma));
  b = Math.round(255 * Math.pow(b * factor, gamma));

  return `rgb(${r}, ${g}, ${b})`;
};

// --- Dynamic Spectrum Generation with Cauchy Dispersion ---
// 15 samples for smooth ribbon-like rainbow colors
const generateSpectrum = (iorBase: number, abbeNumber: number, dispersionStrength: number): SpectralBand[] => {
  const samples = 15;

  // Calculate IOR spread based on Abbe number and dispersion strength
  // Lower Abbe = more dispersion. dispersionStrength controls the multiplier
  const iorSpread = (70 - abbeNumber) / 70 * dispersionStrength;

  return Array.from({ length: samples }, (_, i) => {
    const t = i / (samples - 1);
    const wavelength = 700 - t * 320; // Red (700nm) → Violet (380nm)

    // Linear interpolation: red gets base IOR, violet gets base + spread
    const ior = iorBase + t * iorSpread;

    return {
      name: `λ${Math.round(wavelength)}`,
      color: wavelengthToRGB(wavelength),
      opacity: 0.7, // Higher opacity - colors will blend additively
      n: ior
    };
  });
};

// --- Constants & Configuration ---

// Visual Styling (defaults, overridden by config where applicable)
const OBJECT_SCALE = 200; // Default scale for helper functions
const MAX_BOUNCES = 5; // More bounces for richer reflections
const STAR_COUNT = 120; // Default star count
const DUST_COUNT = 60; // Default dust count

// Spectrum
interface SpectralBand {
  name: string;
  color: string;
  opacity: number;
  n: number;
}

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

// --- Spring Physics for Buttery Smooth Motion ---
interface SpringState {
    pos: number;
    vel: number;
}

const updateSpring = (
    spring: SpringState,
    target: number,
    mass: number,
    stiffness: number,
    damping: number,
    dt: number
): SpringState => {
    // Hooke's Law with damping: F = -kx - bv
    const displacement = spring.pos - target;
    const springForce = -stiffness * displacement;
    const dampingForce = -damping * spring.vel;
    const totalForce = springForce + dampingForce;

    // F = ma -> a = F/m
    const acceleration = totalForce / mass;

    // Update velocity and position
    const newVel = spring.vel + acceleration * dt;
    const newPos = spring.pos + newVel * dt;

    return { pos: newPos, vel: newVel };
};
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
    // Handle rgb(r, g, b) format from wavelengthToRGB
    if (color.startsWith('rgb(')) {
        const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
            return {
                r: parseInt(match[1], 10),
                g: parseInt(match[2], 10),
                b: parseInt(match[3], 10)
            };
        }
    }
    // Default white
    return { r: 255, g: 255, b: 255 };
};

// --- Soft Rainbow Band (Natural rainbow look - no bright core) ---
const drawSoftRainbowBand = (
    ctx: CanvasRenderingContext2D,
    start: Vec2,
    end: Vec2,
    color: string,
    baseWidth: number,
    alpha: number,
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

    // Single soft diffuse layer - no bright core
    // Wide spread with very gradual falloff for natural rainbow look
    const bandWidth = baseWidth * 3;
    const bandGrad = ctx.createLinearGradient(0, -bandWidth / 2, 0, bandWidth / 2);

    // Soft gradient - brighter, max opacity around 0.25 at center
    bandGrad.addColorStop(0, 'rgba(0,0,0,0)');
    bandGrad.addColorStop(0.1, `rgba(${rgb.r},${rgb.g},${rgb.b},0.03)`);
    bandGrad.addColorStop(0.25, `rgba(${rgb.r},${rgb.g},${rgb.b},0.10)`);
    bandGrad.addColorStop(0.4, `rgba(${rgb.r},${rgb.g},${rgb.b},0.18)`);
    bandGrad.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b},0.25)`);
    bandGrad.addColorStop(0.6, `rgba(${rgb.r},${rgb.g},${rgb.b},0.18)`);
    bandGrad.addColorStop(0.75, `rgba(${rgb.r},${rgb.g},${rgb.b},0.10)`);
    bandGrad.addColorStop(0.9, `rgba(${rgb.r},${rgb.g},${rgb.b},0.03)`);
    bandGrad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = bandGrad;
    ctx.globalAlpha = alpha;
    ctx.fillRect(0, -bandWidth / 2, length, bandWidth);

    ctx.restore();
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
        const outerRad = radius * 2.0;
        const outerGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, outerRad);
        outerGrad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.015 * fadeAlpha})`);
        outerGrad.addColorStop(0.2, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.01 * fadeAlpha})`);
        outerGrad.addColorStop(0.45, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.005 * fadeAlpha})`);
        outerGrad.addColorStop(0.7, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.002 * fadeAlpha})`);
        outerGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = outerGrad;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, outerRad, 0, Math.PI * 2);
        ctx.fill();

        // Layer 2: Main color cloud (reduced intensity)
        const mainGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, radius);
        mainGrad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.035 * fadeAlpha})`);
        mainGrad.addColorStop(0.2, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.022 * fadeAlpha})`);
        mainGrad.addColorStop(0.45, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.01 * fadeAlpha})`);
        mainGrad.addColorStop(0.7, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.004 * fadeAlpha})`);
        mainGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = mainGrad;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Layer 3: Soft core (reduced intensity)
        const coreRad = radius * 0.4;
        const coreGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, coreRad);
        coreGrad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.04 * fadeAlpha})`);
        coreGrad.addColorStop(0.35, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.02 * fadeAlpha})`);
        coreGrad.addColorStop(0.7, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.008 * fadeAlpha})`);
        coreGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = coreGrad;
        ctx.globalAlpha = 0.7;
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

// --- Atmospheric Fog Layer WITH CONFIG ---
const drawAtmosphericFogWithConfig = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    center: Vec2,
    time: number,
    hazeIntensity: number,
    vignetteStrength: number
) => {
    ctx.save();

    // Dark vignette - intensity controlled by vignetteStrength
    if (vignetteStrength > 0) {
        const vignetteGrad = ctx.createRadialGradient(
            center.x, center.y, 0,
            center.x, center.y, Math.max(width, height) * 0.75
        );
        vignetteGrad.addColorStop(0, 'rgba(0,0,0,0)');
        vignetteGrad.addColorStop(0.5, 'rgba(0,0,0,0)');
        vignetteGrad.addColorStop(0.75, `rgba(0,0,0,${vignetteStrength * 0.2})`);
        vignetteGrad.addColorStop(0.9, `rgba(0,0,0,${vignetteStrength * 0.5})`);
        vignetteGrad.addColorStop(1, `rgba(0,0,0,${vignetteStrength * 0.8})`);

        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = vignetteGrad;
        ctx.fillRect(0, 0, width, height);
    }

    // Atmospheric haze - super soft misty effect with gentle blooms
    if (hazeIntensity > 0) {
        ctx.globalCompositeOperation = 'screen';

        // Layer 1: Ultra-wide soft ambient mist
        const mistGrad = ctx.createRadialGradient(
            center.x, center.y, 0,
            center.x, center.y, Math.max(width, height) * 0.9
        );
        mistGrad.addColorStop(0, `rgba(180,200,220,${hazeIntensity * 0.025})`);
        mistGrad.addColorStop(0.3, `rgba(150,180,210,${hazeIntensity * 0.02})`);
        mistGrad.addColorStop(0.6, `rgba(120,150,190,${hazeIntensity * 0.012})`);
        mistGrad.addColorStop(0.85, `rgba(100,130,170,${hazeIntensity * 0.006})`);
        mistGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = mistGrad;
        ctx.fillRect(0, 0, width, height);

        // Layer 2: Soft drifting mist clouds (many, very subtle)
        const cloudCount = Math.floor(12 + hazeIntensity * 8);
        for (let i = 0; i < cloudCount; i++) {
            const seed = i * 89.123;
            const driftX = Math.sin(time * 0.03 + seed) * width * 0.15;
            const driftY = Math.cos(time * 0.025 + seed * 1.3) * height * 0.1;
            const x = ((seed * 7.89) % 1) * width + driftX;
            const y = ((seed * 3.21) % 1) * height + driftY;
            const r = (150 + Math.sin(seed * 2.1) * 100) * (0.8 + hazeIntensity * 0.4);

            const cloudGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
            const alpha = hazeIntensity * 0.012;
            cloudGrad.addColorStop(0, `rgba(200,215,235,${alpha})`);
            cloudGrad.addColorStop(0.4, `rgba(180,200,225,${alpha * 0.6})`);
            cloudGrad.addColorStop(0.7, `rgba(160,185,215,${alpha * 0.25})`);
            cloudGrad.addColorStop(1, 'rgba(0,0,0,0)');

            ctx.fillStyle = cloudGrad;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }

        // Layer 3: Gentle bloom spots (like light catching mist particles)
        const bloomCount = Math.floor(6 + hazeIntensity * 6);
        for (let i = 0; i < bloomCount; i++) {
            const seed = i * 234.567;
            const pulse = 0.7 + Math.sin(time * 0.5 + seed) * 0.3;
            const x = ((seed * 5.67) % 1) * width;
            const y = ((seed * 2.34) % 1) * height;
            const r = (80 + Math.sin(seed * 3.2) * 40) * (1 + hazeIntensity * 0.3);

            const bloomGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
            const alpha = hazeIntensity * 0.015 * pulse;
            bloomGrad.addColorStop(0, `rgba(220,235,255,${alpha})`);
            bloomGrad.addColorStop(0.3, `rgba(200,220,245,${alpha * 0.5})`);
            bloomGrad.addColorStop(0.6, `rgba(180,205,235,${alpha * 0.2})`);
            bloomGrad.addColorStop(1, 'rgba(0,0,0,0)');

            ctx.fillStyle = bloomGrad;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }
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

// --- Quartz Crystal Interior WITH CONFIG ---
const drawQuartzInteriorWithConfig = (
    ctx: CanvasRenderingContext2D,
    hull: Vec2[],
    time: number,
    dpr: number,
    cloudiness: number,
    cx: number,
    cy: number,
    radius: number
) => {
    if (hull.length < 3 || cloudiness <= 0) return;

    ctx.save();

    // Create clipping path from hull
    ctx.beginPath();
    ctx.moveTo(hull[0].x, hull[0].y);
    for (let i = 1; i < hull.length; i++) {
        ctx.lineTo(hull[i].x, hull[i].y);
    }
    ctx.closePath();
    ctx.clip();

    // Layer 1: Base cloudy fill - intensity controlled by cloudiness
    const baseAlpha = cloudiness * 0.06;
    const baseGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    baseGrad.addColorStop(0, `rgba(255,255,255,${baseAlpha})`);
    baseGrad.addColorStop(0.4, `rgba(255,255,255,${baseAlpha * 0.6})`);
    baseGrad.addColorStop(0.7, `rgba(255,255,255,${baseAlpha * 0.3})`);
    baseGrad.addColorStop(1, `rgba(255,255,255,${baseAlpha * 0.1})`);
    ctx.fillStyle = baseGrad;
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    // Layer 2: Cloudy patches - more patches with higher cloudiness
    const patchCount = Math.floor(10 + cloudiness * 25);
    for (let i = 0; i < patchCount; i++) {
        const seed = i * 73.419;
        const px = cx + (seededRandom(seed) - 0.5) * radius * 1.2;
        const py = cy + (seededRandom(seed + 100) - 0.5) * radius * 1.2;
        const pr = (8 + seededRandom(seed + 200) * 35) * dpr * (0.5 + cloudiness * 0.8);

        // Drift animation
        const drift = Math.sin(time * 0.3 + seed) * 3 * dpr * cloudiness;

        const patchAlpha = cloudiness * 0.12;
        const patchGrad = ctx.createRadialGradient(
            px + drift, py, 0,
            px + drift, py, pr
        );
        patchGrad.addColorStop(0, `rgba(255,255,255,${patchAlpha})`);
        patchGrad.addColorStop(0.3, `rgba(255,255,255,${patchAlpha * 0.6})`);
        patchGrad.addColorStop(0.6, `rgba(255,255,255,${patchAlpha * 0.2})`);
        patchGrad.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.fillStyle = patchGrad;
        ctx.beginPath();
        ctx.arc(px + drift, py, pr, 0, Math.PI * 2);
        ctx.fill();
    }

    // Layer 3: Subtle smoke wisps for high cloudiness
    if (cloudiness > 0.5) {
        const wispCount = Math.floor((cloudiness - 0.5) * 10);
        for (let i = 0; i < wispCount; i++) {
            const seed = i * 157.89;
            const angle = seededRandom(seed) * Math.PI * 2;
            const dist = seededRandom(seed + 50) * radius * 0.6;
            const wx = cx + Math.cos(angle + time * 0.1) * dist;
            const wy = cy + Math.sin(angle + time * 0.1) * dist;
            const wr = (20 + seededRandom(seed + 100) * 40) * dpr;

            const wispAlpha = (cloudiness - 0.5) * 0.08;
            const wispGrad = ctx.createRadialGradient(wx, wy, 0, wx, wy, wr);
            wispGrad.addColorStop(0, `rgba(200,220,255,${wispAlpha})`);
            wispGrad.addColorStop(0.5, `rgba(180,200,240,${wispAlpha * 0.4})`);
            wispGrad.addColorStop(1, 'rgba(0,0,0,0)');

            ctx.fillStyle = wispGrad;
            ctx.beginPath();
            ctx.arc(wx, wy, wr, 0, Math.PI * 2);
            ctx.fill();
        }
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

    // === Layer 1: Soft scattered glow along path (cooler tint) ===
    const scatterSteps = 8;
    for (let i = 0; i < scatterSteps; i++) {
        const t = (i + 0.5) / scatterSteps;
        const pos = add(entryPoint, mul(pathVec, t));

        // Width varies: wider at entry, narrow at focus, wider at exit
        const widthFactor = Math.abs(t - focusRatio) * 0.8 + 0.25;
        const radius = (25 + widthFactor * 40) * dpr;

        // Blend band color with blue to reduce yellowness
        const coolR = Math.round(rgb.r * 0.6 + 180 * 0.4);
        const coolG = Math.round(rgb.g * 0.6 + 210 * 0.4);
        const coolB = Math.round(rgb.b * 0.6 + 255 * 0.4);

        const scatterGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, radius);
        const baseAlpha = alpha * 0.03 * (1 - Math.abs(t - 0.5) * 0.3);
        scatterGrad.addColorStop(0, `rgba(${coolR},${coolG},${coolB},${baseAlpha * 0.5})`);
        scatterGrad.addColorStop(0.3, `rgba(${coolR},${coolG},${coolB},${baseAlpha * 0.25})`);
        scatterGrad.addColorStop(0.6, `rgba(${coolR},${coolG},${coolB},${baseAlpha * 0.1})`);
        scatterGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = scatterGrad;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    // === Layer 2: Caustic lines (softer, thicker, more diffuse) ===
    const subRayCount = 5;
    const beamHalfWidth = 10 * dpr;

    // Extend points slightly beyond hull for natural fade
    const extendAmount = 15 * dpr;
    const extendedEntry = sub(entryPoint, mul(pathDir, extendAmount));
    const extendedExit = add(exitPoint, mul(pathDir, extendAmount));

    ctx.globalAlpha = alpha * 0.1;
    ctx.lineCap = 'round'; // Soft line endings
    for (let i = 0; i < subRayCount; i++) {
        const offset = (i - (subRayCount - 1) / 2) * (beamHalfWidth * 2 / subRayCount);
        const startOffset = add(extendedEntry, mul(perp, offset));
        const endOffset = add(extendedExit, mul(perp, offset * 0.3));

        // Bezier curve through focus point
        ctx.beginPath();
        ctx.moveTo(startOffset.x, startOffset.y);
        ctx.quadraticCurveTo(focusPoint.x, focusPoint.y, endOffset.x, endOffset.y);

        // Gradient with fade at extended ends
        const lineGrad = ctx.createLinearGradient(
            extendedEntry.x, extendedEntry.y,
            extendedExit.x, extendedExit.y
        );
        lineGrad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`); // Fade in
        lineGrad.addColorStop(0.08, `rgba(${rgb.r},${rgb.g},${rgb.b},0.05)`);
        lineGrad.addColorStop(Math.max(0.1, focusRatio - 0.12), `rgba(${rgb.r},${rgb.g},${rgb.b},0.12)`);
        lineGrad.addColorStop(focusRatio, `rgba(${rgb.r},${rgb.g},${rgb.b},0.2)`);
        lineGrad.addColorStop(Math.min(0.9, focusRatio + 0.12), `rgba(${rgb.r},${rgb.g},${rgb.b},0.12)`);
        lineGrad.addColorStop(0.92, `rgba(${rgb.r},${rgb.g},${rgb.b},0.05)`);
        lineGrad.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`); // Fade out

        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 2.5 * dpr;
        ctx.stroke();
    }

    // === Layer 3: Caustic focus point (cooler blue-white tint) ===
    const causticRad = 18 * dpr;
    const causticGrad = ctx.createRadialGradient(
        focusPoint.x, focusPoint.y, 0,
        focusPoint.x, focusPoint.y, causticRad
    );
    // Blue-white core to reduce yellowness
    causticGrad.addColorStop(0, `rgba(220,235,255,${alpha * 0.12})`);
    causticGrad.addColorStop(0.15, `rgba(200,220,255,${alpha * 0.08})`);
    causticGrad.addColorStop(0.4, `rgba(180,210,255,${alpha * 0.04})`);
    causticGrad.addColorStop(0.7, `rgba(160,200,255,${alpha * 0.015})`);
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

    // Soft blue-tinted flare like Daft Punk style
    const coreRadius = 12 * dpr;
    const haloRadius = 80 * dpr;
    const outerGlowRadius = 120 * dpr;

    // Layer 1: Very large outer blue glow (super soft)
    const outerGlow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, outerGlowRadius);
    outerGlow.addColorStop(0, `rgba(100,180,255,${intensity * 0.08})`);
    outerGlow.addColorStop(0.2, `rgba(80,150,255,${intensity * 0.04})`);
    outerGlow.addColorStop(0.5, `rgba(60,120,255,${intensity * 0.015})`);
    outerGlow.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = outerGlow;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, outerGlowRadius, 0, Math.PI * 2);
    ctx.fill();

    // Layer 2: Mid blue halo
    const haloGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, haloRadius);
    haloGrad.addColorStop(0, `rgba(150,200,255,${intensity * 0.12})`);
    haloGrad.addColorStop(0.15, `rgba(120,180,255,${intensity * 0.08})`);
    haloGrad.addColorStop(0.35, `rgba(100,160,255,${intensity * 0.04})`);
    haloGrad.addColorStop(0.6, `rgba(80,140,255,${intensity * 0.015})`);
    haloGrad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, haloRadius, 0, Math.PI * 2);
    ctx.fill();

    // Layer 3: Soft white-blue core
    const coreGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, coreRadius);
    coreGrad.addColorStop(0, `rgba(220,240,255,${intensity * 0.25})`);
    coreGrad.addColorStop(0.4, `rgba(180,220,255,${intensity * 0.12})`);
    coreGrad.addColorStop(1, `rgba(150,200,255,0)`);

    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, coreRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
};

// --- INTERNAL CRYSTAL STRUCTURE RENDERING ---
// Based on crystal inclusion research (phantoms, needles, fractures, veils)

// Internal Phantoms: Ghostly crystal layers inside the main crystal
const drawInternalPhantoms = (
    ctx: CanvasRenderingContext2D,
    hull: Vec2[],
    center: Vec2,
    phantomIntensity: number,
    time: number,
    dpr: number
) => {
    if (phantomIntensity <= 0 || hull.length < 3) return;

    ctx.save();

    // Clip to hull
    ctx.beginPath();
    hull.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.closePath();
    ctx.clip();

    ctx.globalCompositeOperation = 'lighter';

    const layers = Math.floor(2 + phantomIntensity * 4); // 2-6 phantom layers

    for (let layer = 0; layer < layers; layer++) {
        const scale = 0.3 + (layer / layers) * 0.5; // 30%-80% of outer size
        const opacity = phantomIntensity * 0.4 * (1 - layer / layers); // Increased for visibility
        const rotation = time * 0.1 + layer * 0.5; // Slow rotation offset per layer

        // Draw scaled-down wireframe edges
        ctx.strokeStyle = `rgba(23, 247, 247, ${opacity})`;
        ctx.lineWidth = 0.5 * dpr;

        ctx.beginPath();
        hull.forEach((p, i) => {
            // Scale point relative to center
            const dx = (p.x - center.x) * scale;
            const dy = (p.y - center.y) * scale;
            // Apply slight rotation
            const rx = dx * Math.cos(rotation) - dy * Math.sin(rotation);
            const ry = dx * Math.sin(rotation) + dy * Math.cos(rotation);
            const nx = center.x + rx;
            const ny = center.y + ry;

            if (i === 0) ctx.moveTo(nx, ny);
            else ctx.lineTo(nx, ny);
        });
        ctx.closePath();
        ctx.stroke();
    }

    ctx.restore();
};

// Needle Inclusions: Rutile-like needles that catch light
const drawNeedleInclusions = (
    ctx: CanvasRenderingContext2D,
    hull: Vec2[],
    center: Vec2,
    needleDensity: number,
    lightDir: Vec2,
    time: number,
    dpr: number
) => {
    if (needleDensity <= 0 || hull.length < 3) return;

    ctx.save();

    // Clip to hull
    ctx.beginPath();
    hull.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.closePath();
    ctx.clip();

    ctx.globalCompositeOperation = 'lighter';

    // Calculate approximate radius from hull
    let maxDist = 0;
    hull.forEach(p => {
        const d = Math.sqrt((p.x - center.x) ** 2 + (p.y - center.y) ** 2);
        if (d > maxDist) maxDist = d;
    });
    const radius = maxDist * 0.8;

    const count = Math.floor(needleDensity * 30);

    // Seeded random for consistent needle positions
    const seedRandom = (seed: number) => {
        const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
        return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
        // Random needle position and angle
        const angle = seedRandom(i * 1.1) * Math.PI * 2;
        const dist = seedRandom(i * 2.3) * radius * 0.6;
        const needleLen = (15 + seedRandom(i * 3.7) * 25) * dpr;
        const needleAngle = seedRandom(i * 4.9) * Math.PI;

        const nx = center.x + Math.cos(angle) * dist;
        const ny = center.y + Math.sin(angle) * dist;

        // Calculate glow based on light direction alignment
        const needleDir = { x: Math.cos(needleAngle), y: Math.sin(needleAngle) };
        const lightAlignment = Math.abs(needleDir.x * lightDir.x + needleDir.y * lightDir.y);
        const glow = 0.2 + lightAlignment * 0.6 * needleDensity; // Increased for visibility

        // Shimmer effect
        const shimmer = 0.5 + 0.5 * Math.sin(time * 2 + i * 0.7);

        ctx.strokeStyle = `rgba(255, 255, 255, ${glow * shimmer})`;
        ctx.lineWidth = (0.5 + seedRandom(i * 5.1) * 1) * dpr;

        ctx.beginPath();
        ctx.moveTo(
            nx - Math.cos(needleAngle) * needleLen / 2,
            ny - Math.sin(needleAngle) * needleLen / 2
        );
        ctx.lineTo(
            nx + Math.cos(needleAngle) * needleLen / 2,
            ny + Math.sin(needleAngle) * needleLen / 2
        );
        ctx.stroke();
    }

    ctx.restore();
};

// Internal Fractures: Rainbow-creating healed cracks
const drawInternalFractures = (
    ctx: CanvasRenderingContext2D,
    hull: Vec2[],
    center: Vec2,
    fractureDensity: number,
    lightDir: Vec2,
    time: number,
    dpr: number
) => {
    if (fractureDensity <= 0 || hull.length < 3) return;

    ctx.save();

    // Clip to hull
    ctx.beginPath();
    hull.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.closePath();
    ctx.clip();

    ctx.globalCompositeOperation = 'lighter';

    // Calculate approximate radius
    let maxDist = 0;
    hull.forEach(p => {
        const d = Math.sqrt((p.x - center.x) ** 2 + (p.y - center.y) ** 2);
        if (d > maxDist) maxDist = d;
    });
    const radius = maxDist * 0.7;

    const count = Math.floor(fractureDensity * 8);

    const seedRandom = (seed: number) => {
        const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
        return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
        // Fracture center point
        const fx = center.x + (seedRandom(i * 7.1) - 0.5) * radius;
        const fy = center.y + (seedRandom(i * 8.3) - 0.5) * radius;

        // Soft diffuse fracture glow - no hard lines
        const fractureRadius = (30 + seedRandom(i * 9.5) * 50) * dpr;

        // Soft rainbow gradient - very low opacity for natural look
        const gradient = ctx.createRadialGradient(fx, fy, 0, fx, fy, fractureRadius);
        const hueBase = (seedRandom(i * 11.9) * 360 + time * 20) % 360;

        // Very soft opacity values for diffuse glow
        gradient.addColorStop(0, `hsla(${hueBase}, 80%, 65%, ${fractureDensity * 0.08})`);
        gradient.addColorStop(0.2, `hsla(${(hueBase + 40) % 360}, 75%, 60%, ${fractureDensity * 0.06})`);
        gradient.addColorStop(0.4, `hsla(${(hueBase + 80) % 360}, 70%, 55%, ${fractureDensity * 0.04})`);
        gradient.addColorStop(0.6, `hsla(${(hueBase + 120) % 360}, 65%, 50%, ${fractureDensity * 0.02})`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        // Fill soft glow instead of stroke lines
        ctx.fillStyle = gradient;
        ctx.fillRect(fx - fractureRadius, fy - fractureRadius, fractureRadius * 2, fractureRadius * 2);
    }

    ctx.restore();
};

// Cloud Veils: Milky wisps inside crystal
const drawCloudVeils = (
    ctx: CanvasRenderingContext2D,
    hull: Vec2[],
    center: Vec2,
    veilOpacity: number,
    time: number,
    dpr: number
) => {
    if (veilOpacity <= 0 || hull.length < 3) return;

    ctx.save();

    // Clip to hull
    ctx.beginPath();
    hull.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.closePath();
    ctx.clip();

    ctx.globalCompositeOperation = 'lighter';

    // Calculate approximate radius
    let maxDist = 0;
    hull.forEach(p => {
        const d = Math.sqrt((p.x - center.x) ** 2 + (p.y - center.y) ** 2);
        if (d > maxDist) maxDist = d;
    });
    const radius = maxDist;

    // Animated drift
    const driftX = Math.sin(time * 0.3) * 10 * dpr;
    const driftY = Math.cos(time * 0.2) * 8 * dpr;

    // Layer 1: Large soft cloud - increased opacity for visibility
    const cloud1Grad = ctx.createRadialGradient(
        center.x + driftX, center.y + driftY, 0,
        center.x + driftX, center.y + driftY, radius * 0.8
    );
    cloud1Grad.addColorStop(0, `rgba(255, 255, 255, ${veilOpacity * 0.25})`);
    cloud1Grad.addColorStop(0.3, `rgba(255, 255, 255, ${veilOpacity * 0.15})`);
    cloud1Grad.addColorStop(0.6, `rgba(255, 255, 255, ${veilOpacity * 0.08})`);
    cloud1Grad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = cloud1Grad;
    ctx.fillRect(center.x - radius, center.y - radius, radius * 2, radius * 2);

    // Layer 2: Smaller offset wisps - increased opacity
    const wisp1X = center.x - driftX * 1.5 + Math.cos(time * 0.5) * radius * 0.3;
    const wisp1Y = center.y - driftY * 1.2 + Math.sin(time * 0.4) * radius * 0.2;
    const wisp1Grad = ctx.createRadialGradient(
        wisp1X, wisp1Y, 0,
        wisp1X, wisp1Y, radius * 0.4
    );
    wisp1Grad.addColorStop(0, `rgba(255, 255, 255, ${veilOpacity * 0.2})`);
    wisp1Grad.addColorStop(0.5, `rgba(255, 255, 255, ${veilOpacity * 0.1})`);
    wisp1Grad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = wisp1Grad;
    ctx.fillRect(wisp1X - radius * 0.4, wisp1Y - radius * 0.4, radius * 0.8, radius * 0.8);

    // Layer 3: Another offset wisp
    const wisp2X = center.x + Math.sin(time * 0.35) * radius * 0.25;
    const wisp2Y = center.y + driftY * 2 + Math.cos(time * 0.45) * radius * 0.15;
    const wisp2Grad = ctx.createRadialGradient(
        wisp2X, wisp2Y, 0,
        wisp2X, wisp2Y, radius * 0.35
    );
    wisp2Grad.addColorStop(0, `rgba(200, 220, 255, ${veilOpacity * 0.05})`);
    wisp2Grad.addColorStop(0.6, `rgba(200, 220, 255, ${veilOpacity * 0.02})`);
    wisp2Grad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = wisp2Grad;
    ctx.fillRect(wisp2X - radius * 0.35, wisp2Y - radius * 0.35, radius * 0.7, radius * 0.7);

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

    // Soft outer halo with band color - reduced intensity
    const haloGrad = ctx.createRadialGradient(
        exitPoint.x, exitPoint.y, 0,
        exitPoint.x, exitPoint.y, haloRadius
    );
    haloGrad.addColorStop(0, `rgba(255,255,255,${alpha * 0.08})`);
    haloGrad.addColorStop(0.1, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.06})`);
    haloGrad.addColorStop(0.3, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.03})`);
    haloGrad.addColorStop(0.55, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.01})`);
    haloGrad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(exitPoint.x, exitPoint.y, haloRadius, 0, Math.PI * 2);
    ctx.fill();

    // Soft white core - reduced intensity
    const coreGrad = ctx.createRadialGradient(
        exitPoint.x, exitPoint.y, 0,
        exitPoint.x, exitPoint.y, coreRadius
    );
    coreGrad.addColorStop(0, `rgba(255,255,255,${alpha * 0.15})`);
    coreGrad.addColorStop(0.6, `rgba(255,255,255,${alpha * 0.06})`);
    coreGrad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(exitPoint.x, exitPoint.y, coreRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
};

// --- CONFIG-AWARE DRAWING FUNCTIONS ---

// Volumetric beam with config parameters for halo size and softness
const drawVolumetricBeamWithConfig = (
    ctx: CanvasRenderingContext2D,
    start: Vec2,
    end: Vec2,
    color: string,
    baseWidth: number,
    alpha: number,
    isIncoming: boolean,
    time: number,
    dpr: number,
    haloSize: number,
    softness: number
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

    // Halo size multiplier (1-12 range maps to 4-8x width)
    const haloMult = 4 + (haloSize / 12) * 4;
    // Softness affects gradient falloff (0-1 range)
    const softFalloff = 0.1 + softness * 0.4;

    // Layer 1: Ultra-wide atmospheric haze
    const hazeWidth = baseWidth * haloMult;
    const hazeGrad = ctx.createLinearGradient(0, -hazeWidth / 2, 0, hazeWidth / 2);
    hazeGrad.addColorStop(0, 'rgba(0,0,0,0)');
    hazeGrad.addColorStop(softFalloff, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.02 * (1 + softness)})`);
    hazeGrad.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.05 * (1 + softness)})`);
    hazeGrad.addColorStop(1 - softFalloff, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.02 * (1 + softness)})`);
    hazeGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = hazeGrad;
    ctx.globalAlpha = alpha * 0.7;
    ctx.fillRect(0, -hazeWidth / 2, length, hazeWidth);

    // Layer 2: Wide outer glow
    const outerWidth = baseWidth * (haloMult * 0.6);
    const outerGrad = ctx.createLinearGradient(0, -outerWidth / 2, 0, outerWidth / 2);
    outerGrad.addColorStop(0, 'rgba(0,0,0,0)');
    outerGrad.addColorStop(0.2, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.04 * (1 + softness)})`);
    outerGrad.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.1 * (1 + softness)})`);
    outerGrad.addColorStop(0.8, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.04 * (1 + softness)})`);
    outerGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = outerGrad;
    ctx.globalAlpha = alpha * 0.6;
    ctx.fillRect(0, -outerWidth / 2, length, outerWidth);

    // Layer 3: Soft core ribbon
    const coreWidth = baseWidth * (1 - softness * 0.3);
    const coreGrad = ctx.createLinearGradient(0, -coreWidth / 2, 0, coreWidth / 2);
    coreGrad.addColorStop(0, 'rgba(0,0,0,0)');
    coreGrad.addColorStop(0.25, `rgba(${rgb.r},${rgb.g},${rgb.b},0.3)`);
    coreGrad.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b},0.6)`);
    coreGrad.addColorStop(0.75, `rgba(${rgb.r},${rgb.g},${rgb.b},0.3)`);
    coreGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = coreGrad;
    ctx.globalAlpha = alpha * (0.6 + (1 - softness) * 0.3);
    ctx.fillRect(0, -coreWidth / 2, length, coreWidth);

    // Layer 4: Hot center (only for low softness and incoming beam)
    if (isIncoming && softness < 0.7) {
        const hotWidth = baseWidth * 0.15 * (1 - softness);
        const centerGrad = ctx.createLinearGradient(0, -hotWidth / 2, 0, hotWidth / 2);
        centerGrad.addColorStop(0, 'rgba(255,255,255,0)');
        centerGrad.addColorStop(0.4, `rgba(255,255,255,${0.4 * (1 - softness)})`);
        centerGrad.addColorStop(0.6, `rgba(255,255,255,${0.4 * (1 - softness)})`);
        centerGrad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = centerGrad;
        ctx.globalAlpha = alpha * 0.5;
        ctx.fillRect(0, -hotWidth / 2, length, hotWidth);
    }

    ctx.restore();
};

// Crystal haze with config
const drawCrystalHazeWithConfig = (
    ctx: CanvasRenderingContext2D,
    hull: Vec2[],
    entryPoint: Vec2,
    dpr: number,
    smokeDensity: number,
    scattering: number
) => {
    if (hull.length < 3 || smokeDensity <= 0) return;

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

    const radius = OBJECT_SCALE * dpr * 1.5;

    ctx.globalCompositeOperation = 'lighter';

    // Main haze - intensity controlled by smokeDensity
    const hazeGrad = ctx.createRadialGradient(
        entryPoint.x, entryPoint.y, 0,
        entryPoint.x, entryPoint.y, radius
    );
    const baseAlpha = smokeDensity * 0.15;
    hazeGrad.addColorStop(0, `rgba(255,255,255,${baseAlpha})`);
    hazeGrad.addColorStop(0.2, `rgba(255,255,255,${baseAlpha * 0.6})`);
    hazeGrad.addColorStop(0.5, `rgba(255,255,255,${baseAlpha * 0.3})`);
    hazeGrad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = hazeGrad;
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    // Scattering adds additional diffuse glow
    if (scattering > 0.3) {
        const scatterGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.8);
        const scatterAlpha = (scattering - 0.3) * 0.1;
        scatterGrad.addColorStop(0, `rgba(200,220,255,${scatterAlpha})`);
        scatterGrad.addColorStop(0.5, `rgba(180,200,240,${scatterAlpha * 0.5})`);
        scatterGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = scatterGrad;
        ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
    }

    ctx.restore();
};

// Internal caustics with config
const drawInternalCausticsWithConfig = (
    ctx: CanvasRenderingContext2D,
    entryPoint: Vec2,
    exitPoint: Vec2,
    band: SpectralBand,
    alpha: number,
    time: number,
    dpr: number,
    scattering: number,
    absorption: number
) => {
    const rgb = parseColorToRGB(band.color);

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    const pathVec = sub(exitPoint, entryPoint);
    const pathLen = len(pathVec);
    if (pathLen < 1) { ctx.restore(); return; }

    const pathDir = norm(pathVec);
    const perp = vec2(-pathDir.y, pathDir.x);

    // Focus point varies by IOR and scattering
    const focusRatio = 0.3 + (band.n - 1.40) * 0.25 + scattering * 0.1;
    const focusPoint = add(entryPoint, mul(pathVec, focusRatio));

    // Scattering increases the number and spread of scatter points
    const scatterSteps = Math.floor(6 + scattering * 8);
    for (let i = 0; i < scatterSteps; i++) {
        const t = (i + 0.5) / scatterSteps;
        const pos = add(entryPoint, mul(pathVec, t));

        // Width varies: wider at entry, narrow at focus, wider at exit
        const widthFactor = Math.abs(t - focusRatio) * (0.6 + scattering * 0.6) + 0.2;
        const radius = (20 + widthFactor * 50 + scattering * 30) * dpr;

        // Absorption reduces intensity along path
        const absorbFactor = 1 - absorption * t * 0.7;
        const scatterGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, radius);
        const baseAlpha = alpha * 0.1 * absorbFactor * (1 + scattering * 0.5);
        scatterGrad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${baseAlpha})`);
        scatterGrad.addColorStop(0.4, `rgba(${rgb.r},${rgb.g},${rgb.b},${baseAlpha * 0.4})`);
        scatterGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = scatterGrad;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    // Caustic lines - fewer and softer with high scattering
    const lineCount = Math.max(2, Math.floor(5 - scattering * 3));
    const beamHalfWidth = (8 + scattering * 5) * dpr;

    ctx.globalAlpha = alpha * 0.25 * (1 - scattering * 0.5);
    for (let i = 0; i < lineCount; i++) {
        const offset = (i - (lineCount - 1) / 2) * (beamHalfWidth * 2 / lineCount);
        const startOffset = add(entryPoint, mul(perp, offset));
        const endOffset = add(exitPoint, mul(perp, offset * (0.2 + scattering * 0.3)));

        ctx.beginPath();
        ctx.moveTo(startOffset.x, startOffset.y);
        ctx.quadraticCurveTo(focusPoint.x, focusPoint.y, endOffset.x, endOffset.y);

        const lineGrad = ctx.createLinearGradient(
            entryPoint.x, entryPoint.y,
            exitPoint.x, exitPoint.y
        );
        lineGrad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},0.05)`);
        lineGrad.addColorStop(focusRatio, `rgba(${rgb.r},${rgb.g},${rgb.b},0.25)`);
        lineGrad.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0.08)`);

        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = (2 + scattering * 2) * dpr;
        ctx.stroke();
    }

    // Focus point glow
    const causticRad = (15 + scattering * 10) * dpr;
    const causticGrad = ctx.createRadialGradient(
        focusPoint.x, focusPoint.y, 0,
        focusPoint.x, focusPoint.y, causticRad
    );
    causticGrad.addColorStop(0, `rgba(255,255,255,${alpha * 0.35})`);
    causticGrad.addColorStop(0.2, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.25})`);
    causticGrad.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.1})`);
    causticGrad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = causticGrad;
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(focusPoint.x, focusPoint.y, causticRad, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
};

// Exit caustic bloom with config
const drawExitCausticBloomWithConfig = (
    ctx: CanvasRenderingContext2D,
    exitPoint: Vec2,
    exitDir: Vec2,
    band: SpectralBand,
    alpha: number,
    dpr: number,
    bloomIntensity: number
) => {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    // Bloom intensity scales the sizes
    const coreRadius = (5 + bloomIntensity * 4) * dpr;
    const haloRadius = (30 + bloomIntensity * 30) * dpr;

    const rgb = parseColorToRGB(band.color);

    // Soft blue tint for flares - aurora-like
    const softBlue = { r: 100, g: 180, b: 255 };

    // Soft outer halo - VERY subtle, blue-tinted
    const haloGrad = ctx.createRadialGradient(
        exitPoint.x, exitPoint.y, 0,
        exitPoint.x, exitPoint.y, haloRadius
    );
    // Soft blue center instead of harsh white
    haloGrad.addColorStop(0, `rgba(${softBlue.r},${softBlue.g},${softBlue.b},${alpha * 0.03 * (0.5 + bloomIntensity * 0.5)})`);
    haloGrad.addColorStop(0.15, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.06 * (0.5 + bloomIntensity * 0.5)})`);
    haloGrad.addColorStop(0.4, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.025})`);
    haloGrad.addColorStop(0.7, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.01})`);
    haloGrad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(exitPoint.x, exitPoint.y, haloRadius, 0, Math.PI * 2);
    ctx.fill();

    // Soft blue core instead of white - VERY subtle
    const coreGrad = ctx.createRadialGradient(
        exitPoint.x, exitPoint.y, 0,
        exitPoint.x, exitPoint.y, coreRadius
    );
    // Soft blue glow, barely visible
    coreGrad.addColorStop(0, `rgba(${softBlue.r},${softBlue.g},${softBlue.b},${alpha * 0.04 * (0.5 + bloomIntensity * 0.5)})`);
    coreGrad.addColorStop(0.5, `rgba(${softBlue.r},${softBlue.g},${softBlue.b},${alpha * 0.015})`);
    coreGrad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(exitPoint.x, exitPoint.y, coreRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
};

// Color dispersion with config - draws soft natural rainbow bands
const drawColorDispersionWithConfig = (
    ctx: CanvasRenderingContext2D,
    exitPoint: Vec2,
    direction: Vec2,
    band: SpectralBand,
    maxLength: number,
    alpha: number,
    time: number,
    dpr: number,
    spreadFactor: number,
    bloomFactor: number
) => {
    // Calculate end point along direction
    const endPoint = add(exitPoint, mul(direction, maxLength));

    // Wider beam for soft blended look
    const beamWidth = 18 * dpr;

    // Draw soft rainbow band - natural look without bright core
    drawSoftRainbowBand(
        ctx,
        exitPoint,
        endPoint,
        band.color,
        beamWidth,
        alpha * 0.25, // Lower alpha for soft blended appearance
        dpr
    );
};

export const PrismScene: React.FC<{ showOverlay?: boolean }> = ({ showOverlay = true }) => {
  // Config state
  const [config, setConfig] = useState<PrismConfig>(DEFAULT_CONFIG);
  const [panelOpen, setPanelOpen] = useState(false);

  const handleConfigChange = useCallback((key: keyof PrismConfig, value: PrismConfig[keyof PrismConfig]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
  }, []);

  // Config ref for animation loop access
  const configRef = useRef<PrismConfig>(config);
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const mouseRef = useRef<Vec2>({ x: 0, y: 0 });
  // Spring physics state for buttery smooth motion
  const springXRef = useRef<SpringState>({ pos: 0, vel: 0 });
  const springYRef = useRef<SpringState>({ pos: 0, vel: 0 });
  const smoothMouseRef = useRef<Vec2>({ x: 0, y: 0 });
  const rotationRef = useRef<{x:number, y:number, z:number}>({ x: 0, y: 0, z: 0 });
  const globalAlphaRef = useRef(0);
  const starsRef = useRef<Particle[]>([]);
  const dustRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);
  const initialRotationSetRef = useRef(false);

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
            // Initialize spring state at center
            springXRef.current = { pos: clientWidth/2, vel: 0 };
            springYRef.current = { pos: clientHeight/2, vel: 0 };
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
          const cfg = configRef.current;
          const width = canvas.width;
          const height = canvas.height;
          const dpr = window.devicePixelRatio || 1;

          timeRef.current += 0.01;

          // Set initial rotation once
          if (!initialRotationSetRef.current) {
            rotationRef.current.x = 0;
            rotationRef.current.y = 0;
            rotationRef.current.z = 0;
            initialRotationSetRef.current = true;
          }

          // Spring physics for buttery smooth motion
          const dt = 0.016; // ~60fps timestep
          springXRef.current = updateSpring(
              springXRef.current,
              mouseRef.current.x,
              cfg.motionMass,
              cfg.motionStiffness,
              cfg.motionDamping,
              dt
          );
          springYRef.current = updateSpring(
              springYRef.current,
              mouseRef.current.y,
              cfg.motionMass,
              cfg.motionStiffness,
              cfg.motionDamping,
              dt
          );
          smoothMouseRef.current.x = springXRef.current.pos;
          smoothMouseRef.current.y = springYRef.current.pos;

          const mx = smoothMouseRef.current.x * dpr;
          const my = smoothMouseRef.current.y * dpr;
          const center = vec2(width / 2, height / 2);

          // Rotation - minimal mouse influence for aurora-like calm
          const mouseInfluence = 0.02 * 0.00001; // Almost no mouse influence on rotation
          rotationRef.current.x += cfg.rotationSpeed + (smoothMouseRef.current.y - height/2) * mouseInfluence;
          rotationRef.current.y += cfg.rotationSpeed * 1.5 + (smoothMouseRef.current.x - width/2) * mouseInfluence;

          // 1. Background - dark with subtle gradient
          const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width * 0.9);
          grad.addColorStop(0, '#0d1117');
          grad.addColorStop(0.6, '#050505');
          grad.addColorStop(1, '#000000');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);

          // 1.5. Atmospheric Haze Layer - controlled by config
          if (cfg.atmosphereHaze > 0) {
            drawAtmosphericFogWithConfig(ctx, width, height, center, timeRef.current, cfg.atmosphereHaze, cfg.vignette);
          }

          // Prepare Geometries - use config crystal scale
          const scale = cfg.crystalScale * dpr;

          // Generate dynamic spectrum with Cauchy dispersion (15 samples for smooth ribbons)
          const spectrum = generateSpectrum(cfg.iorBase, cfg.abbeNumber, cfg.dispersionStrength);
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

              // 1. Fill hull with glass gradient - surfaceGlow controls transparency
              ctx.beginPath();
              hull.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
              ctx.closePath();

              const cx = hull.reduce((s, p) => s + p.x, 0) / hull.length;
              const cy = hull.reduce((s, p) => s + p.y, 0) / hull.length;
              const radius = cfg.crystalScale * dpr;

              // Surface glow controls overall crystal brightness/transparency
              const baseGlow = cfg.surfaceGlow;
              const glassGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
              glassGrad.addColorStop(0, `rgba(255,255,255,${baseGlow})`);
              glassGrad.addColorStop(0.4, `rgba(255,255,255,${baseGlow * 0.6})`);
              glassGrad.addColorStop(0.7, `rgba(255,255,255,${baseGlow * 0.4})`);
              glassGrad.addColorStop(1, `rgba(255,255,255,${baseGlow * 1.5})`);
              ctx.fillStyle = glassGrad;
              ctx.fill();

              // === INTERNAL CRYSTAL STRUCTURE ===
              // Cloud veils (milky wisps inside)
              if (cfg.veilOpacity > 0) {
                  drawCloudVeils(ctx, hull, { x: cx, y: cy }, cfg.veilOpacity, timeRef.current, dpr);
              }

              // Internal phantom crystals (ghostly layers)
              if (cfg.internalFacets > 0) {
                  drawInternalPhantoms(ctx, hull, { x: cx, y: cy }, cfg.internalFacets, timeRef.current, dpr);
              }

              // Needle inclusions (rutile-like needles that catch light)
              if (cfg.needleDensity > 0) {
                  drawNeedleInclusions(ctx, hull, { x: cx, y: cy }, cfg.needleDensity, rayDir, timeRef.current, dpr);
              }

              // Internal fractures (rainbow-creating healed cracks)
              if (cfg.fractureDensity > 0) {
                  drawInternalFractures(ctx, hull, { x: cx, y: cy }, cfg.fractureDensity, rayDir, timeRef.current, dpr);
              }

              // 2. Diamond facet edges - controlled by facetDepth and edgeBrightness
              facesWithDepth.filter(f => f.isFront).forEach(f => {
                  const pts = f.indices.map(i => projectedVerts[i]);
                  ctx.beginPath();
                  pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
                  ctx.closePath();

                  // facetDepth + edgeBrightness control visibility
                  const baseOpacity = (0.3 + cfg.facetDepth * 0.7) * cfg.edgeBrightness;
                  const edgeOpacity = baseOpacity * (0.3 + f.fresnel * 0.7);
                  ctx.strokeStyle = `rgba(255,255,255,${edgeOpacity})`;
                  ctx.lineWidth = (0.5 + cfg.edgeBrightness * 0.8) * dpr;
                  ctx.stroke();

                  // Specular flash on well-lit facets - controlled by surfaceGlow
                  if (f.intensity > 0.3 && cfg.surfaceGlow > 0) {
                      const flashOpacity = Math.pow(f.intensity, 2) * cfg.surfaceGlow * 2;
                      ctx.fillStyle = `rgba(255,255,255,${flashOpacity})`;
                      ctx.fill();
                  }

                  // Rainbow fire on edges - controlled by rainbowFire
                  if (f.fresnel > 0.4 && cfg.rainbowFire > 0) {
                      const hue = (f.fresnel * 360 + timeRef.current * 20) % 360;
                      ctx.shadowBlur = (6 + cfg.rainbowFire * 10) * dpr;
                      ctx.shadowColor = `hsla(${hue}, 70%, 60%, ${cfg.rainbowFire * 0.8})`;
                      ctx.strokeStyle = `hsla(${hue}, 60%, 70%, ${f.fresnel * cfg.rainbowFire * 0.6})`;
                      ctx.lineWidth = (1 + cfg.rainbowFire) * dpr;
                      ctx.stroke();
                      ctx.shadowBlur = 0;
                  }
              });

              // 2b. Back faces (internal structure) - controlled by facetDepth
              if (cfg.facetDepth > 0.2) {
                  facesWithDepth.filter(f => !f.isFront).forEach(f => {
                      const pts = f.indices.map(i => projectedVerts[i]);
                      ctx.beginPath();
                      pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
                      ctx.closePath();
                      const backOpacity = cfg.facetDepth * 0.25;
                      ctx.strokeStyle = `rgba(255,255,255,${backOpacity})`;
                      ctx.lineWidth = 0.4 * dpr;
                      ctx.stroke();
                  });
              }

              // 3. Hull outline - controlled by edgeBrightness
              ctx.beginPath();
              hull.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
              ctx.closePath();
              const outlineOpacity = 0.3 + cfg.edgeBrightness * 0.5;
              ctx.strokeStyle = `rgba(255, 255, 255, ${outlineOpacity})`;
              ctx.lineWidth = (0.5 + cfg.edgeBrightness * 0.8) * dpr;
              ctx.shadowBlur = (5 + cfg.edgeBrightness * 10) * dpr;
              ctx.shadowColor = `rgba(255, 255, 255, ${outlineOpacity})`;
              ctx.stroke();
              ctx.shadowBlur = 0;

              ctx.restore();
          }

          // 4. Light Tracing
          const activeBeams: {p1:Vec2, p2:Vec2}[] = [];
          const pulse = 0.92 + Math.sin(timeRef.current * 2) * 0.08; // Fixed pulse rate

          const traceSpectralRay = (
              startPoint: Vec2,
              direction: Vec2,
              band: SpectralBand,
              depth: number,
              currentAlpha: number,
              isFirstExit: boolean = false
          ) => {
              if (depth <= 0 || currentAlpha < 0.01) return;

              const hullHit = intersectRayHull(add(startPoint, mul(direction, 0.01)), direction, hull);
              const wallHit = intersectRayBounds(add(startPoint, mul(direction, 0.01)), direction, width, height);

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
              } else if (isFirstExit && type === 'hull') {
                  // Soft beam for first exit even when re-entering crystal
                  drawSoftRainbowBand(ctx, startPoint, target.point, band.color, cfg.beamWidth * dpr, modAlpha * 0.6, dpr);
              } else if (!isFirstExit) {
                  // Soft beam for bounces after first exit
                  drawSoftRainbowBand(ctx, startPoint, target.point, band.color, cfg.beamWidth * dpr, modAlpha * 0.6, dpr);
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
                  const exitHit = intersectRayHull(add(hullHit.point, mul(dIn, 0.01)), dIn, hull, hullHit.index);
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

          // Main Incoming Beam - fixed 15px width to match exit beams
          const beamAlpha = globalAlphaRef.current * cfg.beamIntensity;
          drawVolumetricBeamWithConfig(
              ctx, mouse, beamEnd, '#ffffff',
              15 * dpr, // Fixed width matching exit beams
              beamAlpha,
              true, timeRef.current, dpr,
              3, 0.5 // Reduced halo for consistent beam width
          );

          // Soft glow core - only if beam intensity is high enough
          if (cfg.beamIntensity > 0.25) {
              ctx.save();
              const coreBloom = 8; // Reduced for cleaner beam
              ctx.shadowBlur = coreBloom;
              ctx.shadowColor = `rgba(255,255,255,${cfg.beamIntensity * 0.5})`;
              ctx.beginPath();
              ctx.moveTo(mouse.x, mouse.y);
              ctx.lineTo(beamEnd.x, beamEnd.y);
              ctx.strokeStyle = '#ffffff';
              ctx.lineWidth = (1 + cfg.beamIntensity) * dpr;
              ctx.globalAlpha = globalAlphaRef.current * cfg.beamIntensity * 0.6;
              ctx.stroke();
              ctx.shadowBlur = 0;
              ctx.restore();
          }

          if (entryHit && globalAlphaRef.current > 0.01) {
              // Step 1: Crystal interior haze - controlled by scattering
              if (cfg.scattering > 0) {
                  drawCrystalHazeWithConfig(ctx, hull, entryHit.point, dpr, cfg.scattering, cfg.scattering);
              }

              // Step 2: Entry surface highlight - controlled by surfaceGlow
              drawSurfaceHighlight(ctx, entryHit.point, entryHit.normal, '#ffffff', cfg.surfaceGlow * 5, dpr);

              // Step 3: Process each spectral band
              spectrum.forEach(band => {
                  const dIn = refract2D(rayDir, entryHit.normal, N_AIR, band.n);
                  if (!dIn) return;
                  const exitHit = intersectRayHull(add(entryHit.point, mul(dIn, 0.01)), dIn, hull, entryHit.index);
                  if (!exitHit) return;

                  // Step 4: Draw internal caustics - controlled by scattering
                  if (cfg.scattering > 0) {
                      drawInternalCausticsWithConfig(
                          ctx,
                          entryHit.point,
                          exitHit.point,
                          band,
                          globalAlphaRef.current * pulse * cfg.scattering,
                          timeRef.current,
                          dpr,
                          cfg.scattering,
                          cfg.absorption
                      );
                  }

                  const dOut = refract2D(dIn, exitHit.normal, band.n, N_AIR);
                  if (dOut) {
                      // Step 5: Exit caustic bloom - controlled by flareIntensity
                      const bloomAlpha = globalAlphaRef.current * cfg.flareIntensity;
                      drawExitCausticBloomWithConfig(ctx, exitHit.point, dOut, band, bloomAlpha, dpr, cfg.flareIntensity);

                      // Step 6: External color dispersion - controlled by exitRaySpread
                      const maxLen = Math.sqrt(width * width + height * height) * 1.0; // Fixed length
                      const dispersionAlpha = globalAlphaRef.current * pulse * (0.5 + cfg.exitRaySpread * 0.5);
                      drawColorDispersionWithConfig(
                          ctx, exitHit.point, dOut, band, maxLen, dispersionAlpha,
                          timeRef.current, dpr, cfg.exitRaySpread, cfg.flareIntensity
                      );

                      // Step 7: Continue tracing bounces - absorption controls transmittance
                      const transmittance = 1 - cfg.absorption * 0.8;
                      traceSpectralRay(exitHit.point, dOut, band, MAX_BOUNCES, globalAlphaRef.current * transmittance, true);
                  }
              });
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
    <div ref={containerRef} className={`relative w-full h-screen bg-[#050505] overflow-hidden ${showOverlay && !panelOpen ? 'cursor-none' : ''}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Control Panel */}
      <ControlPanel
        config={config}
        onChange={handleConfigChange}
        onReset={handleReset}
        isOpen={panelOpen}
        onToggle={() => setPanelOpen(!panelOpen)}
      />

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
