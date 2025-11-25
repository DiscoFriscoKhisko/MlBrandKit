import React, { useEffect, useRef } from 'react';

interface FluxCoreProps {
  size?: number;
  color?: string;
}

export const FluxCore: React.FC<FluxCoreProps> = ({ 
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

    // Particle setup
    const particleCount = 40;
    const particles: { theta: number; phi: number; radius: number; speed: number }[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        theta: Math.random() * Math.PI * 2,
        phi: Math.acos((Math.random() * 2) - 1),
        radius: 1,
        speed: 0.01 + Math.random() * 0.02
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, size, size);
      time += 0.01;

      const cx = size / 2;
      const cy = size / 2;
      const baseScale = (size / 2) * 0.6;

      // Mouse influence
      const rotX = time * 0.5 + mouseRef.current.y;
      const rotY = time * 0.3 + mouseRef.current.x;
      
      // Breathing effect
      const breathing = 1 + Math.sin(time * 2) * 0.1;
      const scale = baseScale * breathing;

      const projectedPoints: { x: number; y: number; z: number }[] = [];

      // Update and project particles
      particles.forEach(p => {
        // Sphere coordinates
        const x = p.radius * Math.sin(p.phi) * Math.cos(p.theta);
        const y = p.radius * Math.sin(p.phi) * Math.sin(p.theta);
        const z = p.radius * Math.cos(p.phi);

        // Rotate Y
        let x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
        let z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
        let y1 = y;

        // Rotate X
        let y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);
        let x2 = x1;

        projectedPoints.push({
          x: cx + x2 * scale,
          y: cy + y2 * scale,
          z: z2
        });
      });

      // Draw connections
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      
      for (let i = 0; i < projectedPoints.length; i++) {
        for (let j = i + 1; j < projectedPoints.length; j++) {
            const p1 = projectedPoints[i];
            const p2 = projectedPoints[j];
            const dist = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2 + (p1.z - p2.z)**2); // Approximate 3d dist? actually 3d dist logic needed
            // Better: just check distance in 3D space of original points, but here we have projected.
            // Let's just connect close points in 2D for a "constellation" look which is cheaper and looks good
            const dist2d = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
            
            if (dist2d < 30) {
                 ctx.moveTo(p1.x, p1.y);
                 ctx.lineTo(p2.x, p2.y);
            }
        }
      }
      ctx.stroke();

      // Draw particles
      projectedPoints.forEach(p => {
         const alpha = (p.z + 1) / 2; // Depth fade
         ctx.fillStyle = color;
         ctx.globalAlpha = Math.max(0.1, alpha);
         ctx.beginPath();
         ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
         ctx.fill();
      });

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
