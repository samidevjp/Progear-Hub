import bannerPc from '../assets/image/banner-pc.png';
import bannerSp from '../assets/image/banner-sp.png';

const PromoBanner = () => {
  return (
    <section className="py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <a href="#" className="block w-full">
          <div className="relative rounded-lg overflow-hidden hover:opacity-90 transition-opacity">
            {/* SP用画像 */}
            <img 
              src={bannerSp} 
              alt="Winter Sale 80% OFF" 
              className="w-full h-auto md:hidden"
            />
            {/* PC/Tablet用画像 */}
            <img 
              src={bannerPc} 
              alt="Winter Sale 80% OFF" 
              className="w-full h-auto hidden md:block"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default PromoBanner;
