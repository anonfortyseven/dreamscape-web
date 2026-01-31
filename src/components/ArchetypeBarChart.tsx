"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ArchetypeBarChartProps {
  archetypes: Array<{ name: string; count: number; description?: string }>;
}

const COLORS = ["#8b5cf6", "#ec4899", "#06b6d4", "#10b981", "#f59e0b"];

export function ArchetypeBarChart({ archetypes }: ArchetypeBarChartProps) {
  const data = archetypes.slice(0, 5).map((archetype, index) => ({
    name: archetype.name,
    count: archetype.count,
    fill: COLORS[index % COLORS.length],
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass rounded-lg p-3 min-w-[150px]">
          <p className="text-white font-medium capitalize">{data.name}</p>
          <p className="text-purple-300">{data.count} dreamers</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-xl p-6 dream-glow"
    >
      <h3 className="text-xl font-semibold text-white dark:text-gray-900 mb-6 text-center">
        Top Archetypes
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ right: 30 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} vertical={false} />
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" tick={{ fill: "currentColor", fontSize: 12 }} width={120} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[4, 0, 0, 4]}>
            {data.map((entry, index) => (
              <g key={`bar-${index}`} clipPath="url(#clip)">
                <rect fill={entry.fill} />
              </g>
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
