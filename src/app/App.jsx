import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteProvider } from "../context/SiteContext";
import Navbar from "../components/layout/Navbar";
import Seo from "../components/layout/Seo";
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import About from "../components/sections/About";
import ScriptureSlider from "../components/sections/ScriptureSlider";
import Events from "../components/sections/Events";
import Message from "../components/sections/Message";
import VisitUs from "../components/sections/VisitUs";
import Giving from "../components/sections/Giving";
import Footer from "../components/layout/Footer";
import NotFound from "../components/layout/NotFound";

const AdminApp = lazy(() => import("../admin/AdminApp"));

export function Website() {
  return (
    <>
      <Seo />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <ScriptureSlider />
        <Events />
        <Message />
        <VisitUs />
        <Giving />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Website />} />
          <Route
            path="/admin"
            element={
              <Suspense fallback={null}>
                <AdminApp />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </SiteProvider>
  );
}
