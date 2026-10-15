import { Clock } from "lucide-react";
import { useSite } from "../context/SiteContext";

export default function Services() {
  const { services: copy, services: items = [] } = useSite();

  return (
    <section id="services" className="pt-40 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="text-primary-600 font-bold tracking-wider uppercase text-sm">
            {copy.eyebrow}
          </span>
          <h2 className="mt-2 text-4xl font-serif font-bold text-gray-900 mb-4">
            {copy.heading}
          </h2>
          <p className="text-gray-600">{copy.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((service, i) => (
            <div
              key={service.id ?? i}
              className="group relative h-72 rounded-xl overflow-hidden shadow-lg cursor-pointer"
            >
              <img
                src={service.image_url}
                alt={`${service.day} service`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-transparent" />
              <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-white">
                <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4">
                  <Clock className="w-7 h-7 text-primary-200" />
                </div>
                <h3 className="font-serif text-3xl font-bold mb-2">
                  {service.day}
                </h3>
                <p className="text-primary-100 text-lg font-medium tracking-wide">
                  {service.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}