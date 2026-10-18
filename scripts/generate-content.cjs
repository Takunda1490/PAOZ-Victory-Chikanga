const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const ENV_PATH = path.join(ROOT, ".env");
if (fs.existsSync(ENV_PATH)) {
  for (const line of fs.readFileSync(ENV_PATH, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2].trim();
  }
}
const OUT = path.join(ROOT, "src", "data", "content.generated.json");
const URL = process.env.VITE_SUPABASE_URL;
const KEY = process.env.VITE_SUPABASE_ANON_KEY;

const SECTIONS = [
  "settings",
  "nav",
  "hero",
  "services",
  "about",
  "pillars",
  "scriptures",
  "events",
  "message",
  "visit",
  "giving",
  "footer",
];

const COLLECTIONS = ["services", "pillars", "scriptures", "events", "giving_methods"];

async function fetchTable(table, query = "") {
  const res = await fetch(`${URL}/rest/v1/${table}${query}`, {
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
  });
  if (!res.ok) throw new Error(`${table}: ${res.status}`);
  return res.json();
}

async function main() {
  if (!URL || !KEY) {
    console.warn("Supabase not configured; skipping content fetch.");
    return;
  }
  const [contentRows, ...collectionRows] = await Promise.all([
    fetchTable("site_content", "?select=key,value"),
    ...COLLECTIONS.map((t) => fetchTable(t, "?select=*&order=sort_order")),
  ]);

  const sections = {};
  for (const { key, value } of contentRows) {
    if (SECTIONS.includes(key)) sections[key] = value;
  }

  const collections = {};
  COLLECTIONS.forEach((t, i) => {
    collections[t] = collectionRows[i];
  });

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ sections, collections }, null, 2));
  console.log("Generated", path.relative(ROOT, OUT));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
