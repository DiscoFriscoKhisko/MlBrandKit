import React, { useEffect, useRef } from 'react';

interface DataHelixProps {
  size?: number;
  color?: string;
}

export const DataHelix: React.FC<DataHelixProps> = ({ 
  size = 120, 
  color = "#17f7f7" 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, size, size);
      time += 0.03;

      const cx = size / 2;
      const height = size * 0.8;
      const width = size * 0.3;
      const strands = 2;
      const pointsPerStrand = 20;
      const startY = (size - height) / 2;
      const segmentHeight = height / pointsPerStrand;

      ctx.lineCap = 'round';

      for (let s = 0; s < strands; s++) {
          const phaseOffset = s * Math.PI; // 180 degrees apart

          for (let i = 0; i < pointsPerStrand; i++) {
              const y = startY + i * segmentHeight;
              const progress = i / pointsPerStrand;
              
              // Rotation angle
              const angle = time + progress * Math.PI * 4 + phaseOffset;
              
              // Calculate X and Z (depth)
              const x = cx + Math.sin(angle) * width;
              const z = Math.cos(angle); // -1 to 1

              // Draw point
              // Scale size by depth
              const pointSize = 1.5 + z * 0.5;
              const alpha = 0.3 + (z + 1) / 2 * 0.7;

              ctx.fillStyle = color;
              ctx.globalAlpha = alpha;
              ctx.beginPath();
              ctx.arc(x, y, pointSize, 0, Math.PI * 2);
              ctx.fill();

              // Connect to next point in strand
              if (i < pointsPerStrand - 1) {
                  const nextY = startY + (i + 1) * segmentHeight;
                  const nextProgress = (i + 1) / pointsPerStrand;
                  const nextAngle = time + nextProgress * Math.PI * 4 + phaseOffset;
                  const nextX = cx + Math.sin(nextAngle) * width;
                  
                  ctx.strokeStyle = color;
                  ctx.lineWidth = 1;
                  ctx.globalAlpha = alpha * 0.5;
                  ctx.beginPath();
                  ctx.moveTo(x, y);
                  ctx.lineTo(nextX, nextY);
                  ctx.stroke();
              }

              // Connect strands (Ladder rungs)
              if (s === 0) {
                  // Find corresponding point on strand 1
                  const angle2 = time + progress * Math.PI * 4 + Math.PI;
                  const x2 = cx + Math.sin(angle2) * width;
                  
                  // Only draw if z is somewhat positive to avoid clutter? 
                  // Or just draw faint lines
                  ctx.strokeStyle = color;
                  ctx.lineWidth = 0.5;
                  ctx.globalAlpha = 0.1;
                  ctx.beginPath();
                  ctx.moveTo(x, y);
                  ctx.lineTo(x2, y);
                  ctx.stroke();
              }
          }
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
