"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { Archetype } from "@/lib/mockData";

interface FeaturedArchetypeProps {
  archetype: Archetype;
}

export function FeaturedArchetype({ archetype }: FeaturedArchetypeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8 }}
      className="relative overflow-hidden rounded-2xl dream-glow max-w-md mx-auto"
    >
      {/* Placeholder for AI-generated image */}
      <div className="aspect-[4/3] bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-950 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-2xl"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-16 h-16 text-purple-300 opacity-50" />
        </div>
        
        {/* "AI Image placeholder" text */}
        <div className="absolute bottom-4 right-4 text-xs text-purple-400/50">
          AI visualization coming soon
        </div>
      </div>

      {/* Content */}
      <div className="glass p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs uppercase tracking-wider text-purple-400">
            Featured Archetype
          </span>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-purple-400"
          />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{archetype.name}</h3>
        <p className="text-purple-200 text-sm mb-4">{archetype.description}</p>
        <div className="flex items-center gap-2 text-purple-300">
          <span className="text-lg font-semibold">{archetype.count}</span>
          <span className="text-sm">dreamers experienced this</span>
        </div>
      </div>
    </motion.div>
  );
}
