const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "http://localhost:3000";

export const siteConfig = {
  name: "Dr. Coffee Station",
  shortName: "Dr. Coffee",
  url: siteUrl,
  tagline: "Café especial, todos os dias.",
  description:
    "Café especial, preparo artesanal e boas pausas na Dr. Coffee Station, no Alpha Center em Resende.",
  instagram: {
    handle: "@dr.coffeestation",
    url: "https://www.instagram.com/dr.coffeestation/",
  },
  whatsapp: {
    display: "(21) 96475-5168",
    phone: "+5521964755168",
    url: "https://api.whatsapp.com/send?phone=5521964755168",
  },
  address: {
    street: "Av. Luiz Dias Martins, 73",
    neighborhood: "Alpha Center",
    city: "Resende",
    region: "RJ",
    display: "Av. Luiz Dias Martins, 73 — Alpha Center, Resende",
  },
  mapsUrl:
    "https://www.google.com/maps/place/DR.+COFFEE+STATION/@-22.4820086,-44.4697701,17z/data=!3m1!4b1!4m6!3m5!1s0x9e7f5c67a083d1:0x3d98bb9c56f46e6e!8m2!3d-22.4820086!4d-44.4671952!16s%2Fg%2F11yq64ytb7?entry=ttu&g_ep=EgoyMDI2MDcyMC4wIKXMDSoASAFQAw%3D%3D",
  openingHours: null as string | null,
} as const;

export const primaryNavigation = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/cardapio", label: "Cardápio" },
  { href: "/workshop", label: "Workshop" },
  { href: "/blog", label: "Blog" },
] as const;

export const utilityNavigation = [
  { href: "/loja", label: "Loja" },
] as const;
