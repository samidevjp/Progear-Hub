import kvPc from "../assets/image/kv-pc.png";
import kvSp from "../assets/image/kv-sp.png";

const HeroBanner = () => {
  return (
    <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image - SP用 */}
      <div
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{
          backgroundImage: `url(${kvSp})`,
        }}
      />
      {/* Background Image - PC/Tablet用 */}
      <div
        className="absolute inset-0 bg-cover bg-center hidden md:block"
        style={{
          backgroundImage: `url(${kvPc})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Main Heading */}
        <h1
          className="text-white font-bebas uppercase"
          style={{
            fontSize: "100px",
            letterSpacing: "0.05em",
            fontWeight: 400,
          }}
        >
          FUEL YOUR PASSION.
        </h1>

        {/* Subheading */}
        <div
          className="mt-4 text-white font-montserrat font-bold"
          style={{ fontSize: "28px", lineHeight: 1.5 }}
        >
          <p>
            Designed to <span className="text-[#EF4444]">perform</span>, crafted
            to <span className="text-[#EF4444]">inspire</span>.
          </p>
          <p>
            Every piece moves with{" "}
            <span className="text-[#EF4444]">your energy</span>.
          </p>
        </div>

        {/* CTA Button */}
        <a
          href="#products"
          className="inline-block bg-[#EF4444] text-white rounded-full font-semibold hover:opacity-90 transition-opacity font-montserrat mt-8"
          style={{
            height: "48px",
            padding: "0 24px",
            lineHeight: "48px",
          }}
        >
          See All
        </a>
      </div>
    </div>
  );
};

export default HeroBanner;
