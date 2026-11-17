import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import Seo from "../layout/Seo";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Events from "../sections/Events";
import { useSite } from "../../context/SiteContext";

export default function EventsPage() {
  const { settings } = useSite();

  return (
    <>
      <Navbar />
      <main>
        <Seo
          title="Upcoming Events | PAOZ Victory Tabernacle Chikanga"
          description="Upcoming events at PAOZ Victory Tabernacle Chikanga, Mutare, Zimbabwe. Light Up For Christ and other church events. Stand No. 10B, World Bank Street, Chikanga 1."
          breadcrumbs={[
            { name: "Home", url: "/" },
            { name: "Upcoming Events", url: "/events" },
          ]}
        />

        <section className="relative bg-primary-900 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/assets/devotion-green.webp')" }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-primary-900/80 via-primary-900/90 to-primary-900"
            aria-hidden="true"
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-24 text-center">
            <span className="text-primary-300 font-bold tracking-wider uppercase text-sm">
              Join Us
            </span>
            <h1 className="mt-3 text-4xl md:text-6xl font-serif font-bold text-white">
              Upcoming Events
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Join us for worship, fellowship and special events throughout the
              year. Check back regularly for new events and posters.
            </p>
          </div>
        </section>

        <Events />

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md hover:border-primary-200 transition-all">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-2">
                  Stay Updated
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  New events are added regularly. Check this page for the latest
                  posters, dates and details.
                </p>
                <a
                  href={settings.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary-600 font-semibold text-sm hover:underline inline-flex items-center gap-1"
                >
                  Ask About Dates <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md hover:border-primary-200 transition-all">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-2">
                  Where We Meet
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  {settings.address}
                </p>
                <a
                  href={settings.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary-600 font-semibold text-sm hover:underline inline-flex items-center gap-1"
                >
                  Get Directions <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md hover:border-primary-200 transition-all">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-2">
                  Service Times
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Sun 09:00–12:30 · Mon &amp; Wed 17:00–18:00
                </p>
                <Link
                  to="/services"
                  className="text-primary-600 font-semibold text-sm hover:underline inline-flex items-center gap-1"
                >
                  View Service Times <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary-900 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="text-3xl font-serif font-bold text-white mb-3">
                  Plan Your Visit
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  We would love to meet you in person. Come as you are — there
                  is a place for you at {settings.churchName}.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/visit-us"
                  className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                >
                  Plan a Visit <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-gray-600 hover:border-white text-white px-6 py-3 rounded-full font-semibold transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}