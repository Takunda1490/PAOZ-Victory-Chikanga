const path = require("path");
const { pathToFileURL } = require("url");

async function main() {
  const root = path.resolve(__dirname, "..");
  const specs = await import(pathToFileURL(path.join(root, "src", "admin", "fieldSpecs.js")).href);
  const defaultsMod = await import(pathToFileURL(path.join(root, "src", "data", "defaults.js")).href);

  const sectionSpecKeys = specs.sectionSpecs.map((s) => s.key);
  const defaultKeys = Object.keys(defaultsMod.defaults);

  const missingInDefaults = sectionSpecKeys.filter((k) => !(k in defaultsMod.defaults));
  const missingInSpecs = defaultKeys.filter((k) => !sectionSpecKeys.includes(k));

  if (missingInDefaults.length || missingInSpecs.length) {
    console.error("fieldSpecs/defaults mismatch:");
    if (missingInDefaults.length) console.error("  in specs but not defaults:", missingInDefaults);
    if (missingInSpecs.length) console.error("  in defaults but not specs:", missingInSpecs);
    process.exit(1);
  }

  // For each section, check field keys exist in defaults
  for (const spec of specs.sectionSpecs) {
    const def = defaultsMod.defaults[spec.key];
    if (!def || typeof def !== "object" || Array.isArray(def)) continue;
    const fields = (spec.fields || []).map((f) => f.key);
    const missingFields = fields.filter((f) => !(f in def));
    if (missingFields.length) {
      console.error(`Section ${spec.key}: fields missing in defaults:`, missingFields);
      process.exit(1);
    }
  }

  console.log("Content validation passed.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
