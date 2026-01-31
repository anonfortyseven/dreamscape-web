"use client";

import { motion } from "framer-motion";
import type { LatestDream } from "@/lib/mockData";

interface DreamStreamProps {
  dreams: LatestDream[];
}

export function DreamStream({ dreams }: DreamStreamProps) {
  // Duplicate dreams for seamless scrolling
  const allDreams = [...dreams, ...dreams];

  return (
    <div className="relative h-80 overflow-hidden">
      {/* Gradient overlays for fade effect */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#0a0014] to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0014] to-transparent z-10" />

      <motion.div
        animate={{ y: "-50%" }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="space-y-4"
      >
        {allDreams.map((dream, index) => (
          <motion.div
            key={`${dream.id}-${index}`}
            initial={{ opacity: 0.5 }}
            whileHover={{ opacity: 1, scale: 1.02 }}
            className="glass rounded-lg p-4 mx-4 transition-all cursor-pointer"
          >
            <p className="text-purple-100 text-sm leading-relaxed line-clamp-2">
              &ldquo;{dream.snippet}&rdquo;
            </p>
            <p className="text-purple-400/60 text-xs mt-2">{dream.time}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
