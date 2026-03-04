# ProductListing

A fully functional, responsive **Product Listing Page (PLP)** for an e-commerce store built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS 3**.

## Features

- **Sticky Header with Navigation** — Dark navigation bar with store logo and two category links (T-Shirts & Tops, Shoes). Clicking a category instantly loads its products. On mobile the menu collapses into a hamburger dropdown.
- **Category Banner** — Prominent heading and short description for the active category.
- **Product Counter** — "Showing X out of Y products" that reflects the currently filtered total.
- **Product Grid** — Responsive CSS Grid (4 columns desktop / 2 tablet / 1 mobile). Each card shows:
  - Product image (local assets in `public/productImages/`)
  - Name, short description
  - Price with discount badge and strikethrough original price where applicable
  - Star rating (full, half, empty SVG stars)
  - Add to Cart button with a toast notification that auto-dismisses after 2.5 s
- **Filter Sidebar** — Left-side panel with three filter types:
  - **Color** — Circular swatches with checkmark selection
  - **Size** — Pill-style toggle buttons
  - **Price Range** — Min/max inputs and a range slider
  - On mobile the sidebar becomes a slide-out drawer overlay.
- **Sorting** — Dropdown above the grid: Name (A–Z), Name (Z–A), Price (Low to High), Price (High to Low).
- **Load More** — Initially shows 20 products. Each click reveals the next 20. Button disappears when all products are shown.
- **Footer** — Three-column footer with branding, quick links (Terms & Conditions, Privacy Policy, Contact Us, FAQ) and social icons.

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | Component-based UI |
| **TypeScript** | Static typing across all components and data |
| **Vite 7** | Build tool and dev server |
| **Tailwind CSS 3** | Utility-first responsive styling |
| **PostCSS / Autoprefixer** | CSS processing |
| **CSS3 keyframes** | Slide-in drawer and toast animations |

No pre-built e-commerce templates, third-party UI libraries, or full frameworks were used. Every component was written from scratch.

## Project Structure

```
├── public/
│   └── productImages/      # Local T-shirt product images (first.png … ts-25.png)
├── src/
│   ├── components/
│   │   ├── CategoryBanner.tsx
│   │   ├── FilterSidebar.tsx
│   │   ├── Footer.tsx
│   │   ├── LoadMore.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── StarRating.tsx
│   │   └── Toolbar.tsx
│   ├── data/
│   │   ├── products.js     # Raw product data (25 T-shirts, 25 Shoes)
│   │   └── products.ts     # Typed re-export
│   ├── App.tsx             # Root component — all state management
│   ├── Header.tsx
│   ├── Logo.tsx
│   ├── Nav.tsx
│   ├── main.tsx            # Vite entry point
│   ├── types.ts            # Shared TypeScript types
│   └── index.css           # Tailwind base imports + custom animations
├── index.html              # Vite HTML entry
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── package.json
```

## Architecture

All state lives in the top-level `App` component and is passed down through props:

```
App
├── Header
│   ├── Logo
│   └── Nav
├── Main Content
│   ├── CategoryBanner
│   ├── FilterSidebar
│   ├── Toolbar  (counter + sort)
│   ├── ProductGrid
│   │   └── ProductCard
│   │       └── StarRating
│   └── LoadMore
└── Footer
```

Filtering, sorting, and pagination are computed each render with `useMemo` — no duplicate state. Category switches trigger a `useEffect` that resets filters and page count.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Responsive Breakpoints

| Breakpoint | Grid columns | Filters |
|---|---|---|
| Desktop (≥ 1024 px) | 4 | Persistent left sidebar |
| Tablet (768 – 1023 px) | 2–3 | Slide-out drawer (toggled via button) |
| Mobile (< 768 px) | 1 | Slide-out drawer overlay |

## Sample Data

- **T-Shirts & Tops** — 25 products, colors: Black, White, Red, Blue, Green, sizes: S M L XL, prices: $15–$60. Images served from `public/productImages/`.
- **Shoes** — 25 products, colors: Black, White, Red, Blue, Brown, sizes: 7–12, prices: $40–$200. Images from `picsum.photos` (local shoe images can be added to `public/shoes/`).

Some products in each category include a discounted price to demonstrate the sale badge.

## Challenges Encountered

1. **Exhaustive-deps lint rule** — React's `useMemo` hook requires every variable it reads to be declared as a dependency. The derived `allProducts` array was initially computed inline from `category?.products`, which caused the linter to flag it as a new reference on every render, breaking downstream `useMemo` hooks. The fix was to wrap `allProducts` in its own `useMemo` so it only recomputes when the category changes.

2. **Filter state reset on category switch** — T-Shirts use letter sizes (S, M, L, XL) and a price range of $15–$60, while Shoes use numeric sizes (7–12) and a price range of $40–$200. When the user switches category the old filters become meaningless. A `useEffect` watching `activeCategory` resets colors, sizes, and the price range to the new category's defaults every time the user navigates.

3. **Half-star SVG ratings** — Half-star rendering requires an SVG `<linearGradient>` split 50/50 between gold and grey. Because multiple `ProductCard` components render simultaneously, each gradient needed a unique `id` (using the star index) to avoid one card's gradient leaking into another card's stars.

4. **Mobile filter drawer UX** — The filter sidebar needed to behave as a persistent panel on desktop and a slide-out overlay on mobile, without duplicating the filter markup. The solution renders one shared `content` block and conditionally places it either inside the `<aside>` (desktop) or inside the fixed-position drawer (mobile), with a CSS keyframe `slide-in` animation on open.

5. **Migrating from Create React App to Vite + TypeScript** — The project was initially bootstrapped with CRA (Create React App). CRA's `react-scripts` is incompatible with TypeScript 5, and its build pipeline is significantly slower than Vite. The migration involved replacing `react-scripts` with `@vitejs/plugin-react`, adding `tsconfig.json`, renaming all `.js`/`.jsx` source files to `.tsx`/`.ts`, introducing shared types in `src/types.ts`, and removing the CRA-specific `public/index.html` in favour of a root-level Vite `index.html`. After removing the old `.js` files a `tsc --noEmit` check was added to the build script to catch type errors before Vite bundles.

6. **Nested repository structure** — The initial git setup placed all project files inside a `project-listing/` subfolder at the repo root, making the GitHub view show only a single folder. The fix was to move all files to the repo root, remove the subfolder from git tracking, and recommit so the repository shows `src/`, `public/`, `package.json`, etc. directly.
