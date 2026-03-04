import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "./Header";
import CategoryBanner from "./components/CategoryBanner";
import FilterSidebar from "./components/FilterSidebar";
import Footer from "./components/Footer";
import LoadMore from "./components/LoadMore";
import ProductGrid from "./components/ProductGrid";
import Toolbar from "./components/Toolbar";
import categories from "./data/products";
import type { Category, Filters, Product, SortBy } from "./types";
import "./App.css";

const PRODUCTS_PER_PAGE = 20;

function App() {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);
  const [filters, setFilters] = useState<Filters>({
    colors: [],
    sizes: [],
    priceRange: [0, 200],
  });
  const [sortBy, setSortBy] = useState<SortBy>("name-asc");
  const [visibleCount, setVisibleCount] = useState<number>(PRODUCTS_PER_PAGE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  const category = useMemo<Category | undefined>(
    () => categories.find((item) => item.id === activeCategory),
    [activeCategory]
  );

  const allProducts = useMemo<Product[]>(
    () => category?.products ?? [],
    [category]
  );

  const priceRange = useMemo<[number, number]>(() => {
    if (allProducts.length === 0) {
      return [0, 200];
    }

    const prices = allProducts.map((product) => product.price);
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  }, [allProducts]);

  const availableSizes = useMemo<string[]>(() => {
    const sizeSet = new Set<string>();
    allProducts.forEach((product) => {
      product.sizes.forEach((size) => sizeSet.add(size));
    });

    const allSizes = Array.from(sizeSet);
    const numericSizes = allSizes
      .filter((size) => !Number.isNaN(Number(size)))
      .sort((a, b) => Number(a) - Number(b));
    const letterOrder = ["XS", "S", "M", "L", "XL", "XXL"];
    const letterSizes = allSizes
      .filter((size) => Number.isNaN(Number(size)))
      .sort((a, b) => letterOrder.indexOf(a) - letterOrder.indexOf(b));

    return [...letterSizes, ...numericSizes];
  }, [allProducts]);

  useEffect(() => {
    setFilters({ colors: [], sizes: [], priceRange });
    setSortBy("name-asc");
    setVisibleCount(PRODUCTS_PER_PAGE);
  }, [activeCategory, priceRange]);

  const filteredAndSorted = useMemo<Product[]>(() => {
    let result = [...allProducts];

    if (filters.colors.length > 0) {
      result = result.filter((product) => filters.colors.includes(product.color));
    }

    if (filters.sizes.length > 0) {
      result = result.filter((product) =>
        product.sizes.some((size) => filters.sizes.includes(size))
      );
    }

    result = result.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
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

  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    setToast(`"${product.name}" added to cart!`);
    window.setTimeout(() => {
      setToast(null);
    }, 2500);
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((previousCount) => previousCount + PRODUCTS_PER_PAGE);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <CategoryBanner
          name={category?.name ?? ""}
          description={category?.description ?? ""}
        />

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

            <ProductGrid products={visibleProducts} onAddToCart={handleAddToCart} />
            <LoadMore hasMore={hasMore} onClick={handleLoadMore} />
          </div>
        </div>
      </main>

      <Footer />

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-toast-in">
          <div className="bg-gray-900 text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-400 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm font-medium">{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
