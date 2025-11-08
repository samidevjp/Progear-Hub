import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';

const Header = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const shopCategories = {
    'Sports': ['Football', 'Running', 'Cheer Dance', 'Swimming', 'Tennis'],
    'Life Style × Sports': ['Everyday Fitness', 'Training']
  };

  const handleCategoryClick = (category) => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    navigate(`/products/${categorySlug}`);
    setIsShopOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleProductClick = (query) => {
    navigate(`/products?search=${encodeURIComponent(query)}`);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  // 検索候補を計算
  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return products
      .filter(product => 
        product.title.toLowerCase().includes(query)
      )
      .slice(0, 5); // 最大5件
  }, [searchQuery]);

  return (
    <>
      <header 
        className="fixed top-0 left-0 w-full z-50"
        style={{ backgroundColor: 'rgba(23, 23, 23, 0.4)' }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between py-4">
            {/* Left: Logo */}
            <Link to="/" className="text-2xl font-bold text-white font-montserrat">
              ProGear Hub
            </Link>

            {/* Center: Navigation */}
            <nav className="flex items-center space-x-8">
              <div 
                className="relative"
                onMouseEnter={() => setIsShopOpen(true)}
                onMouseLeave={() => setIsShopOpen(false)}
              >
                <Link 
                  to="/products" 
                  className="text-white font-bold font-montserrat hover:text-[#EF4444] transition-colors"
                >
                  Shop
                </Link>
                <div 
                  className={`absolute top-full left-0 pt-2 bg-transparent transition-all duration-300 ease-in-out ${
                    isShopOpen 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                  }`}
                  onMouseEnter={() => setIsShopOpen(true)}
                  onMouseLeave={() => setIsShopOpen(false)}
                >
                  <div 
                    className="bg-white rounded-xl shadow-lg p-6 min-w-[400px] transform transition-all duration-300"
                    style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
                  >
                    <div className="grid grid-cols-2 gap-6">
                      {Object.entries(shopCategories).map(([group, categories]) => (
                        <div key={group}>
                          <h3 className="font-bold text-[#171717] mb-3 font-montserrat text-sm">
                            {group}
                          </h3>
                          <ul className="space-y-2">
                            {categories.map((category) => (
                              <li key={category}>
                                <button
                                  onClick={() => handleCategoryClick(category)}
                                  className="text-[#171717] font-montserrat text-sm hover:text-[#EF4444] transition-colors text-left w-full"
                                >
                                  {category}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    </div>
                </div>
              </div>
              <Link 
                to="/about" 
                className="text-white font-bold font-montserrat hover:text-[#EF4444] transition-colors"
              >
                About
              </Link>
              <Link 
                to="/blog" 
                className="text-white font-bold font-montserrat hover:text-[#EF4444] transition-colors"
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                className="text-white font-bold font-montserrat hover:text-[#EF4444] transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Right: Search + Cart */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[300px] px-4 py-2 pr-10 bg-transparent border border-white rounded-lg text-white placeholder-white/70 font-montserrat font-medium focus:outline-none focus:border-[#EF4444]"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </form>
                {/* Search Suggestions Dropdown */}
                {searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 mt-2 w-[300px] bg-white rounded-lg shadow-lg overflow-hidden z-50">
                    <div className="max-h-64 overflow-y-auto">
                      {searchSuggestions.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleProductClick(product.title)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
                        >
                          <img 
                            src={product.image} 
                            alt={product.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-[#171717] font-montserrat text-sm font-medium truncate">
                              {product.title}
                            </p>
                            <p className="text-[#EF4444] font-montserrat text-sm font-bold">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Icon */}
              <button className="relative" onClick={() => navigate('/checkout/step-1')} aria-label="Cart">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-[#EF4444] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  0
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex items-center justify-between py-4">
            {/* Left: Hamburger */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Right: Search + Cart */}
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsSearchOpen(true)} className="text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button
                className="relative"
                onClick={() => {
                  setIsSearchOpen(false);
                  setIsMobileMenuOpen(false);
                  navigate('/checkout/step-1');
                }}
                aria-label="Cart"
              >
                <div className="w-10 h-10 bg-[#EF4444] rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="absolute -top-1 -right-1 bg-white text-[#EF4444] text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  0
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-[#171717] border-t border-gray-700 py-4 animate-slideDown">
              <nav className="space-y-4">
                <div>
                  <button
                    onClick={() => setIsShopOpen(!isShopOpen)}
                    className="text-white font-bold font-montserrat flex items-center justify-between w-full"
                  >
                    Shop
                    <svg className={`w-5 h-5 transition-transform ${isShopOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isShopOpen && (
                    <div className="mt-2 pl-4 space-y-2">
                      {Object.values(shopCategories).flat().map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategoryClick(category)}
                          className="block text-white/80 font-montserrat text-sm hover:text-[#EF4444] transition-colors"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <Link 
                  to="/about" 
                  className="block text-white font-bold font-montserrat hover:text-[#EF4444] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/blog" 
                  className="block text-white font-bold font-montserrat hover:text-[#EF4444] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  to="/contact" 
                  className="block text-white font-bold font-montserrat hover:text-[#EF4444] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-[#171717] z-50 md:hidden animate-fadeIn">
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold font-montserrat text-xl">Search</h2>
              <button onClick={() => setIsSearchOpen(false)} className="text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="relative">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full px-4 py-3 pr-12 bg-transparent border-2 border-white rounded-lg text-white placeholder-white/70 font-montserrat font-medium text-lg focus:outline-none focus:border-[#EF4444]"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
              {/* Mobile Search Suggestions */}
              {searchSuggestions.length > 0 && (
                <div className="mt-4 bg-white rounded-lg shadow-lg overflow-hidden max-h-64 overflow-y-auto">
                  {searchSuggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.title)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
                    >
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[#171717] font-montserrat text-base font-medium truncate">
                          {product.title}
                        </p>
                        <p className="text-[#EF4444] font-montserrat text-base font-bold">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

