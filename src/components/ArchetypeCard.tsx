"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ArchetypeCardProps {
  name: string;
  count: number;
  trend?: "up" | "down" | "stable";
  description?: string;
  index?: number;
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

export function ArchetypeCard({
  name,
  count,
  trend = "stable",
  description,
  index = 0,
}: ArchetypeCardProps) {
  const TrendIcon = trendIcons[trend];
  const trendColor = trendColors[trend];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="glass rounded-xl p-6 dream-glow dream-glow-hover transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-purple-200 transition-colors">
          {name}
        </h3>
        <TrendIcon className={`w-5 h-5 ${trendColor}`} />
      </div>

      {description && (
        <p className="text-purple-300/80 text-sm mb-4 line-clamp-2">
          {description}
        </p>
      )}

      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold gradient-text">{count}</span>
        <span className="text-purple-400 text-sm">dreams</span>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-purple-500/0 group-hover:bg-purple-500/5 transition-colors -z-10"
      />
    </motion.div>
  );
}
