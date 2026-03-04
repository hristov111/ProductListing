import type { Category } from "./types";

type NavProps = {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  menuOpen: boolean;
  onToggleMenu: () => void;
};

function Nav({
  categories,
  activeCategory,
  onCategoryChange,
  menuOpen,
  onToggleMenu,
}: NavProps) {
  return (
    <>
      <ul className="hidden md:flex items-center gap-1">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeCategory === category.id
                  ? "bg-white/20 text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={onToggleMenu}
        className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-gray-900 border-t border-gray-800 md:hidden shadow-lg">
          <ul className="px-4 py-2">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => {
                    onCategoryChange(category.id);
                    onToggleMenu();
                  }}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeCategory === category.id
                      ? "bg-white/20 text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Nav;
