"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SearchBar } from "@/components/SearchBar";
import { TimeFilter } from "@/components/TimeFilter";
import { ArchetypeCard } from "@/components/ArchetypeCard";
import { EmotionChart } from "@/components/EmotionChart";
import { mockData } from "@/lib/mockData";

type TimeRange = "all" | "year" | "month" | "week";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState<TimeRange>("all");

  // Filter archetypes based on search
  const filteredArchetypes = useMemo(() => {
    if (!searchQuery) return mockData.topArchetypes;
    return mockData.topArchetypes.filter(
      (archetype) =>
        archetype.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        archetype.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Simulate time-based filtering (in real app, this would filter actual data)
  const getTimeMultiplier = (range: TimeRange) => {
    switch (range) {
      case "week":
        return 0.1;
      case "month":
        return 0.3;
      case "year":
        return 0.8;
      default:
        return 1;
    }
  };

  const multiplier = getTimeMultiplier(timeRange);

  const adjustedArchetypes = filteredArchetypes.map((a) => ({
    ...a,
    count: Math.round(a.count * multiplier),
  }));

  const adjustedEmotions = Object.fromEntries(
    Object.entries(mockData.emotions).map(([key, value]) => [
      key,
      Math.round(value * multiplier),
    ])
  );

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
            Dream Explorer
          </h1>
          <p className="text-purple-300 max-w-2xl mx-auto">
            Search through humanity&apos;s collective dream archive. Discover patterns,
            archetypes, and the emotions that connect our sleeping minds.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 space-y-4"
        >
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search archetypes, symbols, emotions..."
          />
          <div className="flex justify-center">
            <TimeFilter selected={timeRange} onChange={setTimeRange} />
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            {
              label: "Total Dreams",
              value: Math.round(mockData.totalDreams * multiplier),
            },
            { label: "Unique Elements", value: 847 },
            { label: "Archetypes", value: mockData.topArchetypes.length },
            { label: "Emotions Tracked", value: 5 },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.2 }}
              className="glass rounded-xl p-4 text-center"
            >
              <div className="text-2xl font-bold gradient-text">
                {stat.value.toLocaleString()}
              </div>
              <div className="text-purple-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Archetypes Grid */}
          <div className="lg:col-span-2">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-semibold text-white mb-6"
            >
              Top Archetypes
              {searchQuery && (
                <span className="text-purple-400 font-normal">
                  {" "}
                  — {filteredArchetypes.length} results
                </span>
              )}
            </motion.h2>

            {adjustedArchetypes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {adjustedArchetypes.map((archetype, index) => (
                  <ArchetypeCard
                    key={archetype.name}
                    name={archetype.name}
                    count={archetype.count}
                    description={archetype.description}
                    trend={index % 3 === 0 ? "up" : index % 3 === 1 ? "stable" : "down"}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-xl p-8 text-center"
              >
                <p className="text-purple-300">
                  No archetypes found matching &ldquo;{searchQuery}&rdquo;
                </p>
              </motion.div>
            )}
          </div>

          {/* Emotion Chart */}
          <div className="lg:col-span-1">
            <EmotionChart emotions={adjustedEmotions} />
          </div>
        </div>

        {/* Element Details (if searching for a specific element) */}
        {searchQuery &&
          mockData.elementDetails[
            searchQuery.toLowerCase() as keyof typeof mockData.elementDetails
          ] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 glass rounded-xl p-6 dream-glow"
            >
              {(() => {
                const details =
                  mockData.elementDetails[
                    searchQuery.toLowerCase() as keyof typeof mockData.elementDetails
                  ];
                return (
                  <>
                    <h3 className="text-2xl font-bold text-white mb-4 capitalize">
                      {searchQuery}
                    </h3>
                    <p className="text-purple-200 mb-6">{details.interpretation}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-purple-400 text-sm mb-2">
                          Common Associations
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {details.associations.map((assoc) => (
                            <span
                              key={assoc}
                              className="px-3 py-1 bg-purple-900/30 rounded-full text-sm text-purple-200"
                            >
                              {assoc}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-purple-400 text-sm mb-2">
                          Linked Emotions
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {details.commonEmotions.map((emotion) => (
                            <span
                              key={emotion}
                              className="px-3 py-1 bg-purple-900/30 rounded-full text-sm text-purple-200 capitalize"
                            >
                              {emotion}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
      </div>
    </div>
  );
}
