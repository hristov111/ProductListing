# Product Listing Page (PLP) — Implementation Summary

## What Has Been Implemented

A fully functional, responsive Product Listing Page (PLP) for an e-commerce store with two product categories: **T-Shirts & Tops** and **Shoes**. The page includes:

- **Sticky Header with Navigation** — A dark navigation bar with the store logo and category links. On mobile, the menu collapses into a hamburger button with a dropdown. Clicking a category loads its products instantly.
- **Category Banner** — A prominent heading and short description for the active category.
- **Product Counter** — Displays "Showing X out of Y products" reflecting filtered totals.
- **Product Grid** — A responsive CSS Grid layout (4 columns on desktop, 2 on tablet, 1 on mobile) showing product cards with image, name, description, price (with discount badge when applicable), star rating, and an Add to Cart button.
- **Filtering** — A left-side filter panel with three filter types:
  - **Color** — Swatches with checkmark selection
  - **Size** — Pill-style toggle buttons
  - **Price Range** — Min/max number inputs and a range slider
  - On mobile, filters open as a slide-out drawer overlay.
- **Sorting** — A dropdown above the grid supporting Name (A–Z), Name (Z–A), Price (Low to High), and Price (High to Low).
- **Load More** — Initially displays up to 20 products (5 rows × 4 columns). A "Load More" button reveals the next batch and disappears when all products are shown.
- **Add to Cart Toast** — Clicking "Add to Cart" triggers a toast notification that auto-dismisses after 2.5 seconds.
- **Footer** — A three-column footer with branding, quick links (Terms & Conditions, Privacy Policy, Contact Us, FAQ), and social media icons.
- **Sample Data** — 25 products per category with varied names, descriptions, prices, discount prices, colors, sizes, and ratings.

## Technologies Used

| Technology | Purpose |
|---|---|
| **React 19** | Component-based UI framework (via Create React App) |
| **Tailwind CSS 3** | Utility-first CSS framework for responsive styling |
| **JavaScript (ES6+)** | Application logic, state management, data processing |
| **HTML5** | Semantic markup |
| **CSS3** | Custom keyframe animations (slide-in drawer, toast) |

No pre-built e-commerce templates, modules, or third-party UI component libraries were used. All components were built from scratch.

## How the Solution Was Achieved

### Architecture

The application follows a **component-based architecture** with a single top-level `App` component managing all state via React's `useState` hook. Data flows downward through props.

**Component hierarchy:**

```
App
├── Header
│   ├── Logo
│   └── Nav
├── Main Content
│   ├── CategoryBanner
│   ├── FilterSidebar
│   ├── Toolbar (counter + sort)
│   ├── ProductGrid
│   │   └── ProductCard
│   │       └── StarRating
│   └── LoadMore
└── Footer
```

### Data Flow

1. Sample product data is defined in `src/data/products.js` as a JavaScript module exporting an array of category objects.
2. When a category is selected, `App` derives the product list, available sizes, and price range via `useMemo`.
3. Filters and sort order are applied as derived computations on every render — no redundant state.
4. The visible product count is managed separately for the Load More pagination.

### Responsive Design

- **Desktop (≥1024px):** 4-column grid with a persistent 240px filter sidebar.
- **Tablet (768–1023px):** 2-column grid; filters accessible via a button that opens a slide-out drawer.
- **Mobile (<768px):** Single-column grid; hamburger menu for navigation; filter drawer overlay.

Tailwind's responsive utility classes (`sm:`, `md:`, `lg:`, `xl:`) handle all breakpoints without custom media queries.

## Challenges Encountered

1. **Exhaustive-deps lint rule** — React's `useMemo` dependencies required wrapping derived data (`allProducts`) in its own `useMemo` to avoid re-computation on every render. The CI build treats warnings as errors, so this had to be addressed correctly.

2. **Filter state reset on category change** — Switching categories requires resetting filters (different size systems between clothing and shoes: S/M/L/XL vs. 7/8/9/10/11/12) and the price range. This was handled with a `useEffect` that resets filter state when the active category or its derived price range changes.

3. **Half-star ratings** — Implementing half-star rendering required SVG linear gradients with unique IDs per star to avoid conflicts when multiple ProductCards render simultaneously.

4. **Mobile filter UX** — Balancing the filter sidebar between a persistent desktop panel and a mobile overlay required conditional rendering and a fixed-position drawer with a backdrop, animated via CSS keyframes.
