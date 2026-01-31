"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { TopElement } from "@/lib/mockData";

interface TopElementsPulseProps {
  elements: TopElement[];
}

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

const trendColors = {
  up: "text-green-400",
  down: "text-red-400",
  stable: "text-yellow-400",
};

export function TopElementsPulse({ elements }: TopElementsPulseProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {elements.map((element, index) => {
        const TrendIcon = trendIcons[element.trend];
        const trendColor = trendColors[element.trend];

        return (
          <motion.div
            key={element.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="relative group"
          >
            <div className="glass rounded-xl px-6 py-4 dream-glow dream-glow-hover transition-all cursor-pointer">
              <motion.div
                className="absolute inset-0 bg-purple-500/10 rounded-xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{
                  duration: 2 + index * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative flex items-center gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white capitalize">
                    {element.name}
                  </div>
                  <div className="text-sm text-purple-300">
                    {element.count} dreams
                  </div>
                </div>
                <TrendIcon className={`w-5 h-5 ${trendColor}`} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
