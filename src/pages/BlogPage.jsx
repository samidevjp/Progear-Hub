import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import SectionHeading from '../components/SectionHeading';
import { blogs } from '../data/blogs';

const BlogPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="mb-8">
          <SectionHeading>From Blog</SectionHeading>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
        <div className="text-center">
          <Link
            to="/"
            className="inline-block bg-[#EF4444] text-white px-8 py-3 rounded-full font-bold font-montserrat hover:opacity-90 transition-opacity"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

