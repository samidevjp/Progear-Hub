const PromoBanner = () => {
  return (
    <section className="py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <a href="#" className="block w-full">
          {/* Placeholder banner - replace with actual images when available */}
          <div className="flex items-center justify-center bg-gradient-to-r from-[#EF4444] to-[#DC2626] rounded-lg p-12 md:p-16 text-white text-center hover:opacity-90 transition-opacity">
            <div>
              <h3 className="text-3xl md:text-5xl font-bold mb-4 font-montserrat">WINTER SALE</h3>
              <p className="text-2xl md:text-4xl font-bold font-montserrat">80% OFF</p>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default PromoBanner;
