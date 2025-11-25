import React, { useEffect, useRef } from 'react';
import { geoGraticule, geoPath } from 'd3-geo';
import { geoPolyhedralWaterman } from 'd3-geo-projection';

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

    // Setup Projection
    // Waterman is a good approximation for a "technical unfolded" map if Fuller isn't available
    const projection = geoPolyhedralWaterman();
    
    const pathGenerator = geoPath()
      .projection(projection)
      .context(ctx);

    const graticule = geoGraticule();

    let rotation = 0;

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, size, size);
      
      // Update rotation
      rotation += rotationSpeed;
      projection.rotate([rotation, -30, 0]); // Rotate world, tilt slightly
      projection.fitSize([size, size], { type: "Sphere" }); // Fit to canvas

      // Style
      ctx.lineWidth = 0.5;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      // Draw Graticule (The "World" Grid)
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.3;
      pathGenerator(graticule());
      ctx.stroke();

      // Draw Outline (The Projection Shape)
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.8;
      pathGenerator({ type: "Sphere" });
      ctx.stroke();

      // Draw Cities
      if (cities.length > 0) {
        cities.forEach(city => {
          const coords = [city.lng, city.lat] as [number, number];
          // Check if point is visible (not clipped) - Waterman handles clipping?
          // Projections in d3 usually return null if clipped, but pathGenerator handles it.
          // We can manually project to get coordinates for custom drawing (circles/text)
          const projected = projection(coords);
          
          if (projected) {
            const [x, y] = projected;
            
            // Draw Point
            ctx.beginPath();
            ctx.fillStyle = "#fefefe"; // White hot
            ctx.globalAlpha = 1;
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();

            // Draw Label
            ctx.font = "10px monospace";
            ctx.fillStyle = color;
            ctx.fillText(city.name.toUpperCase(), x + 5, y + 3);
            
            // Draw Leader Line?
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 0.5;
            ctx.moveTo(x, y);
            ctx.lineTo(x + 4, y + 2);
            ctx.stroke();
          }
        });
      }

      requestRef.current = requestAnimationFrame(render);
    };

    // High DPI setup
    const dpr = window.devicePixelRatio || 1;
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
