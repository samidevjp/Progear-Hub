const HeroBanner = () => {
  return (
    <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=1080&fit=crop')"
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#171717] opacity-70" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-montserrat">
          FUEL YOUR PASSION
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 font-montserrat italic">
          Designed to perform, crafted to inspire.
        </p>
        <a 
          href="#products" 
          className="inline-block bg-[#EF4444] text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity font-montserrat"
        >
          See All
        </a>
      </div>
    </div>
  );
};

export default HeroBanner;

