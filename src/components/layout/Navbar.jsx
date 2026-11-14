import { useEffect, useState } from "react";
import { Menu, X, Cross, Phone, HandHeart } from "lucide-react";
import { Link } from "react-router-dom";
import Picture from "../ui/Picture";
import { useSite } from "../../context/SiteContext";

const ANCHOR_TO_ROUTE = {
  "#hero": "/",
  "#about": "/",
  "#services": "/services",
  "#events": "/events",
  "#visit": "/visit-us",
  "#footer": "/",
  "#giving": "/giving",
};

const toRoute = (href) => ANCHOR_TO_ROUTE[href] ?? href;

export default function Navbar() {
  const { settings, nav } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  const links = nav?.links ?? [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    document.querySelectorAll("main section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = (href) =>
    `text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
      scrolled
        ? active === href
          ? "text-primary-600"
          : "text-gray-700 hover:text-primary-600"
        : active === href
          ? "text-primary-300"
          : "text-white hover:text-primary-300"
    }`;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md py-2 border-b border-gray-100"
          : "bg-transparent text-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
            aria-label={`${settings.churchName} home`}
          >
            <Picture
              src="/assets/church_logo.jpg"
              alt={`${settings.churchName} logo`}
              eager={true}
              width={528}
              height={140}
              className="h-14 md:h-16 w-auto"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => {
              const route = toRoute(link.href);
              const isExternal = link.href.startsWith("http");
              return (
                <Link
                  key={link.href}
                  to={isExternal ? link.href : route}
                  className={linkClass(link.href)}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              to="/giving"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-full font-semibold text-sm transition-colors duration-300 shadow-lg"
            >
              <HandHeart className="w-4 h-4" />
              {nav.callToAction}
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <a
              href={settings.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={`p-2 rounded-full ${
                scrolled ? "text-gray-700" : "text-white"
              }`}
              aria-label="WhatsApp"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className={`focus:outline-none ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white text-gray-800 shadow-xl absolute top-full left-0 w-full animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {links.map((link) => {
              const route = toRoute(link.href);
              const isExternal = link.href.startsWith("http");
              return (
                <Link
                  key={link.href}
                  to={isExternal ? link.href : route}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-3 hover:bg-primary-50 hover:text-primary-600 rounded-md font-semibold text-lg border-b border-gray-100"
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4">
              <Link
                to="/giving"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 block w-full text-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300"
              >
                <Cross className="w-4 h-4" />
                {nav.callToAction}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}