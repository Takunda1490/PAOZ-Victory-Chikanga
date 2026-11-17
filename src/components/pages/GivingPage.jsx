import { Link } from "react-router-dom";
import { Banknote, Phone, MessageCircle, ArrowRight } from "lucide-react";
import Seo from "../layout/Seo";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Giving from "../sections/Giving";
import { useSite } from "../../context/SiteContext";

export default function GivingPage() {
  const { settings } = useSite();

  return (
    <>
      <Navbar />
      <main>
        <Seo
          title="Giving & Donations | PAOZ Victory Tabernacle Chikanga"
          description="Give online to PAOZ Victory Tabernacle Chikanga, Mutare, Zimbabwe. Bank transfer, EcoCash and WhatsApp details. Support the ministry."
          breadcrumbs={[
            { name: "Home", url: "/" },
            { name: "Giving & Donations", url: "/giving" },
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
              Give Online
            </span>
            <h1 className="mt-3 text-4xl md:text-6xl font-serif font-bold text-white">
              Giving &amp; Donations
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Every gift you give helps us worship, serve and reach the lost
              with the good news of Jesus Christ. Choose a method below and send
              your offering directly.
            </p>
          </div>
        </section>

        <div className="border-t-4 border-primary-600">
          <Giving />
        </div>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary-900 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="text-3xl font-serif font-bold text-white mb-3">
                  Questions About Giving?
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  If you have any questions about giving, or would like to give
                  in person, we would be happy to help. Reach out on WhatsApp or
                  contact the church office.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={settings.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Message on WhatsApp
                </a>
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