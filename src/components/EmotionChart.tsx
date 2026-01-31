"use client";

import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface EmotionChartProps {
  emotions: Record<string, number>;
}

const COLORS: Record<string, string> = {
  fear: "#ef4444",
  confusion: "#f59e0b",
  joy: "#22c55e",
  sadness: "#3b82f6",
  peace: "#8b5cf6",
};

const LABELS: Record<string, string> = {
  fear: "😨 Fear",
  confusion: "😕 Confusion",
  joy: "😊 Joy",
  sadness: "😢 Sadness",
  peace: "😌 Peace",
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="glass rounded-lg p-3">
        <p className="text-white font-medium">{LABELS[data.name] || data.name}</p>
        <p className="text-purple-300">{data.value} dreams</p>
      </div>
    );
  }
  return null;
};

export function EmotionChart({ emotions }: EmotionChartProps) {
  const data = Object.entries(emotions).map(([name, value]) => ({
    name,
    value,
    label: LABELS[name] || name,
  }));

  const total = Object.values(emotions).reduce((a, b) => a + b, 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-xl p-6 dream-glow"
    >
      <h3 className="text-xl font-semibold text-white mb-4">
        Emotional Landscape
      </h3>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="w-full lg:w-1/2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[entry.name] || "#8b5cf6"}
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full lg:w-1/2 space-y-3">
          {data.map((item, index) => {
            const percentage = ((item.value / total) * 100).toFixed(1);
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[item.name] }}
                />
                <span className="text-purple-200 flex-1">{item.label}</span>
                <span className="text-white font-medium">{percentage}%</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
