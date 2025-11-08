import SectionHeading from '../components/SectionHeading';

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="mb-8">
          <SectionHeading>About ProGear Hub</SectionHeading>
        </div>
        <div className="space-y-6 text-[#171717] font-montserrat">
          <p className="text-lg leading-relaxed">
            Welcome to ProGear Hub, your premier destination for high-performance sports equipment and athletic gear. 
            We are passionate about helping athletes and fitness enthusiasts achieve their goals with the best equipment available.
          </p>
          <p className="text-lg leading-relaxed">
            Founded with a mission to fuel your passion, ProGear Hub brings together the finest selection of sports gear 
            designed to perform and crafted to inspire. Every piece in our collection moves with your energy, supporting 
            you in every step of your athletic journey.
          </p>
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Our Story</h3>
            <p className="text-lg leading-relaxed">
              ProGear Hub was born from a simple belief: that the right equipment can make all the difference. 
              Whether you're training for a marathon, perfecting your game, or just starting your fitness journey, 
              we're here to provide you with gear that meets the highest standards of quality and performance.
            </p>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Our Commitment</h3>
            <p className="text-lg leading-relaxed">
              We are committed to sustainability, quality, and customer satisfaction. Every product in our catalog 
              is carefully selected to ensure it meets our rigorous standards for durability, performance, and value.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

