"use client";

import { motion } from "framer-motion";
import { 
  Globe, 
  Brain, 
  LineChart, 
  Shield, 
  Heart, 
  Github,
  Database,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Collect",
    description:
      "We gather anonymized dream reports from public sources and opt-in submissions from around the world.",
  },
  {
    icon: Brain,
    title: "Analyze",
    description:
      "AI models identify patterns, symbols, archetypes, and emotional themes across thousands of dreams.",
  },
  {
    icon: LineChart,
    title: "Visualize",
    description:
      "Data is transformed into explorable insights, revealing the patterns of our collective unconscious.",
  },
];

const ethicalPoints = [
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "All dream data is anonymized. No personal information is stored or displayed. Dreams are stripped of identifying details before analysis.",
  },
  {
    icon: Heart,
    title: "Consent Matters",
    description:
      "We only analyze dreams that are voluntarily shared in public forums or submitted directly by dreamers who opt in.",
  },
  {
    icon: Database,
    title: "Data Transparency",
    description:
      "Our analysis methods are open. We publish how we categorize dreams, identify patterns, and calculate statistics.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen px-4 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            About Dreamscape
          </h1>
          <p className="text-purple-300 max-w-2xl mx-auto text-lg">
            A window into humanity&apos;s collective unconscious, built with
            curiosity and care.
          </p>
        </motion.div>

        {/* What Is This */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="glass rounded-xl p-8 dream-glow">
            <h2 className="text-2xl font-bold text-white mb-4">
              What Is Dreamscape?
            </h2>
            <div className="space-y-4 text-purple-200">
              <p>
                Dreamscape is an experimental project that explores the patterns
                hidden in humanity&apos;s dreams. By analyzing thousands of
                anonymized dream reports, we&apos;re building a map of our collective
                unconscious — the shared symbols, fears, hopes, and archetypes
                that appear when we sleep.
              </p>
              <p>
                Inspired by Carl Jung&apos;s work on the collective unconscious and
                modern data visualization, Dreamscape asks: What does humanity
                dream about? Are there universal themes? How do global events
                ripple through our sleeping minds?
              </p>
              <p>
                This isn&apos;t dream interpretation — we&apos;re not telling you what your
                dreams mean. Instead, we&apos;re revealing patterns at scale, showing
                how individual dreams connect to a larger tapestry of human
                experience.
              </p>
            </div>
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-purple-900/50 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-purple-300 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Pipeline Diagram */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="glass rounded-xl p-8 overflow-x-auto">
            <h3 className="text-lg font-semibold text-white mb-6">
              The Data Pipeline
            </h3>
            <div className="flex items-center justify-center gap-4 min-w-max">
              {[
                { label: "Public Sources", sub: "Reddit, forums" },
                { label: "Scraper", sub: "Collection" },
                { label: "Anonymizer", sub: "Privacy layer" },
                { label: "AI Analysis", sub: "Pattern detection" },
                { label: "Database", sub: "Storage" },
                { label: "Dashboard", sub: "Visualization" },
              ].map((step, index) => (
                <motion.div
                  key={step.label}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-lg bg-purple-900/50 flex items-center justify-center mb-2">
                      <Sparkles className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="text-xs text-white font-medium">
                      {step.label}
                    </div>
                    <div className="text-xs text-purple-500">{step.sub}</div>
                  </div>
                  {index < 5 && (
                    <div className="w-8 h-0.5 bg-purple-700 mx-2" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Ethics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Ethical Considerations
          </h2>
          <div className="space-y-4">
            {ethicalPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl p-6 flex gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {point.title}
                    </h3>
                    <p className="text-purple-300 text-sm">{point.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Credits */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="glass rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Credits</h2>
            <p className="text-purple-300 mb-6">
              Dreamscape is an open-source project exploring the intersection of
              AI, data visualization, and the mysteries of human consciousness.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-purple-900/30 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>View Source</span>
              </a>
            </div>
            <div className="mt-8 pt-6 border-t border-purple-500/20">
              <p className="text-purple-400 text-sm">
                Built with Next.js, Framer Motion, and a fascination for the
                unconscious mind.
              </p>
              <p className="text-purple-500 text-xs mt-2">
                &ldquo;Dreams are the royal road to the unconscious.&rdquo; — Sigmund Freud
              </p>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold gradient-text mb-4">
            Ready to Explore?
          </h2>
          <p className="text-purple-300 mb-8">
            Dive into the collective unconscious and discover what humanity dreams.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/explore"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium transition-colors"
            >
              Start Exploring
            </a>
            <a
              href="/"
              className="px-8 py-3 glass hover:bg-purple-900/30 rounded-lg font-medium transition-colors"
            >
              Back to Home
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
