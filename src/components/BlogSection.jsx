import BlogCard from './BlogCard';

const BlogSection = ({ blogs }) => {
  return (
    <section id="blog" className="py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#171717] mb-8 font-montserrat text-center">
          From Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
        <div className="text-center">
          <a 
            href="#blog" 
            className="inline-block bg-[#EF4444] text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity font-montserrat"
          >
            View All Articles
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

