"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface DreamCounterProps {
  target: number;
  duration?: number;
}

export function DreamCounter({ target, duration = 2 }: DreamCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      
      // Easing function (ease out cubic)
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCount);
  }, [target, duration]);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="relative"
    >
      <div className="text-7xl sm:text-8xl md:text-9xl font-bold gradient-text tabular-nums">
        {count.toLocaleString()}
      </div>
      <motion.div
        className="absolute -inset-4 bg-purple-500/20 blur-3xl rounded-full -z-10"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  );
}
