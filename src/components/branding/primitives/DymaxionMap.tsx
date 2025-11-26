import React, { useEffect, useRef } from 'react';

export interface City {
  name: string;
  lat: number;
  lng: number;
}

interface DymaxionMapProps {
  size?: number;
  color?: string;
  cities?: City[];
  rotationSpeed?: number;
}

export const DymaxionMap: React.FC<DymaxionMapProps> = ({ 
  size = 400, 
  color = "#17f7f7",
  cities = [],
  rotationSpeed = 0.2
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple 3D Sphere Projection (Orthographic)
    const spherePoints: {theta: number, phi: number}[] = [];
    const gridSteps = 24;
    
    // Generate Latitude Lines
    for(let i = 1; i < gridSteps; i++) {
        const phi = (i / gridSteps) * Math.PI; // 0 to PI
        const ringRadius = Math.sin(phi);
        const ringY = Math.cos(phi);
        const pointsInRing = Math.floor(gridSteps * 2 * ringRadius) + 1;
        
        for(let j = 0; j < pointsInRing; j++) {
            const theta = (j / pointsInRing) * Math.PI * 2;
            spherePoints.push({theta, phi});
        }
    }

    // Cities to Spherical
    const cityPoints = cities.map(c => {
        const phi = (90 - c.lat) * (Math.PI / 180);
        const theta = (c.lng + 180) * (Math.PI / 180);
        return { ...c, phi, theta };
    });

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, size, size);
      time += 0.01;

      const cx = size / 2;
      const cy = size / 2;
      const radius = size * 0.45;

      const rotY = time * rotationSpeed;
      const rotX = 0.3; // Tilt

      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      
      // Draw Grid Points (World)
      spherePoints.forEach(p => {
         // Spherical to Cartesian
         let x = radius * Math.sin(p.phi) * Math.cos(p.theta);
         let y = radius * Math.cos(p.phi);
         let z = radius * Math.sin(p.phi) * Math.sin(p.theta);

         // Rotate Y
         let x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
         let z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
         let y1 = y;

         // Rotate X
         let y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
         let z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);
         let x2 = x1;

         // Draw only front facing
         if (z2 > 0) {
             const alpha = (z2 / radius); 
             ctx.globalAlpha = alpha * 0.3;
             ctx.beginPath();
             ctx.arc(cx + x2, cy + y2, 1, 0, Math.PI * 2);
             ctx.fill();
         }
      });

      // Draw Outer Circle
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw Cities
      cityPoints.forEach(c => {
         // Spherical to Cartesian
         let x = radius * Math.sin(c.phi) * Math.cos(c.theta);
         let y = radius * Math.cos(c.phi);
         let z = radius * Math.sin(c.phi) * Math.sin(c.theta);

         // Rotate Y
         let x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
         let z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
         let y1 = y;

         // Rotate X
         let y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
         let z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);
         let x2 = x1;

         if (z2 > 0) {
             ctx.globalAlpha = 1;
             ctx.beginPath();
             ctx.fillStyle = "#fefefe";
             ctx.arc(cx + x2, cy + y2, 3, 0, Math.PI * 2);
             ctx.fill();
             
             ctx.font = "10px monospace";
             ctx.fillStyle = color;
             ctx.fillText(c.name.toUpperCase(), cx + x2 + 6, cy + y2 + 3);
             
             // Leader
             ctx.beginPath();
             ctx.strokeStyle = color;
             ctx.lineWidth = 0.5;
             ctx.moveTo(cx + x2, cy + y2);
             ctx.lineTo(cx + x2 + 4, cy + y2);
             ctx.stroke();
         }
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
  }, [size, color, cities, rotationSpeed]);

  return <canvas ref={canvasRef} />;
};
