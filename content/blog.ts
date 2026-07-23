export const blogCategories = [
  "Café Especial",
  "Métodos de Preparo",
  "Novidades",
  "Gastronomia",
  "Experiências",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

type ArticleSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type BlogArticle = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: BlogCategory;
  publishedAt: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  sections: ArticleSection[];
};

export const blogArticles: BlogArticle[] = [
  {
    slug: "onde-tomar-cafe-especial-em-resende",
    title: "Onde tomar café especial em Resende",
    description:
      "Descubra o que observar ao escolher uma cafeteria para tomar café especial em Resende e conheça a proposta da Dr. Coffee Station.",
    excerpt:
      "Bons grãos, preparo cuidadoso e um ambiente gostoso ajudam a transformar uma xícara em uma pausa que vale a pena.",
    category: "Café Especial",
    publishedAt: "2026-07-23",
    readingTime: "4 min de leitura",
    image: "/images/home/dr-coffee-hero.png",
    imageAlt: "Cappuccino com latte art preparado em Resende",
    featured: true,
    sections: [
      {
        heading: "O que torna um café especial",
        paragraphs: [
          "A experiência começa antes da bebida chegar à mesa. A origem dos grãos, a seleção, a torra e o preparo influenciam aroma, doçura, acidez e equilíbrio. Em uma cafeteria, técnica e atenção ajudam a revelar essas características na xícara.",
          "Isso não significa que existe apenas uma forma certa de aproveitar. Espresso, filtrado, cappuccino ou uma receita gelada podem ser diferentes maneiras de descobrir o café especial.",
        ],
      },
      {
        heading: "Como escolher uma cafeteria em Resende",
        paragraphs: [
          "Além do tipo de café, vale observar se o cardápio combina com o momento que você procura. Algumas visitas pedem uma bebida rápida; outras combinam com café da manhã, sanduíches, doces e uma conversa mais longa.",
          "Um cardápio claro ajuda a conhecer as possibilidades antes da visita. Também é importante consultar endereço, canais oficiais e informações atualizadas diretamente com o estabelecimento.",
        ],
        list: [
          "Consulte as opções de café e métodos de preparo.",
          "Observe se há acompanhamentos para o seu tipo de pausa.",
          "Confirme endereço e informações atuais nos canais oficiais.",
          "Escolha um ambiente que combine com o momento.",
        ],
      },
      {
        heading: "Café especial no Alpha Center",
        paragraphs: [
          "A Dr. Coffee Station está na Av. Luiz Dias Martins, 73, no Alpha Center, em Resende. A proposta reúne cafés, cappuccinos, bebidas geladas, sanduíches e doces em uma experiência feita para aproveitar com calma.",
          "Antes de visitar, você pode consultar o cardápio digital e acompanhar as novidades pelo Instagram @dr.coffeestation.",
        ],
      },
    ],
  },
  {
    slug: "cappuccino-cremoso-o-que-faz-a-diferenca",
    title: "Cappuccino: o que torna uma xícara realmente cremosa",
    description:
      "Entenda como espresso, leite vaporizado, textura e equilíbrio contribuem para um cappuccino cremoso e agradável.",
    excerpt:
      "A cremosidade não depende apenas da quantidade de espuma: temperatura, textura do leite e equilíbrio com o espresso fazem diferença.",
    category: "Café Especial",
    publishedAt: "2026-07-23",
    readingTime: "4 min de leitura",
    image: "/images/cardapio/dr-coffee-cappuccino-real.png",
    imageAlt: "Cappuccino cremoso preparado na Dr. Coffee Station",
    sections: [
      {
        heading: "Cremosidade é textura, não excesso de espuma",
        paragraphs: [
          "Um cappuccino agradável costuma ter leite vaporizado com textura uniforme e pequenas bolhas. Essa microespuma se mistura ao espresso e cria uma sensação cremosa, em vez de formar uma camada seca e separada sobre a bebida.",
          "A temperatura também importa. Quando o leite é aquecido com atenção, sua doçura natural fica mais perceptível e a bebida preserva uma textura confortável.",
        ],
      },
      {
        heading: "O espresso continua sendo protagonista",
        paragraphs: [
          "O leite não deve apagar completamente o café. Um espresso equilibrado oferece aroma e intensidade suficientes para conversar com a cremosidade do leite.",
          "A proporção entre os elementos muda conforme a receita. Por isso, cappuccinos tradicionais, italianos, versões vegetais e combinações com chocolate podem apresentar experiências distintas.",
        ],
        list: [
          "Espresso bem extraído e aromático.",
          "Leite vaporizado com microespuma uniforme.",
          "Temperatura agradável para beber.",
          "Equilíbrio entre doçura, café e textura.",
        ],
      },
      {
        heading: "Qual cappuccino escolher",
        paragraphs: [
          "Quem busca presença maior de café pode preferir receitas mais clássicas. Para uma pausa doce e reconfortante, combinações com cacau ou chocolate oferecem outro caminho. Bebidas vegetais também criam texturas e sabores próprios.",
          "O melhor cappuccino é aquele que combina com o seu momento. No cardápio da Dr. Coffee Station, você pode comparar as opções antes de escolher.",
        ],
      },
    ],
  },
  {
    slug: "cafe-da-manha-em-resende-para-aproveitar-a-dois",
    title: "Café da manhã em Resende: uma pausa para aproveitar a dois",
    description:
      "Ideias para escolher um café da manhã em Resende e transformar a primeira refeição do dia em um momento para compartilhar.",
    excerpt:
      "Café, pães, acompanhamentos e tempo para conversar: um café da manhã a dois pode ser simples e ainda assim especial.",
    category: "Experiências",
    publishedAt: "2026-07-23",
    readingTime: "5 min de leitura",
    image: "/images/cardapio/dr-coffee-breakfast.jpg",
    imageAlt: "Mesa de café da manhã com café e acompanhamentos",
    sections: [
      {
        heading: "Começar o dia sem pressa",
        paragraphs: [
          "Tomar café da manhã fora de casa pode ser uma forma de mudar o ritmo. Em vez de apenas cumprir uma refeição, o momento ganha espaço para conversar, experimentar sabores e começar o dia com mais calma.",
          "Para aproveitar a dois, vale escolher opções que possam ser combinadas ou compartilhadas, respeitando o que cada pessoa gosta de beber e comer.",
        ],
      },
      {
        heading: "Como montar uma boa combinação",
        paragraphs: [
          "Uma bebida quente pode acompanhar pães, toasts, bolos e opções salgadas. Em dias quentes, cafés gelados e outras bebidas refrescantes também podem fazer parte da mesa.",
          "O equilíbrio depende mais do momento do que de uma regra. Uma combinação leve pode funcionar em um dia corrido, enquanto uma seleção mais completa combina com manhãs livres.",
        ],
        list: [
          "Escolha uma bebida para cada pessoa.",
          "Combine uma opção salgada e uma opção doce.",
          "Considere itens para compartilhar.",
          "Consulte o cardápio e a disponibilidade antes da visita.",
        ],
      },
      {
        heading: "Uma opção no Alpha Center",
        paragraphs: [
          "A Dr. Coffee Station fica no Alpha Center, em Resende, e seu cardápio reúne cafés, cappuccinos, pães, sanduíches, bolos e outras opções para diferentes pausas.",
          "Os itens podem sofrer alterações de disponibilidade. Consulte o cardápio digital e os canais oficiais para conhecer as opções atuais.",
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return blogArticles.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: BlogArticle, limit = 2) {
  return [...blogArticles]
    .filter((candidate) => candidate.slug !== article.slug)
    .sort((a, b) =>
      a.category === article.category && b.category !== article.category ? -1 : 1,
    )
    .slice(0, limit);
}

