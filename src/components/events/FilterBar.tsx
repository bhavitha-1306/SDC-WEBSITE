"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Wifi, MapPin, Layers } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedMode: string;
  setSelectedMode: (mode: string) => void;
  categories: string[];
}

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedMode,
  setSelectedMode,
  categories
}: FilterBarProps) {
  const modes = [
    { id: "ALL", label: "All Modes", icon: SlidersHorizontal },
    { id: "ONLINE", label: "Online", icon: Wifi },
    { id: "OFFLINE", label: "Offline", icon: MapPin },
    { id: "HYBRID", label: "Hybrid", icon: Layers },
  ];

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-grow max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50" size={20} />
          <input
            type="text"
            placeholder="Search events, topics, or speakers..."
            className="w-full rounded-2xl border border-outline-variant/30 bg-surface-container-low py-4 pl-12 pr-6 text-on-surface ring-primary/20 transition-all focus:border-primary focus:outline-none focus:ring-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <span className="type-kicker mr-2 hidden whitespace-nowrap text-on-surface-variant/70 md:block">Filter by Mode:</span>
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isActive = selectedMode === mode.id;
            
            return (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-outline-variant/30 bg-surface-container-highest/30 text-on-surface-variant hover:border-outline-variant hover:bg-surface-container-highest/50"
                }`}
              >
                <Icon size={14} />
                {mode.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4 border-b border-outline-variant/20 pb-3">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`relative px-4 py-2 text-sm font-bold transition-colors ${
            selectedCategory === "All" ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          All Categories
          {selectedCategory === "All" && (
            <motion.div layoutId="category-underline" className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />
          )}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`relative px-4 py-2 text-sm font-bold transition-colors ${
              selectedCategory === category ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {category}
            {selectedCategory === category && (
              <motion.div layoutId="category-underline" className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
