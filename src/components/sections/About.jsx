import { ArrowRight } from "lucide-react";
import Picture from "../ui/Picture";
import { useSite } from "../../context/SiteContext";

export default function About() {
  const { about, pillars: copy, pillars: items = [] } = useSite();

  return (
    <>
      <section id="about" className="pt-20 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <Picture
                src={about.image}
                alt="Scripture and worship"
                sizes="wide"
                className="rounded-lg shadow-xl w-full object-cover h-[500px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-xl hidden md:block border-t-4 border-primary-600">
                <p className="font-serif text-4xl font-bold text-primary-600 mb-1">
                  {about.statValue}
                </p>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  {about.statLabel}
                </p>
              </div>
            </div>
            <div>
              <span className="text-primary-600 font-bold tracking-wider uppercase text-sm">
                {about.eyebrow}
              </span>
              <h2 className="mt-2 text-4xl font-serif font-bold text-gray-900 mb-6">
                {about.heading}
              </h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {about.body1}
              </p>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                {about.body2}
              </p>
              <a
                href="#pillars"
                className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:text-primary-600 transition-colors group"
              >
                {about.ctaLabel}{" "}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="pillars"
        className="py-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(11, 40, 15, 0.72), rgba(11, 40, 15, 0.82)), url('/assets/devotion-green.webp')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-primary-300 font-bold tracking-wider uppercase text-sm">
              {copy.eyebrow}
            </span>
            <h2 className="mt-2 text-4xl font-serif font-bold text-white">
              {copy.heading}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {items.map((pillar, i) => (
              <div
                key={pillar.id ?? i}
                className="group bg-white rounded-xl shadow-lg overflow-hidden text-center"
              >
                <div className="h-52 overflow-hidden">
                  <Picture
                    src={pillar.image_url}
                    alt={pillar.title}
                    sizes="card"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mx-auto mb-4 -mt-10 relative z-10 border-4 border-white">
                    <span className="font-serif font-bold text-xs px-1 text-center leading-tight">
                      {pillar.reference.split(" ").pop()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-primary-700 text-sm font-semibold mb-3">
                    {pillar.reference}
                  </p>
                  <p className="text-gray-600 mb-2">{pillar.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}