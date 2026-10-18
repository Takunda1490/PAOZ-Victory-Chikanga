const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "public", "sitemap.xml");
const SITE_URL = "https://paozvictorytabernaclechikanga.netlify.app";

// Public, indexable routes only (admin is excluded).
const ROUTES = ["/"];

const urls = ROUTES.map((route) => {
  const loc = SITE_URL + (route === "/" ? "/" : route);
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${route === "/" ? "1.0" : "0.8"}</priority>\n  </url>`;
}).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

fs.writeFileSync(OUT, xml);
console.log("Generated", path.relative(ROOT, OUT));
