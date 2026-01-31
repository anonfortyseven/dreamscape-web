"use client";

import { motion } from "framer-motion";

type TimeRange = "all" | "year" | "month" | "week";

interface TimeFilterProps {
  selected: TimeRange;
  onChange: (range: TimeRange) => void;
}

const options: { value: TimeRange; label: string }[] = [
  { value: "all", label: "All Time" },
  { value: "year", label: "This Year" },
  { value: "month", label: "This Month" },
  { value: "week", label: "This Week" },
];

export function TimeFilter({ selected, onChange }: TimeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selected === option.value
              ? "text-white"
              : "text-purple-300 hover:text-white hover:bg-purple-900/30"
          }`}
        >
          {selected === option.value && (
            <motion.div
              layoutId="timeFilter"
              className="absolute inset-0 bg-purple-600/30 rounded-lg -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {option.label}
        </button>
      ))}
    </div>
  );
}
