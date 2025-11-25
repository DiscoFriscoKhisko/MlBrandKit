import React, { useEffect, useRef } from 'react';

interface KineticPolyhedronProps {
  size?: number;
  color?: string;
}

export const KineticGreatDodecahedron: React.FC<KineticPolyhedronProps> = ({ 
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

    // Great Dodecahedron Logic
    // It shares vertices with the Icosahedron.
    // The edges connect vertices in a star pattern.
    
    const phi = (1 + Math.sqrt(5)) / 2;
    
    // Icosahedron Vertices (same as Great Dodecahedron)
    const vertices = [
      [0, 1, phi], [0, 1, -phi], [0, -1, phi], [0, -1, -phi],
      [1, phi, 0], [1, -phi, 0], [-1, phi, 0], [-1, -phi, 0],
      [phi, 0, 1], [phi, 0, -1], [-phi, 0, 1], [-phi, 0, -1]
    ].map(v => {
        const m = Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2);
        return [v[0]/m, v[1]/m, v[2]/m];
    });

    // Edges for Great Dodecahedron
    // In a standard Icosahedron, edges length is ~1.05 (if radius 1).
    // In Great Dodecahedron, faces are intersecting pentagons.
    // Edges connect vertices that are "neighbors of neighbors" in the underlying icosahedral graph?
    // Actually, the edges of a Great Dodecahedron are the same as the Icosahedron? 
    // No, that's the Small Stellated Dodecahedron vs Great Dodecahedron duality confusion.
    // The Great Dodecahedron has 12 pentagonal faces, 30 edges, 12 vertices.
    // The edges are the same as the Icosahedron.
    // WAIT. If the edges are the same, it looks like an Icosahedron in wireframe.
    // Let's use the SECOND image concept: A star-like structure, potentially the **Small Stellated Dodecahedron**.
    // The Small Stellated Dodecahedron shares vertices with the Dodecahedron? No, it shares vertices with the Icosahedron.
    // Let's construct a **Kepler-Poinsot Polyhedron** look manually.
    
    // Let's do a "Star Dodecahedron" (Small Stellated).
    // It's a Dodecahedron with pyramids on faces.
    
    // 1. Dodecahedron Vertices
    const dodVertices: number[][] = [];
    // (±1, ±1, ±1)
    for(let x of [-1, 1]) for(let y of [-1, 1]) for(let z of [-1, 1]) 
        dodVertices.push([x, y, z]);
    // (0, ±phi, ±1/phi)
    for(let i of [-1, 1]) for(let j of [-1, 1])
        dodVertices.push([0, i*phi, j/phi]);
    // (±1/phi, 0, ±phi)
    for(let i of [-1, 1]) for(let j of [-1, 1])
        dodVertices.push([i/phi, 0, j*phi]);
    // (±phi, ±1/phi, 0)
    for(let i of [-1, 1]) for(let j of [-1, 1])
        dodVertices.push([i*phi, j/phi, 0]);

    // Normalize
    const normDodVertices = dodVertices.map(v => {
        const m = Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2);
        return [v[0]/m, v[1]/m, v[2]/m];
    });

    // Build faces of Dodecahedron to stellate
    // For visualization, we can just find nearest neighbors to form pentagons, then extrude.
    // Or simpler: Just take the Dodecahedron vertices and a set of "outer" vertices (Icosahedron scaled up)
    // and connect them. The Small Stellated Dodecahedron vertices ARE the Icosahedron vertices + Dodecahedron vertices?
    // No, the vertices of the Small Stellated Dodecahedron are just the Icosahedron vertices.
    // But the EDGES connect differently.
    // In Small Stellated Dodecahedron, edges connect neighbors in a "pentagram" fashion on the faces of the underlying dodecahedron?
    
    // Let's just do the visual "Star" from image 3.
    // Core: Dodecahedron.
    // Spikes: Pyramids on pentagonal faces.
    
    // We need the face centers of the Dodecahedron.
    // The face centers of a Dodecahedron form an Icosahedron.
    // So we need Dodecahedron vertices AND Icosahedron vertices (scaled up).
    
    const allVertices = [...normDodVertices];
    const icoScale = 2.0; // Points of the star
    // We need aligned Icosahedron vertices.
    // The dual of Dodecahedron is Icosahedron.
    // We can just generate Icosahedron vertices and scale them.
    // Note: Aligning them requires care. 
    // Let's cheat: just calculate face centers of our Dodecahedron vertices.
    
    // Find pentagonal faces
    // 12 faces.
    // Hard to find programmatically without convex hull.
    
    // Let's switch strategy:
    // Vertices = Icosahedron Vertices (tips of stars).
    // Edges = Connect each vertex to 5 others to form the pentagrams.
    // In an Icosahedron, each vertex has 5 neighbors.
    // If we connect neighbors, we get the Icosahedron surface.
    // If we connect "neighbors of neighbors" (distance 2 in graph), we get the Great Dodecahedron?
    // Yes.
    
    const verticesFinal = [...vertices]; // Icosahedron vertices (tips)
    const edgesFinal: [number, number][] = [];
    
    for (let i = 0; i < verticesFinal.length; i++) {
        // Find neighbors
        const neighbors: number[] = [];
        for (let j = 0; j < verticesFinal.length; j++) {
            if (i === j) continue;
            const d = Math.sqrt(
                (verticesFinal[i][0]-verticesFinal[j][0])**2 + 
                (verticesFinal[i][1]-verticesFinal[j][1])**2 + 
                (verticesFinal[i][2]-verticesFinal[j][2])**2
            );
            if (d > 0.9 && d < 1.2) { // Icosahedron edge length ~ 1.05
                neighbors.push(j);
            }
        }
        
        // In Icosahedron, neighbors form a pentagon.
        // We want to draw the pentagram inside this pentagon?
        // Or connect 'i' to 'neighbors of neighbors'?
        // Actually the Great Dodecahedron edges ARE the pentagram edges inside the icosahedron?
        // No. The Small Stellated Dodecahedron edges are the pentagram edges.
        // Let's try connecting neighbors of neighbors.
        
        // For each neighbor, find its neighbors that are NOT i and NOT shared.
        // Actually, simpler: Distance based.
        // In unit Icosahedron:
        // Dist 1: ~1.05 (Edge)
        // Dist 2: ~1.70 (Across pentagon cap) <- This forms the pentagrams/Great Dodecahedron edges?
        // Dist 3: 2.0 (Opposite)
        
        for (let j = i + 1; j < verticesFinal.length; j++) {
             const d = Math.sqrt(
                (verticesFinal[i][0]-verticesFinal[j][0])**2 + 
                (verticesFinal[i][1]-verticesFinal[j][1])**2 + 
                (verticesFinal[i][2]-verticesFinal[j][2])**2
            );
            
            // Connect points that are "across" the pentagon caps
            if (d > 1.6 && d < 1.8) {
                edgesFinal.push([i, j]);
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
      const scale = (size / 2) * 0.5; 

      const projected = verticesFinal.map(v => {
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
      edgesFinal.forEach(([i, j]) => {
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
