import { MapPin, Clock, ArrowRight } from "lucide-react";
import { useSite } from "../context/SiteContext";

export default function Hero() {
  const { hero, services } = useSite();
  const firstService = services?.[0];

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[640px] flex items-center justify-center bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(11, 40, 15, 0.72), rgba(11, 40, 15, 0.78)), url('${hero.image}')`,
      }}
    >
      <div className="text-center px-4 max-w-4xl mx-auto z-10">
        <p className="text-primary-300 font-semibold uppercase tracking-[0.3em] text-sm mb-4 animate-fade-in">
          {hero.scriptureRef}
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 animate-fade-in delay-100 leading-tight">
          {hero.title}
          <span className="block text-primary-300">{hero.titleAccent}</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-10 font-light italic animate-fade-in delay-200 max-w-2xl mx-auto">
          {hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in delay-300">
          <a
            href="#services"
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center justify-center gap-2"
          >
            <Clock className="w-5 h-5" /> {hero.ctaPrimaryLabel}
          </a>
          <a
            href="#visit"
            className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
          >
            <MapPin className="w-5 h-5" /> {hero.ctaSecondaryLabel}
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 w-full transform translate-y-1/2 z-20 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-8 border-t-4 border-primary-600">
          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
            <div className="bg-primary-100 p-4 rounded-full text-primary-700 shrink-0">
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-gray-900">
                {hero.quickTitle}
              </h3>
              <p className="text-gray-600">
                {hero.quickTime || firstService?.time}
              </p>
            </div>
          </div>
          <div className="hidden md:block w-px h-16 bg-gray-200" />
          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
            <div className="bg-primary-100 p-4 rounded-full text-primary-700 shrink-0">
              <MapPin className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-gray-900">
                {hero.quickLocationLabel}
              </h3>
              <p className="text-gray-600">{hero.quickLocation}</p>
            </div>
          </div>
          <div className="w-full md:w-auto text-center">
            <a
              href="#visit"
              className="inline-flex items-center gap-1 text-primary-700 font-semibold hover:text-primary-800 underline underline-offset-4 decoration-2"
            >
              Get Directions <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}