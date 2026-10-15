import { MapPin, ExternalLink } from "lucide-react";
import { useSite } from "../context/SiteContext";

export default function VisitUs() {
  const { visit, settings } = useSite();

  return (
    <section id="visit" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="text-primary-600 font-bold tracking-wider uppercase text-sm">
            {visit.eyebrow}
          </span>
          <h2 className="mt-2 text-4xl font-serif font-bold text-gray-900 mb-4">
            {visit.heading}
          </h2>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5 text-primary-600 shrink-0" />
            {settings.address}
          </p>
          <a
            href={settings.mapsLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:text-primary-800 underline underline-offset-4 mt-4"
          >
            {visit.ctaLabel} <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100">
          <iframe
            src={settings.mapEmbed}
            title="PAOZ Victory Tabernacle Chikanga location"
            className="w-full h-[420px]"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </section>
  );
}