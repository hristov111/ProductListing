import { useState, useMemo, useCallback, useEffect } from "react";
import Header from "./Header";
import CategoryBanner from "./components/CategoryBanner";
import Toolbar from "./components/Toolbar";
import FilterSidebar from "./components/FilterSidebar";
import ProductGrid from "./components/ProductGrid";
import LoadMore from "./components/LoadMore";
import Footer from "./components/Footer";
import categories from "./data/products";
import "./App.css";

const PRODUCTS_PER_PAGE = 20;

function App() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [filters, setFilters] = useState({ colors: [], sizes: [], priceRange: [0, 200] });
  const [sortBy, setSortBy] = useState("name-asc");
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const category = useMemo(
    () => categories.find((c) => c.id === activeCategory),
    [activeCategory]
  );

  const allProducts = useMemo(
    () => category?.products || [],
    [category]
  );

  const priceRange = useMemo(() => {
    if (allProducts.length === 0) return [0, 200];
    const prices = allProducts.map((p) => p.price);
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  }, [allProducts]);

  const availableSizes = useMemo(() => {
    const sizeSet = new Set();
    allProducts.forEach((p) => p.sizes.forEach((s) => sizeSet.add(s)));
    const arr = Array.from(sizeSet);
    const numericSizes = arr.filter((s) => !isNaN(s)).sort((a, b) => a - b);
    const letterOrder = ["XS", "S", "M", "L", "XL", "XXL"];
    const letterSizes = arr
      .filter((s) => isNaN(s))
      .sort((a, b) => letterOrder.indexOf(a) - letterOrder.indexOf(b));
    return [...letterSizes, ...numericSizes];
  }, [allProducts]);

  useEffect(() => {
    setFilters({ colors: [], sizes: [], priceRange });
    setVisibleCount(PRODUCTS_PER_PAGE);
    setSortBy("name-asc");
  }, [activeCategory, priceRange]);

  const filteredAndSorted = useMemo(() => {
    let result = [...allProducts];

    if (filters.colors.length > 0) {
      result = result.filter((p) => filters.colors.includes(p.color));
    }

    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => filters.sizes.includes(s))
      );
    }

    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return result;
  }, [allProducts, filters, sortBy]);

  const visibleProducts = filteredAndSorted.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSorted.length;

  const handleCategoryChange = useCallback((catId) => {
    setActiveCategory(catId);
  }, []);

  const handleAddToCart = useCallback((product) => {
    setToast(`"${product.name}" added to cart!`);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + PRODUCTS_PER_PAGE);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <CategoryBanner name={category?.name} description={category?.description} />

        <div className="flex gap-8">
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            availableSizes={availableSizes}
            priceRange={priceRange}
            mobileOpen={mobileFiltersOpen}
            onMobileClose={() => setMobileFiltersOpen(false)}
          />

          <div className="flex-1 min-w-0">
            <Toolbar
              shownCount={visibleProducts.length}
              totalCount={filteredAndSorted.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onToggleFilters={() => setMobileFiltersOpen(true)}
            />

            <ProductGrid
              products={visibleProducts}
              onAddToCart={handleAddToCart}
            />

            <LoadMore onClick={handleLoadMore} hasMore={hasMore} />
          </div>
        </div>
      </main>

      <Footer />

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-toast-in">
          <div className="bg-gray-900 text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium">{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
