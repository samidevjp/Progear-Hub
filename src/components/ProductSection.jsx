import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";

const ProductSection = ({ title, products, sectionId }) => {
  return (
    <section id={sectionId} className="py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <SectionHeading>{title}</SectionHeading>
          <a
            href="#products"
            className="text-[#EF4444] font-bold hover:underline font-montserrat"
          >
            See All
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
