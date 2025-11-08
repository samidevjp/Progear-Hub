import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

/**
 * FooterNavGroup
 * - Mobile (<= lg-1): accordion behavior with chevron toggle (except when singleLink)
 * - Desktop (lg+): if desktopStatic, list is always visible and not toggleable
 *
 * Props:
 * - title: string
 * - items?: Array<[string, string]>  // [label, href]
 * - singleLink?: string              // when provided, the title row navigates to this link
 * - defaultOpen?: boolean            // mobile default open state
 * - desktopStatic?: boolean          // disable accordion on lg+ and keep content visible
 */
const FooterNavGroup = ({
  title,
  items,
  singleLink,
  defaultOpen = false,
  desktopStatic = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const hasList = Array.isArray(items) && items.length > 0;
  const isAccordion = !singleLink && hasList;

  const contentId = useMemo(
    () => `footer-section-${title.toLowerCase().replace(/\s+/g, "-")}`,
    [title]
  );

  return (
    <div className="pb-4 lg:pb-0">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        {singleLink ? (
          <Link
            to={singleLink}
            className="group flex-1 text-white hover:text-[#EF4444] transition font-bold tracking-[0.01em] text-[20px] lg:text-[22px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-[#171717]"
          >
            {title}
          </Link>
        ) : (
          <button
            type="button"
            aria-controls={contentId}
            aria-expanded={desktopStatic ? true : isOpen}
            onClick={() => {
              if (!desktopStatic && isAccordion) setIsOpen((v) => !v);
            }}
            className="group w-full flex items-center justify-between text-left lg:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-[#171717]"
          >
            <span className="flex-1 text-white group-hover:text-[#EF4444] transition font-bold tracking-[0.01em] text-[20px] lg:text-[22px]">
              {title}
            </span>
            {/* Chevron for mobile only when accordion */}
            {isAccordion && (
              <ChevronRight
                className={`ml-3 w-5 h-5 text-white/80 transition-transform duration-200 lg:hidden ${
                  isOpen ? "rotate-90" : ""
                }`}
                aria-hidden="true"
              />
            )}
          </button>
        )}
        {/* Desktop chevrons are not needed; right column titles show chevron only on mobile per spec */}
      </div>

      {/* List (Accordion content) */}
      {hasList && (
        <div
          id={contentId}
          className={`overflow-hidden transition-[max-height,opacity] duration-200 ease-out ${
            desktopStatic
              ? "opacity-100 max-h-[1000px] lg:mt-4"
              : isOpen
              ? "opacity-100 max-h-[1000px] mt-2 lg:mt-4"
              : "opacity-0 max-h-0"
          }`}
        >
          <ul className="space-y-[14px]">
            {items.map(([label, href]) => (
              <li key={label}>
                <Link
                  to={href}
                  className="group flex items-center justify-between h-9 text-[16px] font-medium text-white/85 hover:text-[#EF4444] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-[#171717]"
                >
                  <span>{label}</span>
                  <ChevronRight className="w-[18px] h-[18px] text-white/70 transition-colors group-hover:text-[#EF4444]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FooterNavGroup;


