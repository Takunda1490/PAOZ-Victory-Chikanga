import { useEffect } from "react";
import { useSite } from "../../context/SiteContext";

const SITE_URL = "https://paoz-victory-tabernacle-chikanga.pages.dev/";

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

export default function Seo({ title, description, breadcrumbs }) {
  const { settings } = useSite();

  useEffect(() => {
    if (!settings) return;

    const pageTitle = title || `${settings.churchName} ${settings.place} | ${settings.tagline}`;
    const pageDescription =
      description ||
      `${settings.churchName} ${settings.place} is a church in Mutare, Zimbabwe. ${settings.address}.`;

    document.title = pageTitle;

    setMeta('meta[name="description"]', "content", pageDescription);
    setMeta('meta[property="og:title"]', "content", pageTitle);
    setMeta('meta[property="og:description"]', "content", pageDescription);
    setMeta('meta[property="og:url"]', "content", SITE_URL);
    setMeta('meta[name="twitter:title"]', "content", pageTitle);
    setMeta('meta[name="twitter:description"]', "content", pageDescription);

    // BreadcrumbList structured data.
    if (breadcrumbs && breadcrumbs.length) {
      let existing = document.getElementById("breadcrumb-schema");
      if (!existing) {
        existing = document.createElement("script");
        existing.id = "breadcrumb-schema";
        existing.type = "application/ld+json";
        document.head.appendChild(existing);
      }
      existing.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: SITE_URL + (item.url === "/" ? "" : item.url),
        })),
      });
    } else {
      const existing = document.getElementById("breadcrumb-schema");
      if (existing) existing.remove();
    }

    // Keep the structured data in step with whatever the admin has saved.
    const script = document.getElementById("church-schema");
    if (script) {
      try {
        const data = JSON.parse(script.textContent);
        data.name = `${settings.churchName} ${settings.place}`;
        data.telephone = settings.phone;
      } catch {
        // Leave the original markup in place if it cannot be parsed.
      }
    }
  }, [settings, title, description, breadcrumbs]);

  return null;
}
