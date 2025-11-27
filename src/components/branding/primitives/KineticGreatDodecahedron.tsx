import React, { useEffect, useRef } from 'react';
import { greatDodecahedronGeometry } from '../geometry-utils';

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
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const { vertices, edges } = greatDodecahedronGeometry;

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

      const sinY = Math.sin(angleY);
      const cosY = Math.cos(angleY);
      const sinX = Math.sin(angleX);
      const cosX = Math.cos(angleX);

      const projected = vertices.map(v => {
        const x = v[0] * cosY - v[2] * sinY;
        const z = v[0] * sinY + v[2] * cosY;
        const y = v[1];
        const yNew = y * cosX - z * sinX;
        return { x: cx + x * scale, y: cy + yNew * scale };
      });

      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      ctx.beginPath();
      for (let i = 0; i < edges.length; i++) {
        const [v1, v2] = edges[i];
        const p1 = projected[v1];
        const p2 = projected[v2];
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      }
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
