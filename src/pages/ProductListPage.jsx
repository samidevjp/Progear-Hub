import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';
import { products } from '../data/products';

const ProductListPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [displayCount, setDisplayCount] = useState(12);

  const allCategories = [
    'Football', 'Running', 'Training', 'Accessories', 
    'Cheer Dance', 'Everyday Fitness', 'Tennis', 'Swimming'
  ];

  useEffect(() => {
    let filtered = [...products];

    // Filter by category from URL
    if (category) {
      const categoryName = category.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      filtered = filtered.filter(p => 
        p.category?.toLowerCase() === category.toLowerCase() ||
        p.title.toLowerCase().includes(categoryName.toLowerCase())
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => 
        selectedCategories.some(cat => 
          p.category?.toLowerCase() === cat.toLowerCase() ||
          p.title.toLowerCase().includes(cat.toLowerCase())
        )
      );
    }

    // Filter by price range
    if (minPrice) {
      filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return a.id - b.id;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
        default:
          return b.id - a.id;
      }
    });

    setDisplayedProducts(sorted);
    setDisplayCount(12);
  }, [category, searchQuery, selectedCategories, sortBy, minPrice, maxPrice]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleApplyFilter = () => {
    setIsFilterOpen(false);
  };

  const loadMore = () => {
    setDisplayCount(prev => prev + 12);
  };

  const pageTitle = category 
    ? category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : searchQuery 
    ? `Search: ${searchQuery}`
    : 'All Products';

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <SectionHeading>{pageTitle}</SectionHeading>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden w-full bg-white border border-[#E5E5E5] rounded-lg px-4 py-3 mb-4 flex items-center justify-between font-montserrat"
            >
              <span className="font-bold">Filters</span>
              <svg 
                className={`w-5 h-5 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Filter Content */}
            <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block bg-white border border-[#E5E5E5] rounded-lg p-6 space-y-6`}>
              {/* Categories */}
              <div>
                <h3 className="font-bold text-[#171717] mb-4 font-montserrat">Categories</h3>
                <div className="space-y-2">
                  {allCategories.map((cat) => (
                    <label key={cat} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryToggle(cat)}
                        className="w-4 h-4 text-[#EF4444] border-gray-300 rounded focus:ring-[#EF4444] focus:ring-2"
                      />
                      <span className="ml-2 text-[#171717] font-montserrat text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h3 className="font-bold text-[#171717] mb-4 font-montserrat">Sort By</h3>
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
                <h3 className="font-bold text-[#171717] mb-4 font-montserrat">Price Range</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-[#171717] mb-1 font-montserrat">Min</label>
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg font-montserrat text-sm focus:outline-none focus:border-[#EF4444]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#171717] mb-1 font-montserrat">Max</label>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="1000"
                      className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg font-montserrat text-sm focus:outline-none focus:border-[#EF4444]"
                    />
                  </div>
                  <button
                    onClick={handleApplyFilter}
                    className="w-full bg-[#EF4444] text-white py-2 rounded-lg font-bold font-montserrat hover:opacity-90 transition-opacity"
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {displayedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
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
                <p className="text-[#171717] font-montserrat text-lg">No products found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;

