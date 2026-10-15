// Default content for every section of the site.
// This is the fallback: the site renders from these values until Supabase
// returns rows, so it still works with no backend configured.

export const defaults = {
  settings: {
    churchName: "PAOZ Victory Tabernacle",
    place: "Chikanga",
    tagline: "A place to worship the Lord",
    phone: "+263774178000",
    whatsapp: "https://wa.me/263733096391",
    facebook:
      "https://www.facebook.com/profile.php?id=100083316068636",
    mapsLink: "https://maps.app.goo.gl/QkbCtkm7UCnAUh8x6",
    address: "Stand No. 10B, World Bank Street, Chikanga 1, Mutare, Zimbabwe",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.8186283659225!2d32.611242673890686!3d-18.98361580953511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x192ce906207d6a47%3A0x9693dc47f5d7821c!2sPAOZ%20Victory%20Tabernacle%20Chikanga!5e0!3m2!1sen!2szw!4v1784570406011!5m2!1sen!2szw",
    copyrightHolder: "TK",
  },

  nav: {
    callToAction: "Give Online",
    links: [
      { label: "Home", href: "#hero" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Events", href: "#events" },
      { label: "Visit Us", href: "#visit" },
      { label: "Contact", href: "#footer" },
    ],
  },

  hero: {
    scriptureRef: "Psalm 122:1",
    title: "PAOZ Victory Tabernacle",
    titleAccent: "Chikanga",
    subtitle: "A place to worship the Lord",
    ctaPrimaryLabel: "Service Times",
    ctaSecondaryLabel: "Plan a Visit",
    image: "/assets/green_bg_one.jpg",
    quickTitle: "Sunday Service",
    quickTime: "09:00 - 12:30",
    quickLocationLabel: "Location",
    quickLocation: "Stand No. 10B, World Bank Street, Chikanga 1",
  },

  services: {
    eyebrow: "Join Us",
    heading: "Service Times",
    description:
      "Come as you are. There is a place for you in these gatherings of worship, the Word and prayer.",
  },

  about: {
    eyebrow: "Who We Are",
    heading: "A Tabernacle of Worship. A Family for You.",
    body1:
      "PAOZ Victory Tabernacle Chikanga is a place to worship the Lord. We gather to praise God, to study His Word and to strengthen one another in faith. Our doors are open to everyone who desires to know Him.",
    body2:
      "Whether you are exploring faith for the first time or looking for a family to call home, there is room for you here. Come as you are, and experience the grace of God with us.",
    ctaLabel: "Read Our Mission",
    image: "/assets/scripture_one.jpg",
    statValue: "122:1",
    statLabel: "Joy to your house",
  },

  pillars: {
    eyebrow: "Our Mission",
    heading: "Mission Statement",
  },

  scriptures: {
    eyebrow: "The Word",
    heading: "Scripture & Reflection",
  },

  events: {
    eyebrow: "Join Us",
    heading: "Upcoming Events",
    calendarTitle: "Coming Soon",
    calendarBody:
      "These are the upcoming events. More will be uploaded soon.",
    calendarNote:
      "For anything not listed here, message us on WhatsApp and we will confirm the details with you personally.",
    calendarCta: "Ask For Dates",
  },

  message: {
    eyebrow: "This Week",
    title: "Message Title",
    scripture: "Key Scriptures: Romans 5:8-13, Genesis 20:13",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci doloribus iure iusto eaque eos provident nam, asperiores alias explicabo hic eligendi id maiores molestiae nesciunt veniam soluta molestias deleniti reiciendis!",
    image: "/assets/bible_one.avif",
  },

  visit: {
    eyebrow: "Find Us",
    heading: "Visit Us",
    ctaLabel: "Get Directions",
  },

  giving: {
    eyebrow: "Give Online",
    heading: "Support the Ministry",
    body: "Every gift you give helps us worship, serve and reach the lost with the good news of Jesus Christ. Choose a method below and send your offering directly.",
    footnote:
      "Please include your name and the word “Offering” in the payment reference so we can acknowledge it.",
  },

  footer: {
    blurb:
      "A place to worship the Lord, to grow in faith and to love and serve our neighbours. Join us this Sunday as we worship together.",
    quickLinksHeading: "Quick Links",
    hoursHeading: "Opening Hours",
    contactHeading: "Contact Us",
    legalOne: "Privacy Policy",
    legalTwo: "Terms of Service",
  },
};

export const defaultServices = [
  { id: "s1", day: "Sunday", time: "09:00 - 12:30", image_url: "/assets/bg1.jpg" },
  { id: "s2", day: "Monday", time: "17:00 - 18:00", image_url: "/assets/bg6.jpg" },
  {
    id: "s3",
    day: "Wednesday",
    time: "17:00 - 18:00",
    image_url: "/assets/bg3.jpg",
  },
];

export const defaultPillars = [
  {
    id: "p1",
    title: "Evangelism and Discipleship",
    reference: "Matthew 28:19-20",
    body: "To lead people to a life-changing relationship with Jesus Christ.",
    image_url: "/assets/cross_two.jpg",
  },
  {
    id: "p2",
    title: "Love and Justice",
    reference: "Matthew 25:35-36",
    body: "To love our neighbours as ourselves, serving our community with compassion.",
    image_url: "/assets/dove.webp",
  },
  {
    id: "p3",
    title: "Worship and Presence",
    reference: "1 Peter 2:9",
    body: "Glorifying God through worship and building a family rooted in His Word.",
    image_url: "/assets/bg9.jpg",
  },
];

export const defaultScriptures = [
  {
    id: "v1",
    reference: "Psalm 16:8",
    title: "The Lord at My Right Hand",
    verse:
      "I have set the LORD always before me; for he is at my right hand, so I shall not slip.",
    note: "A life anchored in God cannot be shaken, because the One who holds us also holds our steps.",
    image_url: "/assets/Psalm16_8.jpeg",
  },
  {
    id: "v2",
    reference: "Hebrews 11:1",
    title: "The Confidence of Faith",
    verse:
      "Now faith is being sure of what we hope for and being certain of what we do not see.",
    note: "Faith lets us walk with God into seasons we cannot yet explain.",
    image_url: "/assets/Hebrews11_1.jpeg",
  },
  {
    id: "v3",
    reference: "Romans 15:13",
    title: "Hope In Jesus",
    verse:
      "May the God of hope fill you with all joy and peace in believing, so that by the power of the Holy Spirit you may abound in hope.",
    note: "Every promise we hold rests on the faithfulness of Christ Himself.",
    image_url: "/assets/hope-in-jesus.jpg",
  },
];

export const defaultEvents = [
  {
    id: "e1",
    title: "Light Up For Christ",
    speaker: "Pstr Karen",
    event_time: "Friday 19 June 2026 | 21:00",
    location: "World Bank Street, Stand No 10B",
    description:
      "An evening of worship, the word and prayer as we light up Chikanga for Christ. Join us and bring someone with you.",
    date_month: "Jun",
    date_day: "19",
    poster_url: "/assets/event_one.png",
    show_poster: true,
  },
];

export const defaultGivingMethods = [
  {
    id: "g1",
    label: "Bank Transfer",
    value: "Account Name: PAOZ Victory Tabernacle | Account No: 0000 0000 00",
    note: "Bank: CBZ | Branch: Mutare",
  },
  {
    id: "g2",
    label: "EcoCash",
    value: "+263 77 417 8000",
    note: "Send to the church number and save the confirmation screenshot.",
  },
  {
    id: "g3",
    label: "WhatsApp",
    value: "+263 73 309 6391",
    note: "Message us for offering details and prayer requests.",
  },
];