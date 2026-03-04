import StarRating from "./StarRating";
import type { Product } from "../types";

type Props = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

function ProductCard({ product, onAddToCart }: Props) {
  const hasDiscount = typeof product.originalPrice === "number" && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discountPercent}%
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-2 line-clamp-2">{product.description}</p>

        <div className="mb-2">
          <StarRating rating={product.rating} />
        </div>

        {/* price row */}
        <div className="flex items-center gap-2 mb-3 mt-auto">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">${product.originalPrice!.toFixed(2)}</span>
          )}
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-700 active:bg-gray-800 transition-colors duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
