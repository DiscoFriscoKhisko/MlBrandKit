import React, { useEffect, useRef } from 'react';

interface KineticStellationCycleProps {
  size?: number;
  color?: string;
}

export const KineticStellationCycle: React.FC<KineticStellationCycleProps> = ({ 
  size = 120, 
  color = "#090909" 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current = { x, y };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const phi = (1 + Math.sqrt(5)) / 2;
    
    // Base Icosahedron Vertices (Level 0)
    // 12 Vertices
    const baseVertices = [
      [0, 1, phi], [0, 1, -phi], [0, -1, phi], [0, -1, -phi],
      [1, phi, 0], [1, -phi, 0], [-1, phi, 0], [-1, -phi, 0],
      [phi, 0, 1], [phi, 0, -1], [-phi, 0, 1], [-phi, 0, -1]
    ].map(v => {
        const m = Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2);
        return [v[0]/m, v[1]/m, v[2]/m] as [number, number, number];
    });

    // Find faces to calculate centers (Level 1 spikes)
    const faces: number[][] = [];
    for (let i = 0; i < 12; i++) {
        for (let j = i + 1; j < 12; j++) {
            for (let k = j + 1; k < 12; k++) {
                const v1 = baseVertices[i];
                const v2 = baseVertices[j];
                const v3 = baseVertices[k];
                
                const d1 = Math.sqrt((v1[0]-v2[0])**2 + (v1[1]-v2[1])**2 + (v1[2]-v2[2])**2);
                const d2 = Math.sqrt((v2[0]-v3[0])**2 + (v2[1]-v3[1])**2 + (v2[2]-v3[2])**2);
                const d3 = Math.sqrt((v3[0]-v1[0])**2 + (v3[1]-v1[1])**2 + (v3[2]-v1[2])**2);
                
                // Check if equilateral triangle of side ~1.05
                if (d1 > 0.9 && d1 < 1.2 && d2 > 0.9 && d2 < 1.2 && d3 > 0.9 && d3 < 1.2) {
                    faces.push([i, j, k]);
                }
            }
        }
    }

    // Calculate Face Normals/Centers
    const faceNormals = faces.map(face => {
        const v1 = baseVertices[face[0]];
        const v2 = baseVertices[face[1]];
        const v3 = baseVertices[face[2]];
        
        // Center
        const cx = (v1[0] + v2[0] + v3[0]) / 3;
        const cy = (v1[1] + v2[1] + v3[1]) / 3;
        const cz = (v1[2] + v2[2] + v3[2]) / 3;
        
        // Normalize center to get direction
        const m = Math.sqrt(cx*cx + cy*cy + cz*cz);
        return [cx/m, cy/m, cz/m] as [number, number, number];
    });

    // Edges structure
    // 1. Base Icosahedron edges
    const baseEdges: [number, number][] = [];
    // 2. Spike edges (connecting face vertices to the new spike tip)
    // We will compute these dynamically or store indices
    // The spike tip for face `f` will be at index `12 + f` in our projected array
    
    // Precompute base edges
    for (let i = 0; i < 12; i++) {
        for (let j = i + 1; j < 12; j++) {
             const v1 = baseVertices[i];
             const v2 = baseVertices[j];
             const d = Math.sqrt((v1[0]-v2[0])**2 + (v1[1]-v2[1])**2 + (v1[2]-v2[2])**2);
             if (d < 1.2) baseEdges.push([i, j]);
        }
    }

    let baseAngleX = 0;
    let baseAngleY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    
    // Animation cycle state
    let cyclePhase = 0; 

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update rotation
      baseAngleX += 0.002;
      baseAngleY += 0.003;
      currentMouseX += (mouseRef.current.y * 1.5 - currentMouseX) * 0.05;
      currentMouseY += (mouseRef.current.x * 1.5 - currentMouseY) * 0.05;
      
      const angleX = baseAngleX + currentMouseX;
      const angleY = baseAngleY + currentMouseY;

      // Update Cycle
      // Oscillate 0 -> 1 -> 0
      cyclePhase += 0.005;
      // Normalize to 0..1 sawtooth or sine
      // Let's do a complex multistage cycle
      // 0 -> 1 (Triakis) -> 2 (Star) -> 3 (Spike) -> 0
      // Use sine for smooth loop
      const t = (Math.sin(cyclePhase) + 1) / 2; // 0 to 1
      
      // Stellation Amplitude function
      // We want to pause briefly at key forms?
      // Let's just do smooth breathing for now.
      // Map 0..1 to Extension Factor
      // 0.0 = Icosahedron (flat)
      // 0.3 = Triakis
      // 0.8 = Great/Echidna-ish
      const extension = t * 1.8; // Max extension 1.8x radius

      // Construct current geometry
      // Vertices 0-11: Base
      // Vertices 12-31: Spikes
      
      const currentVertices = [...baseVertices];
      
      // Add spike vertices
      faceNormals.forEach(normal => {
          // Base radius is 1.
          // If extension is 0, we want them at face center?
          // Face center of unit icosahedron is at distance approx 0.7946 from origin.
          // If we want them "flat" on the face, we place them at face center.
          // If we want to "grow" them, we push them out.
          
          const faceCenterDist = 0.79465;
          const r = faceCenterDist + extension;
          
          currentVertices.push([
              normal[0] * r,
              normal[1] * r,
              normal[2] * r
          ]);
      });

      // Project
      const cx = size / 2;
      const cy = size / 2;
      // Adjust scale to fit bounds as it grows
      // Max radius ~ 1 + 1.8 = 2.8
      const fitScale = (size / 2) / 3.0; 
      
      const projected = currentVertices.map(v => {
        // Rotate Y
        let x = v[0] * Math.cos(angleY) - v[2] * Math.sin(angleY);
        let z = v[0] * Math.sin(angleY) + v[2] * Math.cos(angleY);
        let y = v[1];

        // Rotate X
        let yNew = y * Math.cos(angleX) - z * Math.sin(angleX);
        let zNew = y * Math.sin(angleX) + z * Math.cos(angleX);
        
        // Ortho
        return {
            x: cx + x * fitScale,
            y: cy + yNew * fitScale
        };
      });

      ctx.lineWidth = 0.8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Draw Base Edges (always visible, maybe dimmer?)
      // Actually, in stellation, the internal lines are often hidden, but for wireframe "x-ray" look we keep them.
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      baseEdges.forEach(([i, j]) => {
        ctx.moveTo(projected[i].x, projected[i].y);
        ctx.lineTo(projected[j].x, projected[j].y);
      });
      ctx.stroke();

      // Draw Spike Edges
      // Each face (3 base vertices) connects to 1 spike vertex.
      // Face `k` corresponds to spike vertex `12 + k`.
      // Face has indices faces[k] = [v1, v2, v3].
      ctx.globalAlpha = 1.0;
      ctx.beginPath();
      faces.forEach((face, k) => {
          const spikeIdx = 12 + k;
          // Connect spike to its 3 base vertices
          face.forEach(baseIdx => {
              ctx.moveTo(projected[baseIdx].x, projected[baseIdx].y);
              ctx.lineTo(projected[spikeIdx].x, projected[spikeIdx].y);
          });
      });
      ctx.stroke();
      
      ctx.globalAlpha = 1.0;

      requestRef.current = requestAnimationFrame(render);
    };

    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);
    render();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [size, color]);

  return <canvas ref={canvasRef} />;
};
