import { motion } from "motion/react";

interface KineticHexProps {
  className?: string;
  color?: string;
  size?: number;
  animate?: boolean;
}

export function KineticHex({ 
  className = "", 
  color = "currentColor", 
  size = 24,
  animate = true 
}: KineticHexProps) {
  
  // The Vertical Hexagon Path
  // M12 0 (Top) -> L22.39 6 (TopRight) -> L22.39 18 (BotRight) -> L12 24 (Bot) -> L1.61 18 (BotLeft) -> L1.61 6 (TopLeft) -> Z
  const pathData = "M12 0L22.39 6L22.39 18L12 24L1.61 18L1.61 6Z";

  return (
    <div 
      className={`relative flex items-center justify-center ${className}`} 
      style={{ width: size, height: size }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={animate ? "initial" : "visible"}
        animate={animate ? "visible" : "visible"}
      >
        {/* The Core Spark */}
        <motion.path
          d={pathData}
          fill={color}
          variants={{
            initial: { 
              scale: 0, 
              opacity: 0, 
              rotate: -180 
            },
            visible: { 
              scale: 1, 
              opacity: 1, 
              rotate: 0,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.8
              }
            }
          }}
        />

        {/* The Glitch/Echo Effect (Outer Ring 1) */}
        {animate && (
          <motion.path
            d={pathData}
            stroke={color}
            strokeWidth="0.5"
            fill="none"
            variants={{
              initial: { scale: 0.8, opacity: 0 },
              visible: { 
                scale: [1, 1.4, 1],
                opacity: [0, 0.5, 0],
                rotate: [0, 15, 0],
                transition: {
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 3
                }
              }
            }}
          />
        )}

        {/* The Pulse (Outer Ring 2 - Fast) */}
        {animate && (
          <motion.path
            d={pathData}
            stroke={color}
            strokeWidth="0.2"
            fill="none"
            variants={{
              initial: { scale: 1, opacity: 0 },
              visible: { 
                scale: [1, 1.8],
                opacity: [0.8, 0],
                transition: {
                  duration: 1,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: 4
                }
              }
            }}
          />
        )}
      </motion.svg>
    </div>
  );
}
