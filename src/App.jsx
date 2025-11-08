import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Step1 from "./pages/checkout/Step1";
import Step2 from "./pages/checkout/Step2";
import Success from "./pages/checkout/Success";
import { CheckoutProvider } from "./context/CheckoutContext";

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname, location.search]);
  return null;
}

function App() {
  return (
    <Router>
      <CheckoutProvider>
    <div className="min-h-screen">
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/:category" element={<ProductListPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/checkout/step-1" element={<Step1 />} />
            <Route path="/checkout/step-2" element={<Step2 />} />
            <Route path="/checkout/success" element={<Success />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
      <Footer />
    </div>
      </CheckoutProvider>
    </Router>
  );
}

export default App;
