import { Link } from "react-router-dom";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import Seo from "../layout/Seo";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Services from "../sections/Services";
import { useSite } from "../../context/SiteContext";

export default function ServicesPage() {
  const { settings } = useSite();

  return (
    <>
      <Navbar />
      <main>
        <Seo
          title="Service Times | PAOZ Victory Tabernacle Chikanga"
          description="Service times at PAOZ Victory Tabernacle Chikanga, Mutare, Zimbabwe. Sunday 09:00-12:30, Monday and Wednesday 17:00-18:00. Stand No. 10B, World Bank Street, Chikanga 1."
          breadcrumbs={[
            { name: "Home", url: "/" },
            { name: "Service Times", url: "/services" },
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
              Gather With Us
            </span>
            <h1 className="mt-3 text-4xl md:text-6xl font-serif font-bold text-white">
              Service Times
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Come as you are. There is a place for you in these gatherings of
              worship, the Word and prayer. All services are held at our church
              in Chikanga 1, Mutare.
            </p>
          </div>
        </section>

        <Services className="pt-20 pb-20" />

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary-600" />
                  What to Expect
                </h2>
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600">✓</span>
                    Warm welcome and friendly greeting at the door
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600">✓</span>
                    Worship, prayer and preaching from the Word of God
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600">✓</span>
                    Family-friendly environment — all ages welcome
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600">✓</span>
                    Prayer ministry available after every service
                  </li>
                </ul>
              </div>

              <div className="bg-primary-900 text-white p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-serif font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-400" />
                  Where We Meet
                </h2>
                <p className="text-gray-300 text-sm mb-4">
                  {settings.address}
                </p>
                <p className="text-gray-400 text-sm mb-6">
                  We are located at Stand No. 10B, World Bank Street, Chikanga 1,
                  Mutare, Zimbabwe.
                </p>
                <a
                  href={settings.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary-400 font-semibold hover:text-primary-300 inline-flex items-center gap-1"
                >
                  Open in Google Maps <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary-900 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="text-3xl font-serif font-bold text-white mb-3">
                  Come and Worship With Us
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Join us this Sunday at 09:00 for worship, the Word and prayer.
                  There is a place for you at {settings.churchName}.
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