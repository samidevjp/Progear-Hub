import BlogCard from "./BlogCard";
import SectionHeading from "./SectionHeading";

const BlogSection = ({ blogs }) => {
  // 最新3件のみ表示
  const displayBlogs = blogs.slice(0, 3);

  return (
    <section id="blog" className="py-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header with View All Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <SectionHeading>From Blog</SectionHeading>
          <button className="bg-[#EF4444] text-white text-[16px] font-semibold font-montserrat rounded-lg px-6 py-3 hover:opacity-90 transition-opacity duration-200">
            View All Article
          </button>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
