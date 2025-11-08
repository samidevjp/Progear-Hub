import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";
import { products } from "../data/products";

const ProductListPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const urlSearchQuery = searchParams.get("search");

  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [displayCount, setDisplayCount] = useState(12);
  const sliderMin = 0;
  const sliderMax = 1000;
  const sliderStep = 10;
  const numericMinPrice = Number(minPrice === "" ? sliderMin : minPrice);
  const numericMaxPrice = Number(maxPrice === "" ? sliderMax : maxPrice);

  const handleMinPriceChange = (value) => {
    const next = Number(value);
    if (Number.isNaN(next)) return;
    if (next > numericMaxPrice) {
      setMaxPrice(String(next));
    }
    setMinPrice(String(next));
  };

  const handleMaxPriceChange = (value) => {
    const next = Number(value);
    if (Number.isNaN(next)) return;
    if (next < numericMinPrice) {
      setMinPrice(String(next));
    }
    setMaxPrice(String(next));
  };

  const allCategories = [
    "All",
    "Football",
    "Running",
    "Training",
    "Accessories",
    "Cheer Dance",
    "Everyday Fitness",
    "Tennis",
    "Swimming",
  ];

  useEffect(() => {
    let filtered = [...products];

    // Filter by category from URL
    if (category) {
      const categoryName = category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      filtered = filtered.filter(
        (p) =>
          p.category?.toLowerCase() === category.toLowerCase() ||
          p.title.toLowerCase().includes(categoryName.toLowerCase())
      );
    }

    // Filter by URL search query (from header search)
    if (urlSearchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(urlSearchQuery.toLowerCase()) ||
          p.description?.toLowerCase().includes(urlSearchQuery.toLowerCase())
      );
    }

    // Filter by local search query (category search)
    if (localSearchQuery.trim()) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
          p.description?.toLowerCase().includes(localSearchQuery.toLowerCase())
      );
    }

    // Filter by selected categories
    // "All"が選択されている場合はフィルタリングしない
    if (selectedCategories.includes("All")) {
      // "All"が選択されている場合はすべての商品を表示
    } else {
      // 選択されたカテゴリでフィルタリング
      const categoriesToFilter = selectedCategories.filter(
        (cat) => cat !== "All"
      );
      if (categoriesToFilter.length > 0) {
        filtered = filtered.filter((p) =>
          categoriesToFilter.some(
            (cat) =>
              p.category?.toLowerCase() === cat.toLowerCase() ||
              p.title.toLowerCase().includes(cat.toLowerCase())
          )
        );
      }
    }

    // Filter by price range
    if (minPrice) {
      filtered = filtered.filter((p) => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= parseFloat(maxPrice));
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return a.id - b.id;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
        default:
          return b.id - a.id;
      }
    });

    setDisplayedProducts(sorted);
    setDisplayCount(12);
  }, [
    category,
    urlSearchQuery,
    localSearchQuery,
    selectedCategories,
    sortBy,
    minPrice,
    maxPrice,
  ]);

  const handleCategoryToggle = (category) => {
    if (category === "All") {
      // "All"をチェックした場合、他のチェックボックスをすべて外す
      setSelectedCategories((prev) => (prev.includes("All") ? [] : ["All"]));
    } else {
      // 他のカテゴリをチェックした場合、"All"を外して、そのカテゴリをトグル
      setSelectedCategories((prev) => {
        const withoutAll = prev.filter((c) => c !== "All");
        if (withoutAll.includes(category)) {
          return withoutAll.filter((c) => c !== category);
        } else {
          return [...withoutAll, category];
        }
      });
    }
  };

  const handleApplyFilter = () => {
    setIsFilterOpen(false);
  };

  const loadMore = () => {
    setDisplayCount((prev) => prev + 12);
  };

  const pageTitle = category
    ? category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : urlSearchQuery
    ? `Search: ${urlSearchQuery}`
    : "All Products";

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <SectionHeading>{pageTitle}</SectionHeading>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
          {/* Filter Sidebar */}
          <aside>
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden w-full bg-white border border-[#E5E5E5] rounded-lg px-4 py-3 mb-4 flex items-center justify-between font-montserrat"
            >
              <span className="font-bold">Filters</span>
              <svg
                className={`w-5 h-5 transition-transform ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Filter Content */}
            <div
              className={`${
                isFilterOpen ? "block" : "hidden"
              } lg:block bg-white border border-[#E5E5E5] rounded-lg p-6 space-y-6`}
            >
              {/* Categories */}
              <div>
                <h3 className="font-bold text-[#171717] mb-4 font-montserrat">
                  Categories
                </h3>
                <div className="space-y-4">
                  {allCategories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryToggle(cat)}
                        className="w-4 h-4 text-[#EF4444] border-gray-300 rounded focus:ring-[#EF4444] focus:ring-2"
                      />
                      <span className="ml-2 text-[#171717] font-bold font-montserrat text-sm">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h3 className="font-bold text-[#171717] mb-4 font-montserrat">
                  Sort By
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg font-montserrat text-sm focus:outline-none focus:border-[#EF4444]"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="price-low">Price: Low → High</option>
                  <option value="price-high">Price: High → Low</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-bold text-[#171717] mb-4 font-montserrat">
                  Price Range
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm font-montserrat text-[#171717]">
                    <span>${numericMinPrice}</span>
                    <span>${numericMaxPrice}</span>
                  </div>
                  <div className="relative h-6">
                    {/* Track */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 bg-gray-200 rounded-full" />
                    {/* Selected range highlight */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-[#EF4444] rounded-full"
                      style={{
                        left: `${
                          ((numericMinPrice - sliderMin) /
                            (sliderMax - sliderMin)) *
                          100
                        }%`,
                        width: `${
                          ((numericMaxPrice - numericMinPrice) /
                            (sliderMax - sliderMin)) *
                          100
                        }%`,
                      }}
                    />
                    {/* Min slider */}
                    <input
                      type="range"
                      min={sliderMin}
                      max={sliderMax}
                      step={sliderStep}
                      value={numericMinPrice}
                      onChange={(e) => handleMinPriceChange(e.target.value)}
                      className="price-range absolute w-full top-0 h-6 bg-transparent appearance-none cursor-pointer z-20"
                    />
                    {/* Max slider */}
                    <input
                      type="range"
                      min={sliderMin}
                      max={sliderMax}
                      step={sliderStep}
                      value={numericMaxPrice}
                      onChange={(e) => handleMaxPriceChange(e.target.value)}
                      className="price-range absolute w-full top-0 h-6 bg-transparent appearance-none cursor-pointer z-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div>
            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search this category..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="w-full h-12 pl-4 pr-12 border border-[#E5E5E5] rounded-lg font-medium font-montserrat focus:outline-none focus:border-[#EF4444] transition-colors"
              />
              <Search
                size={20}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none"
              />
            </div>

            {displayedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {displayedProducts.slice(0, displayCount).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {displayCount < displayedProducts.length && (
                  <div className="text-center">
                    <button
                      onClick={loadMore}
                      className="bg-[#EF4444] text-white px-8 py-3 rounded-full font-bold font-montserrat hover:opacity-90 transition-opacity"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-[#171717] font-montserrat text-lg">
                  No products found.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
