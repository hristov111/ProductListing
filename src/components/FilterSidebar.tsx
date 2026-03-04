import { useState } from "react";
import type { Filters } from "../types";

const COLOR_OPTIONS = ["Black", "White", "Red", "Blue", "Green", "Brown"] as const;

const COLOR_MAP: Record<(typeof COLOR_OPTIONS)[number], string> = {
  Black: "#111827",
  White: "#F9FAFB",
  Red: "#EF4444",
  Blue: "#3B82F6",
  Green: "#22C55E",
  Brown: "#92400E",
};

type FilterSidebarProps = {
  filters: Filters;
  onFilterChange: (f: Filters) => void;
  availableSizes: string[];
  priceRange: [number, number];
  mobileOpen: boolean;
  onMobileClose: () => void;
};

function FilterSidebar({ filters, onFilterChange, availableSizes, priceRange, mobileOpen, onMobileClose }: FilterSidebarProps) {
  const [expanded, setExpanded] = useState({ color: true, size: true, price: true });

  const toggle = (section: keyof typeof expanded) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleColorToggle = (color: string) => {
    const colors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onFilterChange({ ...filters, colors });
  };

  const handleSizeToggle = (size: string) => {
    const sizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ ...filters, sizes });
  };

  const handlePriceChange = (type: "min" | "max", val: string) => {
    const n = Number(val);
    const range: [number, number] =
      type === "min" ? [n, filters.priceRange[1]] : [filters.priceRange[0], n];
    onFilterChange({ ...filters, priceRange: range });
  };

  const clearAll = () => {
    onFilterChange({ colors: [], sizes: [], priceRange: [priceRange[0], priceRange[1]] });
  };

  const isFiltered =
    filters.colors.length > 0 ||
    filters.sizes.length > 0 ||
    filters.priceRange[0] !== priceRange[0] ||
    filters.priceRange[1] !== priceRange[1];

  // shared JSX used both in desktop sidebar and mobile drawer
  const content = (
    <div className="space-y-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        {isFiltered && (
          <button onClick={clearAll} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
            Clear All
          </button>
        )}
      </div>

      {/* color */}
      <div className="border-t border-gray-200 pt-4">
        <button
          onClick={() => toggle("color")}
          className="flex items-center justify-between w-full text-left text-sm font-semibold text-gray-800 mb-3"
        >
          Color
          <svg
            className={`w-4 h-4 transition-transform ${expanded.color ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expanded.color && (
          <div className="flex flex-wrap gap-2 pb-4">
            {COLOR_OPTIONS.map((color) => (
              <button
                key={color}
                onClick={() => handleColorToggle(color)}
                title={color}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                  filters.colors.includes(color)
                    ? "border-indigo-500 ring-2 ring-indigo-300 scale-110"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                style={{ backgroundColor: COLOR_MAP[color] }}
              >
                {filters.colors.includes(color) && (
                  <svg className="w-4 h-4 mx-auto" viewBox="0 0 20 20" fill={color === "White" ? "#111" : "#fff"}>
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* size */}
      <div className="border-t border-gray-200 pt-4">
        <button
          onClick={() => toggle("size")}
          className="flex items-center justify-between w-full text-left text-sm font-semibold text-gray-800 mb-3"
        >
          Size
          <svg
            className={`w-4 h-4 transition-transform ${expanded.size ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expanded.size && (
          <div className="flex flex-wrap gap-2 pb-4">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`min-w-[2.5rem] px-3 py-1.5 text-xs font-medium rounded-md border transition-all duration-200 ${
                  filters.sizes.includes(size)
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* price range */}
      <div className="border-t border-gray-200 pt-4">
        <button
          onClick={() => toggle("price")}
          className="flex items-center justify-between w-full text-left text-sm font-semibold text-gray-800 mb-3"
        >
          Price Range
          <svg
            className={`w-4 h-4 transition-transform ${expanded.price ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expanded.price && (
          <div className="pb-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Min ($)</label>
                <input
                  type="number"
                  min={priceRange[0]}
                  max={filters.priceRange[1]}
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange("min", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
                />
              </div>
              <span className="text-gray-400 mt-5">—</span>
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Max ($)</label>
                <input
                  type="number"
                  min={filters.priceRange[0]}
                  max={priceRange[1]}
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange("max", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>
            <input
              type="range"
              min={priceRange[0]}
              max={priceRange[1]}
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange("max", e.target.value)}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-60 flex-shrink-0">
        <div className="sticky top-20">{content}</div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onMobileClose} />
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl p-5 overflow-y-auto animate-slide-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
              <button onClick={onMobileClose} className="p-1 rounded-md hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}

export default FilterSidebar;
