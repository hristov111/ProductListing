import { useState } from "react";
import Nav from "./Nav";
import Logo from "./Logo";
import type { Category } from "./types";

type HeaderProps = {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
};

function Header({ categories, activeCategory, onCategoryChange }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <Logo />
          <Nav
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
            menuOpen={menuOpen}
            onToggleMenu={() => setMenuOpen((prev) => !prev)}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
