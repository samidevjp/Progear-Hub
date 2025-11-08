const Footer = () => {
  const shopCategories = [
    'Football',
    'Running',
    'Training',
    'Accessories',
    'Everyday Fitness',
    'Cheer Dance',
    'Tennis',
    'Swimming'
  ];

  return (
    <footer className="bg-[#171717] text-white py-8 md:py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 mb-6">
          {/* Brand Info - Left Column */}
          <div className="text-center md:text-left">
            {/* Logo placeholder - replace with actual logo */}
            <div className="mb-4">
              <span className="text-2xl font-bold font-montserrat text-white">ProGear Hub</span>
            </div>
            <div className="font-montserrat text-sm mb-4" style={{ lineHeight: 1.6 }}>
              <p className="mb-1">123 Business Street St Kilda, Melbourne VIC 3182</p>
              <p className="mb-1">0400 000 000</p>
              <p>
                <a href="mailto:sample@sample.com" className="hover:text-[#EF4444] transition-colors">
                  sample@sample.com
                </a>
              </p>
            </div>
            {/* Social Icons */}
            <div className="flex justify-center md:justify-start gap-3">
              <a 
                href="#" 
                className="text-[#EF4444] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 6.015 4.388 11.004 10.125 11.885v-8.385H7.078v-3.5h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.5h-2.796v8.385C19.612 23.077 24 18.088 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-[#EF4444] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-2.142.105-3.29 1.142-4.395 3.247-.11 1.28-.114 1.688-.114 4.947 0 3.259.014 3.668.114 4.948.105 2.142 1.142 3.29 3.247 4.395 1.28.11 1.688.114 4.947.114 3.259 0 3.668-.014 4.948-.114 2.142-.105 3.29-1.142 4.395-3.247.11-1.28.114-1.688.114-4.948 0-3.259-.014-3.667-.114-4.947-.105-2.142-1.142-3.29-3.247-4.395-1.28-.11-1.688-.114-4.947-.114zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-[#EF4444] hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-[#EF4444] hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Categories - Center Column */}
          <div className="text-center md:text-left">
            <h3 className="text-base font-semibold mb-4 font-montserrat text-[#EF4444]">Shop</h3>
            <ul className="font-montserrat text-sm" style={{ lineHeight: 1.6 }}>
              {shopCategories.map((category, index) => (
                <li key={index} className="mb-1">
                  <a href="#" className="hover:text-[#EF4444] transition-colors">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog, About, Contact - Right Column */}
          <div className="text-center md:text-left">
            <h3 className="text-base font-semibold mb-4 font-montserrat text-[#EF4444]">Navigation</h3>
            <ul className="font-montserrat text-sm space-y-2">
              <li>
                <a href="#" className="hover:text-[#EF4444] transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#EF4444] transition-colors">About</a>
              </li>
              <li>
                <a href="#" className="hover:text-[#EF4444] transition-colors">Contact</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6">
          <p className="text-center font-montserrat text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            Copyright
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

