import { useEffect } from "react";
import { useSite } from "../../context/SiteContext";

const SITE_URL = "https://paozvictorytabernaclechikanga.netlify.app/";

const setMeta = (selector, attribute, value) => {
  if (!value) return;
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    const [key, val] = selector.replace(/[<>]/g, "").split("=");
    tag.setAttribute(key, val);
    document.head.appendChild(tag);
  }
  tag.setAttribute(attribute, value);
};

export default function Seo() {
  const { settings, services: times = [] } = useSite();

  useEffect(() => {
    if (!settings) return;

    const title = `${settings.churchName} ${settings.place} | ${settings.tagline}`;
    const description = `${settings.churchName} ${settings.place} is a church in Mutare, Zimbabwe. ${times
      .map((s) => `${s.day} ${s.time}`)
      .join(", ")}. ${settings.address}.`;

    document.title = title;

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", SITE_URL);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);

    // Keep the structured data in step with whatever the admin has saved.
    const script = document.getElementById("church-schema");
    if (script) {
      try {
        const data = JSON.parse(script.textContent);
        data.name = `${settings.churchName} ${settings.place}`;
        data.telephone = settings.phone;
        data.openingHoursSpecification = times.map((service) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: service.day,
          opens: service.time.split("-")[0]?.trim(),
          closes: service.time.split("-")[1]?.trim(),
        }));
        script.textContent = JSON.stringify(data);
      } catch {
        // Leave the original markup in place if it cannot be parsed.
      }
    }
  }, [settings, times]);

  return null;
}
