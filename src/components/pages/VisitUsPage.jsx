import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import Seo from "../layout/Seo";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import VisitUs from "../sections/VisitUs";
import { useSite } from "../../context/SiteContext";

export default function VisitUsPage() {
  const { settings } = useSite();

  return (
    <>
      <Navbar />
      <main>
        <Seo
          title="Visit Us | PAOZ Victory Tabernacle Chikanga"
          description="Visit PAOZ Victory Tabernacle Chikanga in Mutare, Zimbabwe. Stand No. 10B, World Bank Street, Chikanga 1. Get directions and service times."
          breadcrumbs={[
            { name: "Home", url: "/" },
            { name: "Visit Us", url: "/visit-us" },
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
              Find Us
            </span>
            <h1 className="mt-3 text-4xl md:text-6xl font-serif font-bold text-white">
              Visit Us
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We would love to meet you in person. Come as you are — there is a
              place for you at {settings.churchName}.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-primary-200 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-primary-600 shrink-0" />
                  <h2 className="text-xl font-serif font-bold text-gray-900">
                    Our Address
                  </h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
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

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-primary-200 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-primary-600 shrink-0" />
                  <h2 className="text-xl font-serif font-bold text-gray-900">
                    Service Times
                  </h2>
                </div>
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li className="flex justify-between border-b border-gray-100 pb-2">
                    <span>Sunday</span>
                    <span>09:00 – 12:30</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-100 pb-2">
                    <span>Monday</span>
                    <span>17:00 – 18:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Wednesday</span>
                    <span>17:00 – 18:00</span>
                  </li>
                </ul>
                <Link
                  to="/services"
                  className="text-primary-600 font-semibold text-sm hover:underline inline-flex items-center gap-1 mt-4"
                >
                  View Service Times <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-primary-200 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="w-5 h-5 text-primary-600 shrink-0" />
                  <h2 className="text-xl font-serif font-bold text-gray-900">
                    Contact
                  </h2>
                </div>
                <a
                  href={`tel:${settings.phone}`}
                  className="text-xl font-serif font-bold text-primary-600 mb-2 block hover:text-primary-700"
                >
                  {settings.phone}
                </a>
                <a
                  href={settings.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary-600 font-semibold text-sm hover:underline inline-flex items-center gap-1"
                >
                  WhatsApp <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <VisitUs />
      </main>
      <Footer />
    </>
  );
}