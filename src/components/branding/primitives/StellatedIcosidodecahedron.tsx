import React, { useEffect, useRef } from 'react';

interface StellatedIcosidodecahedronProps {
  size?: number;
  color?: string;
}

export const StellatedIcosidodecahedron: React.FC<StellatedIcosidodecahedronProps> = ({ 
  size = 120, 
  color = "#17f7f7" 
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

    // --- Geometry Generation ---

    // 1. Generate Base Icosahedron Vertices (to derive Icosidodecahedron)
    // Normalized to radius 1
    let icoVertices = [
      [0, 1, phi], [0, 1, -phi], [0, -1, phi], [0, -1, -phi],
      [1, phi, 0], [1, -phi, 0], [-1, phi, 0], [-1, -phi, 0],
      [phi, 0, 1], [phi, 0, -1], [-phi, 0, 1], [-phi, 0, -1]
    ].map(v => {
      const m = Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2);
      return [v[0]/m, v[1]/m, v[2]/m] as [number, number, number];
    });

    // 2. Find Icosahedron Edges
    const icoEdges: [number, number][] = [];
    for (let i = 0; i < 12; i++) {
      for (let j = i + 1; j < 12; j++) {
        const d = Math.sqrt(
          (icoVertices[i][0]-icoVertices[j][0])**2 +
          (icoVertices[i][1]-icoVertices[j][1])**2 +
          (icoVertices[i][2]-icoVertices[j][2])**2
        );
        // Edge length of unit icosahedron is approx 1.051
        if (d > 0.9 && d < 1.2) {
          icoEdges.push([i, j]);
        }
      }
    }

    // 3. Generate Icosidodecahedron Vertices (Midpoints of Icosahedron Edges)
    const idVertices: [number, number, number][] = icoEdges.map(([i, j]) => {
      const v1 = icoVertices[i];
      const v2 = icoVertices[j];
      const mx = (v1[0] + v2[0]) / 2;
      const my = (v1[1] + v2[1]) / 2;
      const mz = (v1[2] + v2[2]) / 2;
      // Normalize to project to sphere
      const m = Math.sqrt(mx*mx + my*my + mz*mz);
      return [mx/m, my/m, mz/m];
    });

    // 4. Identify Faces of Icosidodecahedron to build Stellation Spikes
    // We need 20 Triangles and 12 Pentagons.
    
    // Triangles: correspond to Icosahedron Faces.
    // We can find these by looking for triplets of ID vertices that are close to each other.
    // Or easier: The centers of Icosahedron Faces are the directions for the triangular spikes.
    const triSpikeDirs: [number, number, number][] = [];
    
    // Find Icosahedron faces first
    for (let i = 0; i < 12; i++) {
        for (let j = i + 1; j < 12; j++) {
            for (let k = j + 1; k < 12; k++) {
                const d1 = dist(icoVertices[i], icoVertices[j]);
                const d2 = dist(icoVertices[j], icoVertices[k]);
                const d3 = dist(icoVertices[k], icoVertices[i]);
                if (isEdge(d1) && isEdge(d2) && isEdge(d3)) {
                    // This is an Icosahedron Face.
                    // The normal is the direction for the Dodecahedral vertex (Triangle Spike).
                    const c = center(icoVertices[i], icoVertices[j], icoVertices[k]);
                    triSpikeDirs.push(normalize(c));
                }
            }
        }
    }

    // Pentagons: correspond to Icosahedron Vertices.
    // The direction is simply the Icosahedron vertex itself!
    const pentSpikeDirs = icoVertices; // 12 directions

    // Map spikes to ID vertices for drawing lines.
    // Each Triangle Spike connects to 3 ID vertices.
    // Each Pentagon Spike connects to 5 ID vertices.
    
    // Let's precompute connectivity.
    // For each TriSpikeDir, find the 3 closest ID vertices.
    const triConnections: number[][] = triSpikeDirs.map(dir => {
        // Find 3 closest ID vertices
        return getClosestIndices(dir, idVertices, 3);
    });

    // For each PentSpikeDir, find the 5 closest ID vertices.
    const pentConnections: number[][] = pentSpikeDirs.map(dir => {
        return getClosestIndices(dir, idVertices, 5);
    });

    // Helpers
    function dist(v1: number[], v2: number[]) {
        return Math.sqrt((v1[0]-v2[0])**2 + (v1[1]-v2[1])**2 + (v1[2]-v2[2])**2);
    }
    function isEdge(d: number) { return d > 0.9 && d < 1.2; }
    function center(v1: number[], v2: number[], v3: number[]) {
        return [(v1[0]+v2[0]+v3[0])/3, (v1[1]+v2[1]+v3[1])/3, (v1[2]+v2[2]+v3[2])/3];
    }
    function normalize(v: number[]): [number, number, number] {
        const m = Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2);
        return [v[0]/m, v[1]/m, v[2]/m];
    }
    function getClosestIndices(target: number[], pool: number[][], count: number) {
        return pool
            .map((v, i) => ({ i, d: dist(target, v) }))
            .sort((a, b) => a.d - b.d)
            .slice(0, count)
            .map(item => item.i);
    }

    // --- Animation Loop ---

    let baseAngleX = 0;
    let baseAngleY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let time = 0;

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 0.01;
      baseAngleX += 0.001;
      baseAngleY += 0.002;
      
      // Mouse interaction
      currentMouseX += (mouseRef.current.y * 1.0 - currentMouseX) * 0.05;
      currentMouseY += (mouseRef.current.x * 1.0 - currentMouseY) * 0.05;
      
      const angleX = baseAngleX + currentMouseX;
      const angleY = baseAngleY + currentMouseY;

      // Breathing Animation for Stellation
      // We oscillate between different stellation forms
      // Phase 1: Grow Triangle Spikes (Dodecahedron Compound)
      // Phase 2: Grow Pentagon Spikes (Icosahedron Compound)
      // Phase 3: Both
      
      const cycle = (Math.sin(time) + 1) / 2; // 0..1
      const cycle2 = (Math.cos(time * 0.7) + 1) / 2; // 0..1
      
      // 1.0 is approx intersection radius. Let's go further to show spikes.
      const triHeight = 1.0 + cycle * 0.8; 
      const pentHeight = 1.0 + cycle2 * 0.8; 

      // Build Render List
      const renderVertices = [...idVertices]; // 0-29
      
      // Add Tri Spikes (30-49)
      triSpikeDirs.forEach(dir => {
          renderVertices.push([dir[0]*triHeight, dir[1]*triHeight, dir[2]*triHeight]);
      });
      
      // Add Pent Spikes (50-61)
      pentSpikeDirs.forEach(dir => {
          renderVertices.push([dir[0]*pentHeight, dir[1]*pentHeight, dir[2]*pentHeight]);
      });

      // Project
      const cx = size / 2;
      const cy = size / 2;
      const scale = (size / 2) / 2.5; // Fit

      const projected = renderVertices.map(v => {
        // Rot Y
        let x = v[0] * Math.cos(angleY) - v[2] * Math.sin(angleY);
        let z = v[0] * Math.sin(angleY) + v[2] * Math.cos(angleY);
        let y = v[1];

        // Rot X
        let yNew = y * Math.cos(angleX) - z * Math.sin(angleX);
        let zNew = y * Math.sin(angleX) + z * Math.cos(angleX);
        
        return { x: cx + x * scale, y: cy + yNew * scale, z: zNew };
      });

      // Draw
      ctx.lineWidth = 0.6;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      // Draw Icosidodecahedron "Frame" (faint)
      // Need edges of Icosidodecahedron.
      // An edge exists between ID vertices if they share an Icosahedron Face or Vertex...
      // Easier: Draw the spike connections, they outline the shape.
      
      // Draw Triangle Spikes
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      triConnections.forEach((indices, k) => {
          const spikeIndex = 30 + k;
          const pSpike = projected[spikeIndex];
          indices.forEach(idIndex => {
              const pBase = projected[idIndex];
              ctx.moveTo(pBase.x, pBase.y);
              ctx.lineTo(pSpike.x, pSpike.y);
          });
      });
      ctx.stroke();

      // Draw Pentagon Spikes
      ctx.strokeStyle = "#fefefe"; // Contrast color for pentagons? Or same?
      // Let's use a slightly different shade or alpha to distinguish the compound nature
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      pentConnections.forEach((indices, k) => {
          const spikeIndex = 30 + 20 + k;
          const pSpike = projected[spikeIndex];
          indices.forEach(idIndex => {
              const pBase = projected[idIndex];
              ctx.moveTo(pBase.x, pBase.y);
              ctx.lineTo(pSpike.x, pSpike.y);
          });
      });
      ctx.stroke();
      
      // Connect the tips? (optional, makes it look solid)
      // The Compound of Dodecahedron and Icosahedron has edges between tips.
      // We can just leave it as a "starburst" from the hidden Icosidodecahedron core.
      
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
