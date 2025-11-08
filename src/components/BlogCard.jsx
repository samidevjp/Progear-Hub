const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="aspect-video overflow-hidden">
        <img 
          src={blog.image} 
          alt={blog.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-[#171717] mb-2 font-montserrat">
          {blog.title}
        </h3>
        <p className="text-gray-600 mb-4 font-montserrat line-clamp-3">
          {blog.description}
        </p>
        <button className="text-[#EF4444] font-bold hover:underline font-montserrat">
          Read More
        </button>
      </div>
    </div>
  );
};

export default BlogCard;

