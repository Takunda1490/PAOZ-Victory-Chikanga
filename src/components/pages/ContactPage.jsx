import { Link } from "react-router-dom";
import { MapPin, Phone, MessageCircle, Clock, ArrowRight } from "lucide-react";
import Seo from "../layout/Seo";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import VisitUs from "../sections/VisitUs";
import { useSite } from "../../context/SiteContext";

export default function ContactPage() {
  const { settings } = useSite();

  return (
    <>
      <Navbar />
      <main>
        <Seo
          title="Contact Us | PAOZ Victory Tabernacle Chikanga"
          description="Contact PAOZ Victory Tabernacle Chikanga in Mutare, Zimbabwe. Phone, WhatsApp, address, and directions. Stand No. 10B, World Bank Street, Chikanga 1."
          breadcrumbs={[
            { name: "Home", url: "/" },
            { name: "Contact Us", url: "/contact" },
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
              Get in Touch
            </span>
            <h1 className="mt-3 text-4xl md:text-6xl font-serif font-bold text-white">
              Contact Us
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Have a question, a prayer request, or would like to visit? Reach
              out to {settings.churchName} — we would love to hear from you.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-primary-200 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="w-5 h-5 text-primary-600 shrink-0" />
                  <h2 className="text-xl font-serif font-bold text-gray-900">
                    Call Us
                  </h2>
                </div>
                <a
                  href={`tel:${settings.phone}`}
                  className="text-xl font-serif font-bold text-primary-600 mb-2 block hover:text-primary-700"
                >
                  {settings.phone}
                </a>
                <p className="text-gray-600 text-sm">
                  Church office. Call for inquiries, prayer requests, or to
                  schedule a visit.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-primary-200 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="w-5 h-5 text-primary-600 shrink-0" />
                  <h2 className="text-xl font-serif font-bold text-gray-900">
                    WhatsApp
                  </h2>
                </div>
                <a
                  href={settings.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary-600 font-semibold text-sm mb-2 inline-flex items-center gap-1 hover:text-primary-700"
                >
                  Message on WhatsApp <ArrowRight className="w-4 h-4" />
                </a>
                <p className="text-gray-600 text-sm">
                  Send us a message for offering details, prayer requests, or
                  event information.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-primary-200 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-primary-600 shrink-0" />
                  <h2 className="text-xl font-serif font-bold text-gray-900">
                    Visit Us
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
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary-900 text-white rounded-2xl p-8 md:p-12 grid md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-5 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-primary-400" />
                  Service Times
                </h2>
                <ul className="space-y-3 text-gray-300 text-sm">
                  <li className="flex justify-between border-b border-white/10 pb-2">
                    <span>Sunday</span>
                    <span>09:00 – 12:30</span>
                  </li>
                  <li className="flex justify-between border-b border-white/10 pb-2">
                    <span>Monday</span>
                    <span>17:00 – 18:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Wednesday</span>
                    <span>17:00 – 18:00</span>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-3xl font-serif font-bold mb-5">
                  Plan Your Visit
                </h2>
                <p className="text-gray-300 text-sm mb-6">
                  We would love to meet you in person. Come as you are — there
                  is a place for you at {settings.churchName}.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/visit-us"
                    className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                  >
                    Plan a Visit <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={settings.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-gray-600 hover:border-white text-white px-6 py-3 rounded-full font-semibold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Message on WhatsApp
                  </a>
                </div>
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