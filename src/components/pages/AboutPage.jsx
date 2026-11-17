import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import Seo from "../layout/Seo";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import About from "../sections/About";
import ScriptureSlider from "../sections/ScriptureSlider";
import { useSite } from "../../context/SiteContext";

export default function AboutPage() {
  const { settings } = useSite();

  return (
    <>
      <main>
        <Seo
          title="About Us | PAOZ Victory Tabernacle Chikanga"
          description="Learn about PAOZ Victory Tabernacle Chikanga — who we are, our mission, and our core values. A church in Mutare, Zimbabwe committed to worship, the Word and prayer."
          breadcrumbs={[
            { name: "Home", url: "/" },
            { name: "About Us", url: "/about" },
          ]}
        />
        <Navbar />
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
              Who We Are
            </span>
            <h1 className="mt-3 text-4xl md:text-6xl font-serif font-bold text-white">
              About Us
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              A tabernacle of worship and a family for you. Learn who we are,
              what we believe, and the mission that drives everything we do at{" "}
              {settings.churchName}.
            </p>
          </div>
        </section>

        <About />

        <ScriptureSlider />

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary-900 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="text-3xl font-serif font-bold text-white mb-3">
                  Come and Worship With Us
                </h2>
                <p className="text-gray-300 leading-relaxed mb-5">
                  Join us this Sunday at 09:00 for worship, the Word and prayer.
                  There is a place for you at {settings.churchName}.
                </p>
                <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                  <span className="inline-flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary-400" />
                    Sun 09:00 – 12:30
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary-400" />
                    Chikanga 1, Mutare
                  </span>
                </div>
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