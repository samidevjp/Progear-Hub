import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";

const ProductSection = ({ title, products, sectionId }) => {
  const trackRef = useRef(null);

  const handleScroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.max(280, Math.floor(el.clientWidth * 0.9));
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section id={sectionId} className="py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <SectionHeading>{title}</SectionHeading>
          <div className="hidden md:flex gap-2">
            <button
              type="button"
              onClick={() => handleScroll("prev")}
              className="h-10 w-10 rounded-full border border-[#E5E5E5] bg-white text-[#171717] flex items-center justify-center hover:bg-[#EF4444] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-white"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("next")}
              className="h-10 w-10 rounded-full border border-[#E5E5E5] bg-white text-[#171717] flex items-center justify-center hover:bg-[#EF4444] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-white"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div className="relative">
          {/* Mobile inline arrows (optional): none; swipe/drag by default */}
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-2 px-2 md:mx-0 md:px-0"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="snap-start shrink-0 w-[78%] xs:w-[70%] sm:w-[60%] md:w-[46%] lg:w-[24%]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Desktop overlay arrows */}
          <div className="hidden md:flex items-center justify-between pointer-events-none">
            <button
              type="button"
              onClick={() => handleScroll("prev")}
              className="pointer-events-auto absolute -left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-[#E5E5E5] bg-white text-[#171717] hidden lg:flex items-center justify-center hover:bg-[#EF4444] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-white"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("next")}
              className="pointer-events-auto absolute -right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-[#E5E5E5] bg-white text-[#171717] hidden lg:flex items-center justify-center hover:bg-[#EF4444] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-white"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* See All button centered below carousel */}
        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="inline-block bg-[#EF4444] text-white text-[16px] font-semibold font-montserrat rounded-lg px-6 py-3 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-white"
          >
            See All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
