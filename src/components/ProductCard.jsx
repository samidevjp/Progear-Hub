import { Link } from 'react-router-dom';
import { Eye, ShoppingCart, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  // デフォルトの評価とレビュー数（商品データにない場合）
  const rating = product.rating || 4.5;
  const reviewCount = product.reviewCount || 65;
  const isNew = product.isNew !== undefined ? product.isNew : true; // デフォルトでNewラベルを表示

  // 星の評価を計算（0-5の範囲）
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="relative border border-[#E5E5E5] rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow duration-200 pb-4">
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </Link>
        
        {/* "New" Label - Top Left */}
        {isNew && (
          <span className="absolute top-2 left-2 bg-[#171717] text-white text-base font-bold font-montserrat px-3 py-1 rounded z-10 pointer-events-none">
            New
          </span>
        )}

        {/* View Icon Button - Top Right */}
        <Link 
          to={`/product/${product.id}`}
          className="absolute top-2 right-2 w-8 h-8 bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center hover:bg-[#EF4444] hover:text-white transition-colors duration-200 group z-10"
          aria-label="View product"
        >
          <Eye size={18} className="text-[#171717] group-hover:text-white transition-colors" />
        </Link>
      </div>

      {/* Product Info */}
      <div className="px-4 pt-4">
        {/* Product Title */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-[18px] font-semibold font-montserrat text-[#171717] mt-3 leading-[1.3] text-left hover:text-[#EF4444] transition-colors cursor-pointer">
            {product.title}
          </h3>
        </Link>

        {/* Product Price */}
        <p className="text-[28px] font-bold font-montserrat text-[#171717] mt-2">
          ${product.price.toFixed(2)}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={14}
              className={`${
                index < fullStars
                  ? 'fill-[#FACC15] text-[#FACC15]'
                  : index === fullStars && hasHalfStar
                  ? 'fill-[#FACC15] text-[#FACC15] opacity-50'
                  : 'fill-none text-gray-300'
              }`}
            />
          ))}
          <span className="text-[#9CA3AF] text-sm font-montserrat ml-1">
            ({reviewCount})
          </span>
        </div>

        {/* Add to Cart Button */}
        <button className="mt-3 w-full h-12 bg-[#171717] text-white text-[16px] font-semibold font-montserrat rounded-xl flex items-center justify-center gap-2 hover:bg-[#EF4444] transition-colors duration-200">
          <ShoppingCart size={18} />
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
