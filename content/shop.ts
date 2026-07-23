export type ShopCategory = {
  id: "cafes" | "acessorios" | "canecas" | "kits" | "marca";
  label: string;
  description: string;
};

export type PlannedProduct = {
  name: string;
  category: ShopCategory["id"];
  description: string;
  visual: string;
  tone: "coffee" | "cream" | "camel" | "sage" | "ink";
};

export const shopCategories: ShopCategory[] = [
  {
    id: "cafes",
    label: "Cafés",
    description: "Grãos e edições da casa para preparar com calma.",
  },
  {
    id: "acessorios",
    label: "Acessórios",
    description: "Itens para tornar o ritual de preparo ainda mais especial.",
  },
  {
    id: "canecas",
    label: "Canecas",
    description: "Peças com a identidade da Dr. Coffee Station.",
  },
  {
    id: "kits",
    label: "Kits presenteáveis",
    description: "Combinações pensadas para presentear quem gosta de café.",
  },
  {
    id: "marca",
    label: "Produtos da marca",
    description: "Uma futura coleção para levar a experiência Dr. Coffee junto.",
  },
];

export const plannedProducts: PlannedProduct[] = [
  {
    name: "Café da casa",
    category: "cafes",
    description:
      "Conceito para uma futura seleção de grãos com a identidade Dr. Coffee.",
    visual: "01",
    tone: "coffee",
  },
  {
    name: "Edições especiais",
    category: "cafes",
    description:
      "Possibilidade de cafés sazonais para descobrir novos aromas e sabores.",
    visual: "02",
    tone: "camel",
  },
  {
    name: "Ritual de preparo",
    category: "acessorios",
    description:
      "Acessórios selecionados para métodos e momentos de café em casa.",
    visual: "03",
    tone: "sage",
  },
  {
    name: "Caneca Dr. Coffee",
    category: "canecas",
    description:
      "Conceito de caneca com a identidade visual da cafeteria.",
    visual: "Dr.",
    tone: "cream",
  },
  {
    name: "Kit para uma pausa",
    category: "kits",
    description:
      "Uma futura combinação de café e acessórios para criar um momento especial.",
    visual: "04",
    tone: "ink",
  },
  {
    name: "Kit para presentear",
    category: "kits",
    description:
      "Conceito de presente para celebrar encontros e pessoas queridas.",
    visual: "05",
    tone: "camel",
  },
  {
    name: "Coleção Dr. Coffee",
    category: "marca",
    description:
      "Produtos de marca a serem definidos para acompanhar diferentes pausas.",
    visual: "DC",
    tone: "coffee",
  },
];

