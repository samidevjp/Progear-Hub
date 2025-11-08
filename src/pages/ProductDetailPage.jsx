import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 商品IDで商品を検索
  const product = products.find(p => p.id === parseInt(id));

  // 商品が見つからない場合
  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#171717] font-montserrat mb-4">Product Not Found</h1>
          <Link 
            to="/products" 
            className="inline-block bg-[#EF4444] text-white px-6 py-3 rounded-lg font-semibold font-montserrat hover:opacity-90 transition-opacity"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // デフォルトの評価とレビュー数
  const rating = product.rating || 4.5;
  const reviewCount = product.reviewCount || 65;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const handleAddToCart = () => {
    // カートに追加するロジック（今後実装）
    console.log('Added to cart:', product);
    // ここでカートの状態管理やAPI呼び出しを行う
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#171717] font-montserrat mb-6 hover:text-[#EF4444] transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Product Title */}
            <h1 className="text-3xl md:text-4xl font-bold font-montserrat text-[#171717] mb-4">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={20}
                    className={`${
                      index < fullStars
                        ? 'fill-[#FACC15] text-[#FACC15]'
                        : index === fullStars && hasHalfStar
                        ? 'fill-[#FACC15] text-[#FACC15] opacity-50'
                        : 'fill-none text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[#9CA3AF] font-montserrat text-base">
                ({reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-4xl md:text-5xl font-bold font-montserrat text-[#171717]">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold font-montserrat text-[#171717] mb-3">
                Description
              </h2>
              <p className="text-base font-montserrat text-[#171717] leading-relaxed">
                {product.description || `Experience the perfect blend of quality and performance with ${product.title}. Designed for athletes and fitness enthusiasts who demand the best. This product combines innovative design with durable materials to help you achieve your fitness goals.`}
              </p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full h-14 bg-[#171717] text-white text-[18px] font-semibold font-montserrat rounded-xl flex items-center justify-center gap-3 hover:bg-[#EF4444] transition-colors duration-200 mb-6"
            >
              <ShoppingCart size={22} />
              Add To Cart
            </button>

            {/* Additional Info */}
            <div className="border-t border-[#E5E5E5] pt-6">
              <div className="space-y-3 text-sm font-montserrat text-[#171717]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Free Shipping:</span>
                  <span>On orders over $100</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Returns:</span>
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Warranty:</span>
                  <span>1 year manufacturer warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section (Optional) */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold font-montserrat text-[#171717] mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products
              .filter(p => p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="aspect-square overflow-hidden rounded-xl mb-3">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold font-montserrat text-[#171717] text-sm mb-1 group-hover:text-[#EF4444] transition-colors">
                    {relatedProduct.title}
                  </h3>
                  <p className="font-bold font-montserrat text-[#171717]">
                    ${relatedProduct.price.toFixed(2)}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

