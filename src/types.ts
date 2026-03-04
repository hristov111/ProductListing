export type SortBy = "name-asc" | "name-desc" | "price-asc" | "price-desc";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number | null;
  image: string;
  rating: number;
  color: string;
  sizes: string[];
};

export type Category = {
  id: string;
  name: string;
  description: string;
  products: Product[];
};

// filters state shape
export type Filters = {
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
};
