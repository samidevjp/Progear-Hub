const BlogCard = ({ blog }) => {
  return (
    <div>
      {/* Blog Image */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-auto rounded-xl object-cover mb-4"
      />

      {/* Blog Title */}
      <h3 className="font-medium font-montserrat text-[#171717] mb-2 leading-[1.3] text-left text-[20px] md:text-[22px] lg:text-[26px]">
        {blog.title}
      </h3>

      {/* Blog Description */}
      <p className="font-medium font-montserrat text-[#171717] mb-4 leading-[1.5] text-left line-clamp-3 text-[15px] md:text-[16px] lg:text-[18px]">
        {blog.description}
      </p>

      {/* Read More Button */}
      <div className="flex justify-center">
        <button className="min-w-[160px] bg-[#171717] text-white text-[16px] font-semibold font-montserrat rounded-lg px-6 py-3 hover:bg-[#EF4444] transition-colors duration-200">
          Read More
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
