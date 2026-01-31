"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TimelinePoint } from "@/lib/mockData";

interface TimelineProps {
  data: TimelinePoint[];
}

const emotionColors: Record<string, string> = {
  fear: "#ef4444",
  confusion: "#f59e0b",
  joy: "#22c55e",
  sadness: "#3b82f6",
  peace: "#8b5cf6",
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: TimelinePoint }>;
  label?: string;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass rounded-lg p-4 min-w-48">
        <p className="text-white font-medium mb-2">{data.month}</p>
        <div className="space-y-1 text-sm">
          <p className="text-purple-200">
            Top Element:{" "}
            <span className="text-white capitalize">{data.topElement}</span>
          </p>
          <p className="text-purple-200">
            Dreams Analyzed: <span className="text-white">{data.dreams}</span>
          </p>
          <p className="text-purple-200">
            Dominant Emotion:{" "}
            <span
              style={{ color: emotionColors[data.dominantEmotion] }}
              className="capitalize"
            >
              {data.dominantEmotion}
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function Timeline({ data }: TimelineProps) {
  const [selectedPoint, setSelectedPoint] = useState<TimelinePoint | null>(
    null
  );

  return (
    <div className="space-y-8">
      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-6 dream-glow"
      >
        <h3 className="text-xl font-semibold text-white mb-6">
          Dream Patterns Over Time
        </h3>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              onClick={(e) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const chartEvent = e as any;
                if (chartEvent && chartEvent.activePayload && chartEvent.activePayload.length > 0) {
                  setSelectedPoint(chartEvent.activePayload[0].payload as TimelinePoint);
                }
              }}
            >
              <defs>
                <linearGradient id="colorDreams" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                tick={{ fill: "#a78bfa", fontSize: 12 }}
                axisLine={{ stroke: "#4c1d95" }}
                tickLine={{ stroke: "#4c1d95" }}
                tickFormatter={(value) => value.split(" ")[0]}
              />
              <YAxis
                tick={{ fill: "#a78bfa", fontSize: 12 }}
                axisLine={{ stroke: "#4c1d95" }}
                tickLine={{ stroke: "#4c1d95" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="dreams"
                stroke="#8b5cf6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorDreams)"
                style={{ cursor: "pointer" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Selected Point Details */}
      <AnimatePresence mode="wait">
        {selectedPoint && (
          <motion.div
            key={selectedPoint.month}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="glass rounded-xl p-6 dream-glow"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold gradient-text">
                {selectedPoint.month}
              </h3>
              <button
                onClick={() => setSelectedPoint(null)}
                className="text-purple-400 hover:text-white transition-colors text-sm"
              >
                Clear
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-purple-400 text-sm mb-1">
                  Most Common Element
                </p>
                <p className="text-2xl font-semibold text-white capitalize">
                  {selectedPoint.topElement}
                </p>
              </div>
              <div>
                <p className="text-purple-400 text-sm mb-1">Dreams Analyzed</p>
                <p className="text-2xl font-semibold text-white">
                  {selectedPoint.dreams}
                </p>
              </div>
              <div>
                <p className="text-purple-400 text-sm mb-1">Dominant Emotion</p>
                <p
                  className="text-2xl font-semibold capitalize"
                  style={{
                    color: emotionColors[selectedPoint.dominantEmotion],
                  }}
                >
                  {selectedPoint.dominantEmotion}
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-purple-900/20 rounded-lg">
              <p className="text-purple-200 text-sm">
                During {selectedPoint.month}, humanity&apos;s collective unconscious
                was dominated by themes of{" "}
                <span className="text-white capitalize">
                  {selectedPoint.topElement}
                </span>
                , with{" "}
                <span
                  className="capitalize"
                  style={{
                    color: emotionColors[selectedPoint.dominantEmotion],
                  }}
                >
                  {selectedPoint.dominantEmotion}
                </span>{" "}
                being the most commonly experienced emotion across{" "}
                {selectedPoint.dreams} analyzed dreams.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
