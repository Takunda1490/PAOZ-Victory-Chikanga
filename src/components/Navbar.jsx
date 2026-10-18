import { useEffect, useState } from "react";
import { Menu, X, Cross, Phone, HandHeart } from "lucide-react";
import { useSite } from "../context/SiteContext";

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
          <a
            href="#hero"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
            aria-label={`${settings.churchName} home`}
          >
            <img
              src="/assets/church_logo.jpg"
              alt={`${settings.churchName} logo`}
              className="h-14 md:h-16 w-auto"
            />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </a>
            ))}
            <a
              href="#giving"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-full font-semibold text-sm transition-colors duration-300 shadow-lg"
            >
              <HandHeart className="w-4 h-4" />
              {nav.callToAction}
            </a>
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
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-3 hover:bg-primary-50 hover:text-primary-600 rounded-md font-semibold text-lg border-b border-gray-100"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4">
              <a
                href="#giving"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 block w-full text-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300"
              >
                <Cross className="w-4 h-4" />
                {nav.callToAction}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}