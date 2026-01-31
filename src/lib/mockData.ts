// Mock data for the Dreamscape dashboard
// This will be replaced with real API calls later

export const mockData = {
  totalDreams: 1261,
  topElements: [
    { name: "water", count: 342, trend: "up" as const },
    { name: "falling", count: 298, trend: "stable" as const },
    { name: "house", count: 267, trend: "up" as const },
    { name: "death", count: 245, trend: "down" as const },
    { name: "flying", count: 201, trend: "up" as const },
  ],
  topArchetypes: [
    { name: "Being Chased", count: 156, description: "The classic pursuit dream - running from something unknown" },
    { name: "Falling", count: 143, description: "The sensation of falling through endless space" },
    { name: "House With Hidden Rooms", count: 98, description: "Discovering secret rooms in familiar places" },
    { name: "Teeth Falling Out", count: 87, description: "Losing teeth - often linked to anxiety about appearance" },
    { name: "Being Late", count: 76, description: "Racing against time, never quite making it" },
    { name: "Flying", count: 71, description: "Soaring through the sky with freedom" },
    { name: "Being Naked in Public", count: 65, description: "Exposed and vulnerable in a crowd" },
    { name: "Lost in a Building", count: 58, description: "Wandering endless corridors and rooms" },
  ],
  emotions: {
    fear: 423,
    confusion: 312,
    joy: 198,
    sadness: 167,
    peace: 89,
  },
  latestDreams: [
    { id: 1, snippet: "I was swimming in an endless ocean, the water was warm and glowing purple...", time: "2 min ago" },
    { id: 2, snippet: "My childhood home had a door I'd never seen before. Behind it was a garden...", time: "5 min ago" },
    { id: 3, snippet: "Teeth kept falling out one by one, but I felt strangely calm about it...", time: "8 min ago" },
    { id: 4, snippet: "Flying over a city made entirely of glass. Everything reflected the moon...", time: "12 min ago" },
    { id: 5, snippet: "Being chased through a forest, but when I turned around, it was myself...", time: "15 min ago" },
    { id: 6, snippet: "A clock melting like Salvador Dali, time folding in on itself...", time: "18 min ago" },
    { id: 7, snippet: "Standing at the edge of a cliff, knowing I needed to jump to wake up...", time: "22 min ago" },
    { id: 8, snippet: "My grandmother was there, young again, telling me secrets...", time: "25 min ago" },
  ],
  timelineData: [
    { month: "Jan 2024", topElement: "water", dreams: 89, dominantEmotion: "peace" },
    { month: "Feb 2024", topElement: "falling", dreams: 102, dominantEmotion: "fear" },
    { month: "Mar 2024", topElement: "house", dreams: 118, dominantEmotion: "confusion" },
    { month: "Apr 2024", topElement: "flying", dreams: 95, dominantEmotion: "joy" },
    { month: "May 2024", topElement: "death", dreams: 134, dominantEmotion: "fear" },
    { month: "Jun 2024", topElement: "water", dreams: 127, dominantEmotion: "peace" },
    { month: "Jul 2024", topElement: "chase", dreams: 143, dominantEmotion: "fear" },
    { month: "Aug 2024", topElement: "teeth", dreams: 112, dominantEmotion: "confusion" },
    { month: "Sep 2024", topElement: "house", dreams: 98, dominantEmotion: "sadness" },
    { month: "Oct 2024", topElement: "death", dreams: 156, dominantEmotion: "fear" },
    { month: "Nov 2024", topElement: "flying", dreams: 87, dominantEmotion: "joy" },
    { month: "Dec 2024", topElement: "water", dreams: 140, dominantEmotion: "peace" },
  ],
  elementDetails: {
    water: {
      count: 342,
      trend: "up",
      associations: ["ocean", "swimming", "rain", "floods", "drowning"],
      commonEmotions: ["peace", "fear", "confusion"],
      interpretation: "Water often represents emotions and the unconscious mind. Calm water suggests peace, while turbulent water may indicate emotional turmoil.",
    },
    falling: {
      count: 298,
      trend: "stable",
      associations: ["heights", "flying", "gravity", "control"],
      commonEmotions: ["fear", "confusion", "peace"],
      interpretation: "Falling dreams often relate to feelings of losing control or anxiety about a situation in waking life.",
    },
    house: {
      count: 267,
      trend: "up",
      associations: ["rooms", "doors", "stairs", "childhood", "basement"],
      commonEmotions: ["confusion", "fear", "joy"],
      interpretation: "Houses in dreams typically represent the self. Different rooms may symbolize different aspects of your personality.",
    },
    death: {
      count: 245,
      trend: "down",
      associations: ["endings", "transformation", "fear", "loved ones"],
      commonEmotions: ["fear", "sadness", "peace"],
      interpretation: "Death in dreams rarely predicts actual death. It usually symbolizes endings, transitions, or major life changes.",
    },
    flying: {
      count: 201,
      trend: "up",
      associations: ["freedom", "sky", "control", "birds", "floating"],
      commonEmotions: ["joy", "peace", "fear"],
      interpretation: "Flying dreams often represent freedom, ambition, or rising above problems. The ease of flight may reflect confidence levels.",
    },
  },
};

export type MockData = typeof mockData;
export type TopElement = typeof mockData.topElements[0];
export type Archetype = typeof mockData.topArchetypes[0];
export type LatestDream = typeof mockData.latestDreams[0];
export type TimelinePoint = typeof mockData.timelineData[0];
