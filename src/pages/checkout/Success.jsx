import { Link } from "react-router-dom";

const Success = () => {
  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  return (
    <div className="pt-20">
      <div className="max-w-[800px] mx-auto px-6 py-16 text-center">
        <h1 className="font-montserrat font-bold text-3xl text-[#171717] mb-4">Thank you for your order!</h1>
        <p className="font-montserrat text-[#171717] mb-6">Your order number is #{orderNumber}.</p>
        <Link
          to="/"
          className="inline-block bg-[#EF4444] text-white px-6 h-12 rounded-lg font-montserrat font-semibold hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Success;


