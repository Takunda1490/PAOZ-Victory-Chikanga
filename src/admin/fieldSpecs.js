// Describes every editable field so the admin UI can be generated from it.
// Adding a field here is enough to make it appear in the admin panel.

export const bundledAssets = [
  "/assets/church_logo.png",
  "/assets/green_bg_one.jpg",
  "/assets/devotion-green.webp",
  "/assets/scripture_one.jpg",
  "/assets/bible_one.avif",
  "/assets/cross_two.jpg",
  "/assets/dove.webp",
  "/assets/text_one.jpg",
  "/assets/pw_one.jpg",
  "/assets/hope-in-jesus.jpg",
  "/assets/Psalm16_8.jpeg",
  "/assets/Hebrews11_1.jpeg",
  "/assets/event_one.png",
  "/assets/favicon.jpg",
  ...Array.from({ length: 10 }, (_, i) => `/assets/bg${i + 1}.jpg`),
];

const text = (key, label, extra = {}) => ({
  key,
  label,
  type: "text",
  ...extra,
});
const area = (key, label, extra = {}) => ({
  key,
  label,
  type: "textarea",
  ...extra,
});
const image = (key, label) => ({ key, label, type: "image" });
const bool = (key, label) => ({ key, label, type: "checkbox" });

// ---------------------------------------------------------- single sections

export const sectionSpecs = [
  {
    key: "settings",
    label: "Church Settings",
    description: "Name, contact details and map embed used across the site.",
    fields: [
      text("churchName", "Church name"),
      text("place", "Location / branch name"),
      text("tagline", "Tagline"),
      text("phone", "Phone number"),
      text("whatsapp", "WhatsApp link", {
        placeholder: "https://wa.me/263000000000",
      }),
      text("facebook", "Facebook page link"),
      text("mapsLink", "Google Maps link"),
      area("address", "Postal address"),
      area("mapEmbed", "Google Maps embed URL"),
      text("copyrightHolder", "Copyright holder initials"),
    ],
  },
  {
    key: "nav",
    label: "Navigation",
    description: "Header links and the Give Online button label.",
    fields: [
      text("callToAction", "Header button label"),
      { key: "links", label: "Menu links", type: "links" },
    ],
  },
  {
    key: "hero",
    label: "Hero",
    description: "The full screen banner at the top of the page.",
    fields: [
      text("scriptureRef", "Scripture reference"),
      text("title", "Main title"),
      text("titleAccent", "Highlighted second line"),
      area("subtitle", "Subtitle"),
      text("ctaPrimaryLabel", "Primary button label"),
      text("ctaSecondaryLabel", "Secondary button label"),
      image("image", "Background image"),
      text("quickTitle", "Quick card title"),
      text("quickTime", "Quick card time"),
      text("quickLocationLabel", "Quick card location label"),
      text("quickLocation", "Quick card location text"),
    ],
  },
  {
    key: "services",
    label: "Services (headings)",
    description: "The text above the service time cards.",
    fields: [
      text("eyebrow", "Small label above heading"),
      text("heading", "Heading"),
      area("description", "Description"),
    ],
  },
  {
    key: "about",
    label: "About",
    description: "The 'Who we are' section.",
    fields: [
      text("eyebrow", "Small label above heading"),
      text("heading", "Heading"),
      area("body1", "First paragraph"),
      area("body2", "Second paragraph"),
      text("ctaLabel", "Button label"),
      image("image", "Image"),
      text("statValue", "Badge value"),
      text("statLabel", "Badge label"),
    ],
  },
  {
    key: "pillars",
    label: "Mission (headings)",
    description: "The text above the mission statement cards.",
    fields: [text("eyebrow", "Small label above heading"), text("heading", "Heading")],
  },
  {
    key: "scriptures",
    label: "Scripture slider (headings)",
    description: "The text above the scripture slider.",
    fields: [text("eyebrow", "Small label above heading"), text("heading", "Heading")],
  },
  {
    key: "events",
    label: "Events (headings)",
    description: "The text above the event cards.",
    fields: [
      text("eyebrow", "Small label above heading"),
      text("heading", "Heading"),
      text("calendarTitle", "Calendar card title"),
      area("calendarBody", "Calendar card text"),
      area("calendarNote", "Calendar card note under the button"),
      text("calendarCta", "Calendar card button"),
    ],
  },
  {
    key: "message",
    label: "Today's Message",
    description: "The sermon / message section.",
    fields: [
      text("eyebrow", "Small label above heading"),
      text("title", "Message title"),
      text("scripture", "Key scriptures"),
      area("body", "Message body"),
      image("image", "Image"),
    ],
  },
  {
    key: "visit",
    label: "Visit Us",
    description: "The map section headings.",
    fields: [
      text("eyebrow", "Small label above heading"),
      text("heading", "Heading"),
      text("ctaLabel", "Directions button label"),
    ],
  },
  {
    key: "giving",
    label: "Giving (headings)",
    description: "The donation section text.",
    fields: [
      text("eyebrow", "Small label above heading"),
      text("heading", "Heading"),
      area("body", "Introduction"),
      area("footnote", "Footnote under the payment methods"),
    ],
  },
  {
    key: "footer",
    label: "Footer",
    description: "Footer text and labels.",
    fields: [
      area("blurb", "About blurb"),
      text("quickLinksHeading", "Quick links heading"),
      text("hoursHeading", "Opening hours heading"),
      text("contactHeading", "Contact heading"),
      text("legalOne", "First legal link"),
      text("legalTwo", "Second legal link"),
    ],
  },
];

// ---------------------------------------------------------------- collections

export const collectionSpecs = [
  {
    table: "services",
    label: "Service Times",
    description: "Cards under Service Times. These also fill the footer hours.",
    titleKey: "day",
    fields: [
      text("day", "Day"),
      text("time", "Time"),
      image("image_url", "Background image"),
    ],
    newItem: { day: "New day", time: "09:00 - 12:00", image_url: "" },
  },
  {
    table: "pillars",
    label: "Mission Pillars",
    description: "The three mission statement cards.",
    titleKey: "title",
    fields: [
      text("title", "Title"),
      text("reference", "Scripture reference"),
      area("body", "Description"),
      image("image_url", "Image"),
    ],
    newItem: { title: "New pillar", reference: "", body: "", image_url: "" },
  },
  {
    table: "scriptures",
    label: "Scripture Slider",
    description: "Each slide shows the image on the left and the text on the right.",
    titleKey: "reference",
    fields: [
      text("reference", "Scripture reference"),
      text("title", "Title"),
      area("verse", "Verse text"),
      area("note", "Reflection note"),
      image("image_url", "Scripture image"),
    ],
    newItem: { reference: "", title: "", verse: "", note: "", image_url: "" },
  },
  {
    table: "events",
    label: "Events",
    description:
      "Each event renders a details card and, when enabled, a poster card beside it.",
    titleKey: "title",
    fields: [
      text("title", "Event title"),
      text("date_month", "Date badge month"),
      text("date_day", "Date badge day"),
      text("speaker", "Guest speaker"),
      text("event_time", "Date and time"),
      text("location", "Location"),
      area("description", "Description"),
      bool("show_poster", "Show the poster card beside this event"),
      image("poster_url", "Poster image"),
    ],
    newItem: {
      title: "New event",
      speaker: "",
      event_time: "",
      location: "",
      description: "",
      date_month: "",
      date_day: "",
      poster_url: "",
      show_poster: true,
    },
  },
  {
    table: "giving_methods",
    label: "Giving Methods",
    description: "Bank, EcoCash and WhatsApp details shown in the Giving section.",
    titleKey: "label",
    fields: [
      text("label", "Method name"),
      area("value", "Details"),
      area("note", "Note"),
    ],
    newItem: { label: "New method", value: "", note: "" },
  },
];