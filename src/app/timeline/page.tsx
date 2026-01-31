"use client";

import { motion } from "framer-motion";
import { Timeline } from "@/components/Timeline";
import { mockData } from "@/lib/mockData";
import { Calendar, TrendingUp, Brain } from "lucide-react";

export default function TimelinePage() {
  // Calculate some stats from timeline data
  const totalDreamsInPeriod = mockData.timelineData.reduce(
    (sum, point) => sum + point.dreams,
    0
  );
  const peakMonth = mockData.timelineData.reduce((max, point) =>
    point.dreams > max.dreams ? point : max
  );
  const mostCommonEmotion = Object.entries(
    mockData.timelineData.reduce((acc, point) => {
      acc[point.dominantEmotion] = (acc[point.dominantEmotion] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1])[0][0];

  return (
    <div className="min-h-screen px-4 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Dream Timeline
          </h1>
          <p className="text-purple-300 max-w-2xl mx-auto">
            Journey through time to see how humanity&apos;s collective dreams have
            evolved. Click any point on the chart to explore that moment in our
            shared unconscious.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        >
          <div className="glass rounded-xl p-6 text-center">
            <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="text-3xl font-bold gradient-text">
              {totalDreamsInPeriod}
            </div>
            <div className="text-purple-400 text-sm">Dreams This Year</div>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="text-3xl font-bold gradient-text">
              {peakMonth.month.split(" ")[0]}
            </div>
            <div className="text-purple-400 text-sm">
              Peak Month ({peakMonth.dreams} dreams)
            </div>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <Brain className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="text-3xl font-bold gradient-text capitalize">
              {mostCommonEmotion}
            </div>
            <div className="text-purple-400 text-sm">Most Frequent Emotion</div>
          </div>
        </motion.div>

        {/* Timeline Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Timeline data={mockData.timelineData} />
        </motion.div>

        {/* Historical Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass rounded-xl p-6 dream-glow"
        >
          <h2 className="text-xl font-semibold text-white mb-4">
            Pattern Insights
          </h2>
          <div className="space-y-4 text-purple-200">
            <p>
              <span className="text-white font-medium">October 2024</span> saw the
              highest dream activity of the year with{" "}
              <span className="text-white">156 dreams</span> analyzed. The dominant
              theme was <span className="text-white">death</span>, which often
              increases during autumn months — a phenomenon observed across multiple
              cultures and historically linked to harvest endings and seasonal
              transitions.
            </p>
            <p>
              <span className="text-white font-medium">Water dreams</span> peaked in
              January and December, traditionally associated with emotional
              reflection during holiday periods and new year transitions. These
              dreams often brought feelings of{" "}
              <span className="text-white">peace</span>, suggesting collective
              processing of the year&apos;s experiences.
            </p>
            <p>
              The prevalence of <span className="text-white">fear</span> as the
              dominant emotion in 5 out of 12 months reflects the anxiety levels
              present in collective consciousness, often manifesting in chase and
              falling dreams.
            </p>
          </div>
        </motion.div>

        {/* Element Timeline Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h2 className="text-xl font-semibold text-white mb-6">
            Monthly Element Breakdown
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {mockData.timelineData.map((point, index) => (
              <motion.div
                key={point.month}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-lg p-4 cursor-pointer group"
              >
                <div className="text-xs text-purple-400 mb-1">
                  {point.month.split(" ")[0]}
                </div>
                <div className="text-white font-medium capitalize text-sm group-hover:text-purple-200 transition-colors">
                  {point.topElement}
                </div>
                <div className="text-xs text-purple-500 mt-1">
                  {point.dreams} dreams
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
