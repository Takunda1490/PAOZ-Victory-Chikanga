import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SiteProvider } from "./context/SiteContext";
import Navbar from "./components/Navbar";
import Seo from "./components/Seo";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import ScriptureSlider from "./components/ScriptureSlider";
import Events from "./components/Events";
import Message from "./components/Message";
import VisitUs from "./components/VisitUs";
import Giving from "./components/Giving";
import Footer from "./components/Footer";
import AdminApp from "./admin/AdminApp";

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
          <Route path="/admin" element={<AdminApp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SiteProvider>
  );
}