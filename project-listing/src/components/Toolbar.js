function Toolbar({
  shownCount,
  totalCount,
  sortBy,
  onSortChange,
  onToggleFilters,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleFilters}
          className="lg:hidden flex items-center gap-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </button>
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-800">{shownCount}</span> out
          of <span className="font-semibold text-gray-800">{totalCount}</span>{" "}
          products
        </p>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-sm text-gray-500 whitespace-nowrap">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none cursor-pointer"
        >
          <option value="name-asc">Name (A–Z)</option>
          <option value="name-desc">Name (Z–A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>
    </div>
  );
}

export default Toolbar;
