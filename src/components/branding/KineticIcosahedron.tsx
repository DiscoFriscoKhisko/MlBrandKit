import React, { useEffect, useRef } from 'react';

interface KineticIcosahedronProps {
  size?: number;
  color?: string;
}

export const KineticIcosahedron: React.FC<KineticIcosahedronProps> = ({ 
  size = 120, 
  color = "#090909" 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position from -1 to 1 based on window center
      // This gives a global feel to the movement
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

    // Golden ratio
    const phi = (1 + Math.sqrt(5)) / 2;
    
    // Vertices of an icosahedron
    // (0, ±1, ±phi), (±1, ±phi, 0), (±phi, 0, ±1)
    let vertices = [
      [0, 1, phi], [0, 1, -phi], [0, -1, phi], [0, -1, -phi],
      [1, phi, 0], [1, -phi, 0], [-1, phi, 0], [-1, -phi, 0],
      [phi, 0, 1], [phi, 0, -1], [-phi, 0, 1], [-phi, 0, -1]
    ];

    // Normalize vertices to radius 1
    vertices = vertices.map(v => {
      const mag = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
      return [v[0]/mag, v[1]/mag, v[2]/mag];
    });

    // Edges calculation
    const edges: [number, number][] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dist = Math.sqrt(
          Math.pow(vertices[i][0] - vertices[j][0], 2) +
          Math.pow(vertices[i][1] - vertices[j][1], 2) +
          Math.pow(vertices[i][2] - vertices[j][2], 2)
        );
        if (dist < 1.1 && dist > 0.9) {
          edges.push([i, j]);
        }
      }
    }

    // Animation state
    let baseAngleX = 0;
    let baseAngleY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const render = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Constant slow rotation
      baseAngleX += 0.002;
      baseAngleY += 0.003;

      // Mouse interaction
      // Target follows mouse
      targetMouseX = mouseRef.current.y * 1.5; // Tilt strength
      targetMouseY = mouseRef.current.x * 1.5;

      // Smooth lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Combine
      const angleX = baseAngleX + currentMouseX;
      const angleY = baseAngleY + currentMouseY;

      const cx = size / 2;
      const cy = size / 2;
      const scale = (size / 2) * 0.7; 

      // Rotate and project
      const projected = vertices.map(v => {
        // Rotate Y
        let x = v[0] * Math.cos(angleY) - v[2] * Math.sin(angleY);
        let z = v[0] * Math.sin(angleY) + v[2] * Math.cos(angleY);
        let y = v[1];

        // Rotate X
        let yNew = y * Math.cos(angleX) - z * Math.sin(angleX);
        let zNew = y * Math.sin(angleX) + z * Math.cos(angleX);
        y = yNew;
        z = zNew;

        // Orthographic projection
        return {
          x: cx + x * scale,
          y: cy + y * scale
        };
      });

      // Draw edges
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      edges.forEach(([i, j]) => {
        ctx.moveTo(projected[i].x, projected[i].y);
        ctx.lineTo(projected[j].x, projected[j].y);
      });
      ctx.stroke();

      requestRef.current = requestAnimationFrame(render);
    };

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    // Reset transform to identity before scaling to avoid accumulation if effect re-runs
    ctx.setTransform(1, 0, 0, 1, 0, 0); 
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    render();

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [size, color]);

  return <canvas ref={canvasRef} width={size} height={size} />;
};
