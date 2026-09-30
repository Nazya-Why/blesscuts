export const contacts = {
  name: "Bless Cuts barbershop",
  phone: "+38 (097) 544 44 54",
  phoneHref: "tel:+380975444454",
  instagram: "@blesscuts.barbershop",
  instagramUrl: "https://www.instagram.com/blesscuts.barbershop/",
  tiktok: "@blesscuts.barbers",
  tiktokUrl: "https://www.tiktok.com/@blesscuts.barbers",
  /** 3D-огляд барбершопу в Google Maps (посилання з біо Instagram) */
  tourUrl: "https://maps.app.goo.gl/mP4bveQNTFDRpimZ9",
  slogan: "Твій стиль — наше мистецтво.",
  address: "пл. Данила Галицького, 16",
  city: "Львів",
  postalCode: "79008",
  region: "Львівська область",
  hours: "Пн — Нд, 10:00 — 20:00",
  opens: "10:00",
  closes: "20:00",
  geo: { lat: 49.8440211, lng: 24.0309528 },
  mapsUrl: "https://www.google.com/maps/place/Bless+Cuts+barbershop/@49.8440211,24.0309528,15z/data=!4m6!3m5!1s0x473add407c519e13:0xf742003c8a5486fa!8m2!3d49.8440211!4d24.0309528!16s%2Fg%2F11h3yhhh9b",
  bookingUrl: "https://b769482.alteg.io/company/723076/menu?o=",
  rating: "4,9",
  founded: 2023,
};

/** Маршрут у Google Maps до барбершопу */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${contacts.geo.lat},${contacts.geo.lng}`;

/** Соцмережі й корисні посилання у футері — ті самі, що в біо Instagram барбершопу */
export const socials = [
  { label: "Instagram", url: contacts.instagramUrl, icon: "instagram" },
  { label: "TikTok", url: contacts.tiktokUrl, icon: "tiktok" },
  { label: "3D-тур", url: contacts.tourUrl, icon: "cube" },
  { label: "Відгуки Google", url: contacts.mapsUrl, icon: "star" },
] as const;

/** Атрибути для зовнішніх посилань (запис, Instagram, карти) */
export const external = { target: "_blank", rel: "noopener" } as const;
