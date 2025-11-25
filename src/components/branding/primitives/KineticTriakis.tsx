import React, { useEffect, useRef } from 'react';

interface KineticPolyhedronProps {
  size?: number;
  color?: string;
}

export const KineticTriakis: React.FC<KineticPolyhedronProps> = ({ 
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

    // Based on Triakis Icosahedron logic:
    // It is the dual of the Truncated Dodecahedron.
    // Vertices can be derived from an Icosahedron + Dodecahedron dual relationship or simpler:
    // Use a base Icosahedron and add a pyramid (vertex) to each face center.

    const phi = (1 + Math.sqrt(5)) / 2;
    
    // Icosahedron Vertices (normalized)
    const icoVertices: number[][] = [
      [0, 1, phi], [0, 1, -phi], [0, -1, phi], [0, -1, -phi],
      [1, phi, 0], [1, -phi, 0], [-1, phi, 0], [-1, -phi, 0],
      [phi, 0, 1], [phi, 0, -1], [-phi, 0, 1], [-phi, 0, -1]
    ].map(v => {
        const m = Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2);
        return [v[0]/m, v[1]/m, v[2]/m];
    });

    // Icosahedron Faces (indices of vertices)
    // Need to calculate face centers to add the "stellation" points
    // Simplified: Let's just generate a dense mesh that looks like it.
    // Actually, let's generate a Pentakis Dodecahedron or similar by stellation.
    
    // Let's manually define a set of edges that looks like a faceted gem (Triakis).
    // We can take Icosahedron vertices and "push out" the face centers.
    
    const vertices = [...icoVertices];
    const edges: [number, number][] = [];

    // Helper to find edges of Icosahedron to build the base structure
    const icoEdges: [number, number][] = [];
    for (let i = 0; i < 12; i++) {
        for (let j = i + 1; j < 12; j++) {
            const d = Math.sqrt(
                (vertices[i][0]-vertices[j][0])**2 + 
                (vertices[i][1]-vertices[j][1])**2 + 
                (vertices[i][2]-vertices[j][2])**2
            );
            if (d > 0.9 && d < 1.2) {
                icoEdges.push([i, j]);
            }
        }
    }

    // Find faces (triangles)
    const faces: number[][] = [];
    for (let i = 0; i < 12; i++) {
        for (let j = i + 1; j < 12; j++) {
            for (let k = j + 1; k < 12; k++) {
                const d1 = Math.sqrt((vertices[i][0]-vertices[j][0])**2 + (vertices[i][1]-vertices[j][1])**2 + (vertices[i][2]-vertices[j][2])**2);
                const d2 = Math.sqrt((vertices[j][0]-vertices[k][0])**2 + (vertices[j][1]-vertices[k][1])**2 + (vertices[j][2]-vertices[k][2])**2);
                const d3 = Math.sqrt((vertices[k][0]-vertices[i][0])**2 + (vertices[k][1]-vertices[i][1])**2 + (vertices[k][2]-vertices[i][2])**2);
                if (d1 < 1.2 && d2 < 1.2 && d3 < 1.2) {
                    faces.push([i, j, k]);
                }
            }
        }
    }

    // Add a new vertex for each face (pyramid peak)
    faces.forEach(face => {
        const v1 = vertices[face[0]];
        const v2 = vertices[face[1]];
        const v3 = vertices[face[2]];
        
        // Center
        const cx = (v1[0] + v2[0] + v3[0]) / 3;
        const cy = (v1[1] + v2[1] + v3[1]) / 3;
        const cz = (v1[2] + v2[2] + v3[2]) / 3;
        
        // Extrude
        const height = 1.6; // Spike height
        const nx = cx * height;
        const ny = cy * height;
        const nz = cz * height;

        const newIdx = vertices.length;
        vertices.push([nx, ny, nz]);

        // Connect new vertex to face base vertices
        edges.push([newIdx, face[0]]);
        edges.push([newIdx, face[1]]);
        edges.push([newIdx, face[2]]);
    });
    
    // Also include base edges?
    // For a true Triakis, the base edges are often internal or form the valley.
    // Let's include them for structure.
    // edges.push(...icoEdges); // Uncomment for more density

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
      const scale = (size / 2) * 0.5; 

      const projected = vertices.map(v => {
        let x = v[0] * Math.cos(angleY) - v[2] * Math.sin(angleY);
        let z = v[0] * Math.sin(angleY) + v[2] * Math.cos(angleY);
        let y = v[1];
        let yNew = y * Math.cos(angleX) - z * Math.sin(angleX);
        let zNew = y * Math.sin(angleX) + z * Math.cos(angleX);
        return { x: cx + x * scale, y: cy + yNew * scale };
      });

      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
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
