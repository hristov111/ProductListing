import { useState } from "react";
import Logo from "./Logo";
import Nav from "./Nav";

function Header({ categories, activeCategory, onCategoryChange }) {
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
            onToggleMenu={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
