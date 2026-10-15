import { Clock, MapPin, Calendar, ChevronRight } from "lucide-react";
import { useSite } from "../context/SiteContext";

export default function Events() {
  const { events: copy, events: items = [], settings } = useSite();

  // A saved row can legitimately have these fields blank, so fall back rather
  // than rendering an empty card.
  const calendarBody =
    copy.calendarBody || "These are the upcoming events. More will be uploaded soon.";
  const calendarTitle = copy.calendarTitle || "Coming Soon";
  const calendarCta = copy.calendarCta || "Ask For Dates";

  return (
    <section
      id="events"
      className="py-20 bg-secondary text-white relative"
    >
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 40L40 0H20L0 20M40 40V20L20 40"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary-300 font-bold tracking-wider uppercase text-sm">
            {copy.eyebrow}
          </span>
          <h2 className="mt-2 text-4xl font-serif font-bold text-white">
            {copy.heading}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((event, i) => (
            <div key={event.id ?? i} className="contents">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-primary-600 text-white text-center rounded-lg px-4 py-2 shadow-md">
                    <span className="block text-sm font-bold uppercase">
                      {event.date_month}
                    </span>
                    <span className="block text-2xl font-serif font-bold">
                      {event.date_day}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                {event.speaker && (
                  <p className="text-primary-200 text-sm font-semibold mb-3">
                    Guest Speaker: {event.speaker}
                  </p>
                )}
                <p className="text-gray-300 text-sm mb-4 flex-1">
                  {event.description}
                </p>
                <div className="space-y-2 mb-4 text-sm text-gray-300">
                  {event.event_time && (
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary-300 shrink-0" />{" "}
                      {event.event_time}
                    </p>
                  )}
                  {event.location && (
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary-300 shrink-0" />{" "}
                      {event.location}
                    </p>
                  )}
                </div>
                <a
                  href="#visit"
                  className="text-white font-semibold text-sm hover:text-primary-300 flex items-center gap-1 group"
                >
                  Details{" "}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {event.show_poster && event.poster_url && (
                <a
                  href={settings.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden hover:bg-white/20 transition-all duration-300"
                >
                  <img
                    src={event.poster_url}
                    alt={`${event.title} event poster`}
                    className="w-full h-full object-contain bg-gray-900 transition-transform duration-500 group-hover:scale-105 p-3"
                  />
                </a>
              )}
            </div>
          ))}

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">{calendarTitle}</h3>
            <p className="text-gray-300 text-sm mb-3">{calendarBody}</p>
            <a
              href={settings.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="bg-white text-secondary px-6 py-2 rounded-full font-bold hover:bg-primary-50 transition-colors mb-4"
            >
              {calendarCta}
            </a>
            {copy.calendarNote && (
              <p className="text-primary-200/80 text-xs leading-relaxed">
                {copy.calendarNote}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}