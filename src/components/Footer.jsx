const Footer = () => {
  return (
    <footer className="bg-[#171717] text-white py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Shop Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-montserrat text-[#EF4444]">Shop</h3>
            <ul className="space-y-2 font-montserrat">
              <li><a href="#" className="hover:text-[#EF4444] transition-colors">Men's Gear</a></li>
              <li><a href="#" className="hover:text-[#EF4444] transition-colors">Women's Gear</a></li>
              <li><a href="#" className="hover:text-[#EF4444] transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-[#EF4444] transition-colors">Sale</a></li>
            </ul>
          </div>
          
          {/* Blog Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-montserrat text-[#EF4444]">Blog</h3>
            <ul className="space-y-2 font-montserrat">
              <li><a href="#" className="hover:text-[#EF4444] transition-colors">Latest Posts</a></li>
              <li><a href="#" className="hover:text-[#EF4444] transition-colors">Fitness Tips</a></li>
              <li><a href="#" className="hover:text-[#EF4444] transition-colors">Product Reviews</a></li>
            </ul>
          </div>
          
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-montserrat text-[#EF4444]">About</h3>
            <ul className="space-y-2 font-montserrat">
              <li><a href="#" className="hover:text-[#EF4444] transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-[#EF4444] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#EF4444] transition-colors">Sustainability</a></li>
            </ul>
          </div>
          
          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-montserrat text-[#EF4444]">Contact</h3>
            <ul className="space-y-2 font-montserrat">
              <li><a href="#" className="hover:text-[#EF4444] transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-[#EF4444] transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-[#EF4444] transition-colors">Returns</a></li>
            </ul>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="border-t border-gray-700 pt-8 mb-6">
          <div className="text-center md:text-left font-montserrat">
            <p className="font-bold mb-2">© ProGear Hub</p>
            <p className="text-gray-400 mb-1">120 Swanston Street, Melbourne VIC 3000</p>
            <p className="text-gray-400">
              <a href="mailto:info@progearhub.com" className="hover:text-[#EF4444] transition-colors">
                info@progearhub.com
              </a>
            </p>
          </div>
        </div>
        
        {/* Social Icons */}
        <div className="flex justify-center md:justify-start space-x-4">
          <a 
            href="#" 
            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#EF4444] transition-colors"
            aria-label="Facebook"
          >
            <span className="text-white font-bold">f</span>
          </a>
          <a 
            href="#" 
            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#EF4444] transition-colors"
            aria-label="Instagram"
          >
            <span className="text-white font-bold">ig</span>
          </a>
          <a 
            href="#" 
            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#EF4444] transition-colors"
            aria-label="YouTube"
          >
            <span className="text-white font-bold">yt</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

