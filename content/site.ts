export const siteConfig = {
  name: "Dr. Coffee Station",
  shortName: "Dr. Coffee",
  url: "https://dr-coffee-station.athomicrafa-rc.chatgpt.site",
  tagline: "Café especial, todos os dias.",
  description:
    "Café especial, preparo artesanal e boas pausas na Dr. Coffee Station, no Alpha Center em Resende.",
  instagram: {
    handle: "@dr.coffeestation",
    url: "https://www.instagram.com/dr.coffeestation/",
  },
  address: {
    street: "Av. Luiz Dias Martins, 73",
    neighborhood: "Alpha Center",
    city: "Resende",
    region: "RJ",
    display: "Av. Luiz Dias Martins, 73 — Alpha Center, Resende",
  },
  // Preencher somente depois da confirmação dos dados oficiais.
  whatsappUrl: null as string | null,
  mapsUrl: null as string | null,
  openingHours: null as string | null,
} as const;

export const primaryNavigation = [
  { href: "/", label: "Início" },
  { href: "/cardapio", label: "Cardápio" },
  { href: "/sobre", label: "Sobre" },
  { href: "/servicos", label: "Serviços" },
  { href: "/experiencias", label: "Experiências" },
  { href: "/blog", label: "Blog" },
] as const;

export const utilityNavigation = [
  { href: "/loja", label: "Loja" },
  { href: "/contato", label: "Contato" },
] as const;
