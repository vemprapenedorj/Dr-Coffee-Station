import { siteConfig } from "@/content/site";

export interface WorkshopItem {
  id: string;
  title: string;
  tagline: string;
  status: "Próximo workshop" | "Inscrições abertas" | "Realizado";
  statusType: "featured" | "open" | "completed";
  date: string;
  isoDate: string;
  time: string;
  location: string;
  spots: string;
  price: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  whatsappMessage: string;
}

export interface WorkshopGalleryItem {
  src: string;
  alt: string;
  title: string;
  caption: string;
}

export const workshopIntro = {
  eyebrow: "WORKSHOPS & ENCONTROS NA DR. COFFEE",
  title: "Aprenda, deguste e vivencie a cultura do café especial.",
  description:
    "A Dr. Coffee Station é um espaço de encontro para quem deseja ir além da xícara. Promovemos workshops práticos, degustações guiadas, palestras e experiências sensoriais sobre grãos, métodos de extração, cupping e harmonizações em Resende.",
  highlightBadge: "Ambiente reservado no Alpha Center",
};

export const featuredWorkshop: WorkshopItem = {
  id: "degustacao-cafes-especiais",
  title: "Degustação Guia & Cupping de Cafés Especiais",
  tagline: "Desenvolva seu paladar e descubra notas aromáticas, acidez e corpo de grãos selecionados.",
  status: "Inscrições abertas",
  statusType: "open",
  date: "Sábado, 24 de Agosto de 2026",
  isoDate: "2026-08-24T15:00:00-03:00",
  time: "15:00 às 17:30",
  location: "Dr. Coffee Station — Alpha Center, Resende/RJ",
  spots: "Apenas 10 vagas disponíveis",
  price: "R$ 85,00 por pessoa (inclui material e degustação)",
  description:
    "Uma experiência imersiva conduzida por nossos especialistas. Você irá comparar grãos de diferentes regiões produtoras do Brasil, aprender a identificar aromas com a roda de sabores do café e testar extrações nos métodos V60, Chemex e Prensa Francesa, acompanhados de harmonização com nossos doces artesanais.",
  highlights: [
    "Análise sensorial prática e cupping de 4 micro-lotes de café",
    "Comparativo de métodos filtrados ao vivo",
    "Harmonização especial com itens do nosso cardápio",
    "Material de apoio e certificado simbólico de participação",
  ],
  image: "/images/home/dr-coffee-hero.png",
  imageAlt: "Preparo artesanal de café especial na Dr. Coffee Station",
  whatsappMessage: "Olá! Gostaria de reservar minha vaga no Workshop de Degustação Guia no dia 24/08.",
};

export const upcomingWorkshops: WorkshopItem[] = [
  {
    id: "barista-caseiro-extraindo-o-melhor-cafe",
    title: "Barista Caseiro: Métodos Filtrados em Casa",
    tagline: "Segredos da moagem, proporção de água e temperatura para o café perfeito no seu dia a dia.",
    status: "Próximo workshop",
    statusType: "featured",
    date: "Sábado, 12 de Setembro de 2026",
    isoDate: "2026-09-12T15:30:00-03:00",
    time: "15:30 às 18:00",
    location: "Dr. Coffee Station — Alpha Center, Resende/RJ",
    spots: "8 vagas disponíveis",
    price: "R$ 95,00 por pessoa",
    description:
      "Aprenda técnicas práticas para transformar a sua rotina de café em casa. Vamos abordar moagem correta, calibração da proporção água:café, qualidade da água e truques para extrair o melhor de cada grão.",
    highlights: [
      "Prática nos métodos V60, Aeropress e Melitta",
      "Como escolher e armazenar grãos especiais em casa",
      "Dicas de moagem e moedores manuais vs elétricos",
    ],
    image: "/images/cardapio/dr-coffee-cappuccino-real.png",
    imageAlt: "Barista preparando café na Dr. Coffee Station",
    whatsappMessage: "Olá! Gostaria de informações sobre o workshop Barista Caseiro do dia 12/09.",
  },
  {
    id: "harmonizacao-doces-e-cafes",
    title: "Harmonização: Cafés Especiais & Confeitaria",
    tagline: "Uma jornada gustativa combinando acidez e doçura com itens exclusivos da nossa vitrine.",
    status: "Inscrições abertas",
    statusType: "open",
    date: "Sábado, 26 de Setembro de 2026",
    isoDate: "2026-09-26T16:00:00-03:00",
    time: "16:00 às 18:00",
    location: "Dr. Coffee Station — Alpha Center, Resende/RJ",
    spots: "12 vagas disponíveis",
    price: "R$ 110,00 por pessoa",
    description:
      "Entenda a ciência e a arte por trás das harmonizações por contraste e por semelhança. Combinaremos cafés filtrados e espressos com tortas, toasts e doces preparados na cafeteria.",
    highlights: [
      "Degustação guiada de 3 cafés + 3 acompanhamentos",
      "Explicação técnica de contrastes de sabor",
      "Lanche da tarde exclusivo em ambiente aconchegante",
    ],
    image: "/images/cardapio/dr-coffee-breakfast.jpg",
    imageAlt: "Torta e café servidos na mesa da Dr. Coffee Station",
    whatsappMessage: "Olá! Quero me inscrever na Harmonização de Doces e Cafés no dia 26/09.",
  },
];

export const pastWorkshops: WorkshopItem[] = [
  {
    id: "introducao-aos-filtrados",
    title: "Introdução aos Métodos Filtrados",
    tagline: "Primeiros passos no universo dos cafés especiais e suas nuances.",
    status: "Realizado",
    statusType: "completed",
    date: "15 de Julho de 2026",
    isoDate: "2026-07-15T15:00:00-03:00",
    time: "15:00 às 17:00",
    location: "Dr. Coffee Station, Resende/RJ",
    spots: "Turma lotada",
    price: "Concluído",
    description:
      "Encontro focado em apresentar os principais métodos de extração (V60, Prensa Francesa e Hario Drip) para entusiastas iniciantes.",
    highlights: ["Degustação comparativa", "Apostila digital de métodos"],
    image: "/images/cardapio/dr-coffee-iced-real.png",
    imageAlt: "Turma praticando métodos filtrados na Dr. Coffee Station",
    whatsappMessage: "Olá! Gostaria de saber quando haverá nova edição do workshop Introdução aos Filtrados.",
  },
  {
    id: "cremosidade-do-cappuccino-e-latte-art",
    title: "Latte Art & Cremosidade do Cappuccino",
    tagline: "Técnica de vaporização de leite e introdução a artes no café.",
    status: "Realizado",
    statusType: "completed",
    date: "28 de Junho de 2026",
    isoDate: "2026-06-28T16:00:00-03:00",
    time: "16:00 às 18:30",
    location: "Dr. Coffee Station, Resende/RJ",
    spots: "Turma lotada",
    price: "Concluído",
    description:
      "Workshop prático no balcão da cafeteria com foco na textura perfeita da microespuma de leite e desenhos clássicos de coração e tulipas.",
    highlights: ["Prática individual no steamer", "Degustação de recepção"],
    image: "/images/institucional/dr-coffee-cappuccinos.png",
    imageAlt: "Cappuccino cremoso preparado durante o workshop",
    whatsappMessage: "Olá! Gostaria de entrar na fila de espera para o próximo workshop de Latte Art.",
  },
  {
    id: "sensorial-e-aromas-do-cafe",
    title: "Encontro Sensorial & Aromas do Café",
    tagline: "Treinamento de memória olfativa com o kit de aromas Le Nez du Café.",
    status: "Realizado",
    statusType: "completed",
    date: "10 de Maio de 2026",
    isoDate: "2026-05-10T14:30:00-03:00",
    time: "14:30 às 17:00",
    location: "Dr. Coffee Station, Resende/RJ",
    spots: "Turma lotada",
    price: "Concluído",
    description:
      "Exercícios práticos de percepção aromática (frutados, florais, achocolatados e amadeirados) seguidos de cupping cego de grãos brasileiros.",
    highlights: ["Uso do kit sensorial", "Cupping cego interativo"],
    image: "/images/cardapio/dr-coffee-sandwich.png",
    imageAlt: "Participantes analisando aromas de cafés especiais",
    whatsappMessage: "Olá! Gostaria de receber aviso sobre o próximo Encontro Sensorial.",
  },
];

export const workshopGallery: WorkshopGalleryItem[] = [
  {
    src: "/images/institucional/dr-coffee-cappuccinos.png",
    alt: "Vaporização e preparo de cappuccinos na Dr. Coffee Station",
    title: "Preparo & Técnica",
    caption: "Cremosidade e atenção aos detalhes durante as oficinas no balcão.",
  },
  {
    src: "/images/home/dr-coffee-hero.png",
    alt: "Extração de café especial no suporte de filtro",
    title: "Métodos Filtrados",
    caption: "Demonstração prática de moagem e tempo de extração.",
  },
  {
    src: "/images/institucional/dr-coffee-facade.png",
    alt: "Ambiente aconchegante da cafeteria Dr. Coffee Station",
    title: "Nosso Espaço",
    caption: "Estrutura confortável no Alpha Center para receber grupos e encontros.",
  },
  {
    src: "/images/cardapio/dr-coffee-toast.jpg",
    alt: "Toast artesanal servido para harmonização nos encontros",
    title: "Harmonização de Sabores",
    caption: "Acompanhamentos artesanais selecionados para valorizar a bebida.",
  },
  {
    src: "/images/cardapio/dr-coffee-iced-real.png",
    alt: "Bebida gelada preparada na cafeteria",
    title: "Receitas Geladas",
    caption: "Preparo de drinks e cafés refrescantes para dias quentes.",
  },
  {
    src: "/images/cardapio/dr-coffee-breakfast.jpg",
    alt: "Mesa posta com cafés e doces durante o workshop",
    title: "Momentos Compartilhados",
    caption: "Troca de conhecimentos e conversas ao redor do café.",
  },
];

export function buildWhatsAppWorkshopUrl(message: string): string {
  return `${siteConfig.whatsapp.url}&text=${encodeURIComponent(message)}`;
}
