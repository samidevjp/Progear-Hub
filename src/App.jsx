import HeroBanner from './components/HeroBanner';
import ProductSection from './components/ProductSection';
import PromoBanner from './components/PromoBanner';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import { products } from './data/products';
import { blogs } from './data/blogs';

function App() {
  // Split products into featured and new arrivals
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(2, 6);

  return (
    <div className="min-h-screen">
      <HeroBanner />
      <ProductSection 
        title="Featured Products" 
        products={featuredProducts}
        sectionId="products"
      />
      <PromoBanner />
      <ProductSection 
        title="New Arrivals" 
        products={newArrivals}
        sectionId="new-arrivals"
      />
      <BlogSection blogs={blogs} />
      <Footer />
    </div>
  );
}

export default App;
