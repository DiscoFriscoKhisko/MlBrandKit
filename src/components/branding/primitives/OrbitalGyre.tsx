import React, { useEffect, useRef } from 'react';

interface OrbitalGyreProps {
  size?: number;
  color?: string;
}

export const OrbitalGyre: React.FC<OrbitalGyreProps> = ({ 
  size = 120, 
  color = "#fefefe" 
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

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, size, size);
      time += 0.01;

      const cx = size / 2;
      const cy = size / 2;
      const radius = (size / 2) * 0.8;

      const rings = 5;
      
      for (let i = 0; i < rings; i++) {
         const ringRadius = radius * (1 - i * 0.15);
         const speed = 0.5 + i * 0.2;
         
         // Rotation based on time and mouse
         const rotationX = time * speed + mouseRef.current.y * (i + 1) * 0.5;
         const rotationY = time * speed * 0.7 + mouseRef.current.x * (i + 1) * 0.5;

         ctx.strokeStyle = color;
         ctx.lineWidth = 1.5;
         ctx.globalAlpha = 0.2 + (1 - i/rings) * 0.8; // Inner rings brighter? or outer?
         
         // We simulate 3D rings by drawing ellipses and rotating the context?
         // Better: Calculate 3D points for a circle and project them.
         
         ctx.beginPath();
         for (let a = 0; a <= Math.PI * 2; a += 0.1) {
             const x = ringRadius * Math.cos(a);
             const y = ringRadius * Math.sin(a);
             const z = 0;

             // Rotate around arbitrary axes to create Gyroscope feel
             // Ring specific tilt
             const tiltX = i * 0.5 + rotationX;
             const tiltY = i * 0.3 + rotationY;

             // 3D Rotation Logic
             // Rotate X
             let y1 = y * Math.cos(tiltX) - z * Math.sin(tiltX);
             let z1 = y * Math.sin(tiltX) + z * Math.cos(tiltX);
             let x1 = x;

             // Rotate Y
             let x2 = x1 * Math.cos(tiltY) - z1 * Math.sin(tiltY);
             let z2 = x1 * Math.sin(tiltY) + z1 * Math.cos(tiltY);
             let y2 = y1;

             // Project
             const scale = 1; // Orthographic
             const px = cx + x2 * scale;
             const py = cy + y2 * scale;

             if (a === 0) ctx.moveTo(px, py);
             else ctx.lineTo(px, py);
         }
         ctx.closePath();
         ctx.stroke();
      }

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
