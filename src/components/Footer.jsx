import {
  Facebook,
  MessageCircle,
  MapPin,
  Phone,
  Clock,
  ArrowUp,
} from "lucide-react";
import { useSite } from "../context/SiteContext";

const headingClass =
  "text-lg font-bold font-serif mb-6 text-white relative inline-block";
const headingUnderline =
  "absolute bottom-0 left-0 w-1/2 h-1 bg-primary-500 -mb-2";

export default function Footer() {
  const { settings, footer, nav, services: serviceTimes = [] } = useSite();

  return (
    <footer
      id="footer"
      className="bg-gray-900 text-white pt-16 pb-8 border-t-4 border-primary-600"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/assets/church_logo.png"
                alt={`${settings.churchName} logo`}
                className="h-16 w-auto"
              />
              
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              {footer.blurb}
            </p>
            <div className="flex space-x-4">
              <a
                href={settings.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={settings.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={settings.mapsLink}
                target="_blank"
                rel="noreferrer"
                aria-label="Our location"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
              >
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className={headingClass}>
              {footer.quickLinksHeading}
              <span className={headingUnderline} />
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              {(nav?.links ?? []).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={headingClass}>
              {footer.hoursHeading}
              <span className={headingUnderline} />
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              {serviceTimes.map((service, i) => (
                <li
                  key={service.id ?? i}
                  className="flex items-center gap-3 justify-between border-b border-gray-800 pb-2"
                >
                  <span className="font-semibold text-gray-300">
                    {service.day}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary-400" />
                    {service.time}
                  </span>
                </li>
              ))}
            </ul>
            <h4 className={`${headingClass} mt-8`}>
              {footer.contactHeading}
              <span className={headingUnderline} />
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-400 shrink-0" />
                <a
                  href={`tel:${settings.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.phone}
                </a>
              </li>
            </ul>
          </div>

</div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} {settings.churchName}{" "}
            {settings.place}. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#hero" className="hover:text-white transition-colors">
              {footer.legalOne}
            </a>
            <a href="#hero" className="hover:text-white transition-colors">
              {footer.legalTwo}
            </a>
          </div>
        </div>
      </div>

      <a
        href="#hero"
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center shadow-lg transition-colors"
      >
        <ArrowUp className="w-5 h-5" />
      </a>
    </footer>
  );
}