import React, { useEffect, useRef } from 'react';

interface KineticPolyhedronProps {
  size?: number;
  color?: string;
}

export const KineticRhombic: React.FC<KineticPolyhedronProps> = ({ 
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

    // Rhombic Triacontahedron logic (or similar complex faceted form)
    // Vertices are the union of:
    // 1. Dodecahedron vertices
    // 2. Icosahedron vertices (scaled to matching radius)
    
    const phi = (1 + Math.sqrt(5)) / 2;
    
    // Icosahedron (normalized)
    const icoVerts = [
      [0, 1, phi], [0, 1, -phi], [0, -1, phi], [0, -1, -phi],
      [1, phi, 0], [1, -phi, 0], [-1, phi, 0], [-1, -phi, 0],
      [phi, 0, 1], [phi, 0, -1], [-phi, 0, 1], [-phi, 0, -1]
    ].map(v => {
         const m = Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2);
         return [v[0]/m, v[1]/m, v[2]/m];
    });

    // Dodecahedron (normalized)
    // (±1, ±1, ±1)
    // (0, ±phi, ±1/phi)
    // (±1/phi, 0, ±phi)
    // (±phi, ±1/phi, 0)
    let dodVerts: number[][] = [];
    for(let x of [-1, 1]) for(let y of [-1, 1]) for(let z of [-1, 1]) dodVerts.push([x, y, z]);
    for(let i of [-1, 1]) for(let j of [-1, 1]) dodVerts.push([0, i*phi, j/phi]);
    for(let i of [-1, 1]) for(let j of [-1, 1]) dodVerts.push([i/phi, 0, j*phi]);
    for(let i of [-1, 1]) for(let j of [-1, 1]) dodVerts.push([i*phi, j/phi, 0]);
    
    dodVerts = dodVerts.map(v => {
        const m = Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2);
        return [v[0]/m, v[1]/m, v[2]/m];
    });

    // Combine
    // Note: Icosahedron and Dodecahedron vertices in dual position might need scaling relative to each other
    // to form the Rhombic Triacontahedron.
    // In Rhombic Triacontahedron, all vertices are at same distance? No.
    // There are 2 types of vertices: 12 (5-fold) and 20 (3-fold).
    // But we normalized them all, so they are on a sphere (Geodesic-ish).
    const vertices = [...icoVerts, ...dodVerts];
    
    // Edges: Connect nearest neighbors
    // Since we projected everything to a sphere, just finding close points works for a cool mesh.
    const edges: [number, number][] = [];
    
    for (let i = 0; i < vertices.length; i++) {
        for (let j = i + 1; j < vertices.length; j++) {
             const d = Math.sqrt(
                (vertices[i][0]-vertices[j][0])**2 + 
                (vertices[i][1]-vertices[j][1])**2 + 
                (vertices[i][2]-vertices[j][2])**2
            );
            // Experimentally found distance for this density
            if (d > 0.5 && d < 0.7) { 
                edges.push([i, j]);
            }
        }
    }

    let baseAngleX = 0;
    let baseAngleY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      baseAngleX += 0.002;
      baseAngleY += 0.003;
      currentMouseX += (mouseRef.current.y * 1.5 - currentMouseX) * 0.05;
      currentMouseY += (mouseRef.current.x * 1.5 - currentMouseY) * 0.05;
      
      const angleX = baseAngleX + currentMouseX;
      const angleY = baseAngleY + currentMouseY;

      const cx = size / 2;
      const cy = size / 2;
      const scale = (size / 2) * 0.55; 

      const projected = vertices.map(v => {
        let x = v[0] * Math.cos(angleY) - v[2] * Math.sin(angleY);
        let z = v[0] * Math.sin(angleY) + v[2] * Math.cos(angleY);
        let y = v[1];
        let yNew = y * Math.cos(angleX) - z * Math.sin(angleX);
        let zNew = y * Math.sin(angleX) + z * Math.cos(angleX);
        return { x: cx + x * scale, y: cy + yNew * scale };
      });

      ctx.strokeStyle = color;
      ctx.lineWidth = 0.8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      edges.forEach(([i, j]) => {
        ctx.moveTo(projected[i].x, projected[i].y);
        ctx.lineTo(projected[j].x, projected[j].y);
      });
      ctx.stroke();

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
