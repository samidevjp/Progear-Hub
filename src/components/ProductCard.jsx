const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-[#171717] mb-2 font-montserrat">
          {product.title}
        </h3>
        <p className="text-xl font-bold text-[#EF4444] mb-4 font-montserrat">
          ${product.price.toFixed(2)}
        </p>
        <button className="w-full bg-[#EF4444] text-white py-2 rounded-full font-bold hover:opacity-90 transition-opacity font-montserrat">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

