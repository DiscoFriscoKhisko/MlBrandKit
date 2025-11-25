import React, { useEffect, useRef } from 'react';

interface KineticGridProps {
  width?: number;
  height?: number;
  color?: string;
}

export const KineticGrid: React.FC<KineticGridProps> = ({ 
  width = 400, 
  height = 400,
  color = "#17f7f7" 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Grid configuration
    const rows = 20;
    const cols = 20;
    const points: {x: number, y: number, originX: number, originY: number}[] = [];
    
    const cellWidth = width / cols;
    const cellHeight = height / rows;

    for (let i = 0; i <= rows; i++) {
      for (let j = 0; j <= cols; j++) {
        const x = j * cellWidth;
        const y = i * cellHeight;
        points.push({ x, y, originX: x, originY: y });
      }
    }

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);
      
      // Update points
      points.forEach(p => {
        const dx = p.originX - mouseRef.current.x;
        const dy = p.originY - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;
        
        if (dist < maxDist) {
          const angle = Math.atan2(dy, dx);
          const force = (maxDist - dist) / maxDist;
          const moveDist = force * 40; // Strength
          
          p.x = p.originX + Math.cos(angle) * moveDist;
          p.y = p.originY + Math.sin(angle) * moveDist;
        } else {
          // Return to origin
          p.x += (p.originX - p.x) * 0.1;
          p.y += (p.originY - p.y) * 0.1;
        }
      });

      // Draw Grid Lines
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.3;

      ctx.beginPath();
      
      // Horizontal lines
      for (let i = 0; i <= rows; i++) {
        for (let j = 0; j < cols; j++) {
          const p1 = points[i * (cols + 1) + j];
          const p2 = points[i * (cols + 1) + (j + 1)];
          if (j === 0) ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
      }

      // Vertical lines
      for (let j = 0; j <= cols; j++) {
        for (let i = 0; i < rows; i++) {
          const p1 = points[i * (cols + 1) + j];
          const p2 = points[(i + 1) * (cols + 1) + j];
          if (i === 0) ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
      }
      
      ctx.stroke();

      // Draw Points (optional, maybe just subtle dots at intersections)
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.8;
      points.forEach(p => {
        // Only draw points near mouse for optimization and effect
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        if (Math.sqrt(dx*dx + dy*dy) < 100) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
            ctx.fill();
        }
      });

      requestRef.current = requestAnimationFrame(render);
    };

    // High DPI handling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    render();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [width, height, color]);

  return <canvas ref={canvasRef} />;
};
