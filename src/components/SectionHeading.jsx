const SectionHeading = ({ children, className = "" }) => {
  return (
    <h2 
      className={`flex items-center font-bold text-[#171717] font-montserrat ${className}`}
      style={{ fontSize: '32px' }}
    >
      {/* Vertical Accent Bar */}
      <div 
        className="bg-[#EF4444] rounded-full mr-4 self-stretch"
        style={{ 
          width: '8px'
        }}
      />
      {/* Heading Text */}
      <span>{children}</span>
    </h2>
  );
};

export default SectionHeading;

