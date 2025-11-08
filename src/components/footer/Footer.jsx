import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import FooterNavGroup from "./FooterNavGroup";
import logoWhite from "../logo-white.png";

const Footer = () => {
  return (
    <footer className="bg-[#171717] text-white">
      {/* Main content */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-10 md:py-14 grid gap-y-10 lg:gap-y-10 lg:gap-x-16 lg:grid-cols-[1.2fr_1fr_0.8fr]">
        {/* Shop (SP first, PC center) */}
        <div className="order-1 lg:order-2">
          <FooterNavGroup
            title="Shop"
            desktopStatic
            defaultOpen
            items={[
              ["All", "/products/all"],
              ["Football", "/products/football"],
              ["Running", "/products/running"],
              ["Training", "/products/training"],
              ["Accessories", "/products/accessories"],
              ["Everyday Fitness", "/products/everyday-fitness"],
              ["Cheer Dance", "/products/cheer-dance"],
              ["Tennis", "/products/tennis"],
              ["Swimming", "/products/swimming"],
            ]}
          />
          <div className="lg:hidden h-px bg-[rgba(255,255,255,0.08)] my-4" />
        </div>

        {/* Right column groups (SP second, PC right) */}
        <div className="order-2 lg:order-3 space-y-6">
          <FooterNavGroup title="Blog" singleLink="/blog" />
          <div className="lg:hidden h-px bg-[rgba(255,255,255,0.08)] my-4" />
          <FooterNavGroup title="About" singleLink="/about" />
          <div className="lg:hidden h-px bg-[rgba(255,255,255,0.08)] my-4" />
          <FooterNavGroup title="Contact" singleLink="/contact" />
        </div>

        {/* Brand block (SP last, PC left) */}
        <div className="order-3 lg:order-1">
          <div className="flex items-center gap-2">
            <img src={logoWhite} alt="ProGear Hub" className="h-6 w-auto select-none" draggable="false" />
            <span className="text-xl font-semibold">ProGear Hub</span>
          </div>
          <p className="text-sm text-white/85 mt-6 leading-[1.7]">
            123 Business Street St Kilda, Melbourne VIC 3182
          </p>
          <p className="text-sm text-white/85 mt-3 leading-[1.7]">0400 000 000</p>
          <p className="text-sm text-white/85 mt-3 leading-[1.7]">sample@sample.com</p>
          <div className="flex items-center gap-6 mt-6 text-[#EF4444]">
            <Link
              to="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-[#171717]"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 hover:text-white transition" />
            </Link>
            <Link
              to="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-[#171717]"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 hover:text-white transition" />
            </Link>
            <Link
              to="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-[#171717]"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 hover:text-white transition" />
            </Link>
            <Link
              to="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-[#171717]"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5 hover:text-white transition" />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="px-5 md:px-8 pb-8">
        <p className="text-center text-white/60 text-xs">Copyright</p>
      </div>
    </footer>
  );
};

export default Footer;


