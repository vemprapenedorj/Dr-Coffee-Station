import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "Dr. Coffee Station | Café especial em Resende" },
  description:
    "Cafeteria no Alpha Center, em Resende, com cafés especiais, cappuccinos, bebidas geladas, sanduíches, doces e opções para o café da manhã.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: siteConfig.name,
    title: "Dr. Coffee Station | Café especial em Resende",
    description:
      "Cafeteria no Alpha Center, em Resende, com cafés especiais, cappuccinos, bebidas geladas, sanduíches, doces e opções para o café da manhã.",
    images: [
      {
        url: "/images/home/dr-coffee-hero.png",
        width: 1536,
        height: 1024,
        alt: "Café especial preparado na Dr. Coffee Station",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Coffee Station | Café especial em Resende",
    description:
      "Cafeteria no Alpha Center, em Resende, com cafés especiais e boas pausas.",
    images: ["/images/home/dr-coffee-hero.png"],
  },
};

const highlights = [
  {
    icon: "◌",
    title: "Grãos especiais",
    text: "Cafés escolhidos para uma xícara memorável.",
  },
  {
    icon: "⌇",
    title: "Preparo cuidadoso",
    text: "Tempo, técnica e atenção em cada pedido.",
  },
  {
    icon: "✦",
    title: "Pausa e encontro",
    text: "Um ambiente feito para aproveitar sem pressa.",
  },
];

const productHighlights = [
  {
    title: "Cafés",
    description: "Espresso, filtrados e receitas preparadas com bons grãos.",
    image: "/images/brand/dr-coffee-cup-logo.png",
    imageAlt: "Xícara da Dr. Coffee Station",
    className: "product-card--coffee",
  },
  {
    title: "Cappuccinos",
    description: "Clássicos cremosos e combinações especiais da casa.",
    image: "/images/cardapio/dr-coffee-cappuccino-real.png",
    imageAlt: "Cappuccino cremoso da Dr. Coffee Station",
  },
  {
    title: "Bebidas geladas",
    description: "Cafés refrescantes para aproveitar os dias mais quentes.",
    image: "/images/cardapio/dr-coffee-iced-real.png",
    imageAlt: "Café gelado servido na Dr. Coffee Station",
  },
  {
    title: "Sanduíches",
    description: "Pães artesanais e combinações para uma pausa mais saborosa.",
    image: "/images/cardapio/dr-coffee-sandwich.png",
    imageAlt: "Sanduíche artesanal da Dr. Coffee Station",
  },
  {
    title: "Doces",
    description: "Bolos e sobremesas para acompanhar o café.",
    image: "/images/cardapio/dr-coffee-breakfast.jpg",
    imageAlt: "Café da manhã com bolo e café na Dr. Coffee Station",
  },
];

export default function Home() {
  return (
    <main id="conteudo">
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">CAFETERIA NO ALPHA CENTER</p>
          <h1>
            Café especial,
            <br />
            bons encontros.
          </h1>
          <div className="ornament" aria-hidden="true">
            <i />✦<i />
          </div>
          <p className="intro">
            Sabores para aproveitar com calma
            <br className="desktop-break" /> em Resende.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/cardapio">
              Ver cardápio
            </Link>
            <a className="button button-outline" href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">
              Como chegar <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="hero-image-wrap">
          <Image
            className="hero-image"
            src="/images/home/dr-coffee-hero.png"
            alt="Cappuccino com latte art preparado na Dr. Coffee Station"
            width={1200}
            height={1200}
            sizes="(max-width: 850px) calc(100vw - 40px), 54vw"
            priority
            fetchPriority="high"
          />
        </div>
      </section>

      <section className="highlights" aria-label="Diferenciais da cafeteria">
        {highlights.map((item) => (
          <article key={item.title}>
            <span className="highlight-icon" aria-hidden="true">
              {item.icon}
            </span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="home-intro">
        <p className="eyebrow">DR. COFFEE STATION</p>
        <div className="home-intro__content">
          <h2>Uma pausa para chamar de sua.</h2>
          <div>
            <p>
              A Dr. Coffee Station é uma cafeteria em Resende para quem aprecia
              café especial, sabores bem preparados e momentos que pedem um pouco
              mais de calma.
            </p>
            <p>
              Entre cappuccinos, cafés gelados, sanduíches e doces, cada escolha
              pode acompanhar uma conversa, um encontro ou um café da manhã no
              Alpha Center.
            </p>
          </div>
        </div>
      </section>

      <section className="product-showcase" aria-labelledby="sabores-title">
        <div className="product-showcase__heading">
          <div>
            <p className="eyebrow">SABORES PARA APROVEITAR</p>
            <h2 id="sabores-title">Escolha a sua pausa.</h2>
          </div>
          <Link className="text-link" href="/cardapio">
            Conhecer todos os sabores <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="product-grid">
          {productHighlights.map((product, index) => (
            <article
              className={`product-card ${product.className ?? ""}`}
              key={product.title}
            >
              <div className="product-card__image">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  width={760}
                  height={760}
                  sizes="(max-width: 620px) calc(100vw - 40px), (max-width: 980px) 50vw, 33vw"
                />
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="product-card__copy">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="menu-feature">
        <div className="menu-feature__image">
          <Image
            src="/images/cardapio/dr-coffee-menu-cover.png"
            alt="Capa do cardápio digital da Dr. Coffee Station"
            width={1000}
            height={1200}
            sizes="(max-width: 850px) calc(100vw - 40px), 48vw"
          />
        </div>
        <div className="menu-feature__copy">
          <p className="eyebrow">CARDÁPIO DIGITAL</p>
          <h2>Seu próximo favorito pode estar aqui.</h2>
          <p>
            Consulte cafés especiais, cappuccinos, bebidas geladas, sanduíches,
            doces e as opções disponíveis para começar o dia.
          </p>
          <Link className="button button-light" href="/cardapio">
            Abrir cardápio completo
          </Link>
        </div>
      </section>

      <section className="experience-section">
        <div className="experience-section__copy">
          <p className="eyebrow">WORKSHOPS & ENCONTROS</p>
          <h2>Aprenda, deguste e vivencie o café.</h2>
          <p>
            Promovemos workshops práticos, degustações guiadas e eventos
            exclusivos para quem deseja explorar o universo dos cafés especiais.
          </p>
          <div className="experience-section__links">
            <Link className="text-link" href="/workshop">
              Conhecer workshops <span aria-hidden="true">→</span>
            </Link>
            <a
              className="text-link"
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noreferrer"
            >
              Ver no Instagram <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="experience-gallery">
          <div className="experience-gallery__main">
            <Image
              src="/images/institucional/dr-coffee-facade.png"
              alt="Fachada da Dr. Coffee Station no Alpha Center, em Resende"
              width={1200}
              height={900}
              sizes="(max-width: 850px) calc(100vw - 40px), 46vw"
            />
          </div>
          <div className="experience-gallery__detail">
            <Image
              src="/images/cardapio/dr-coffee-toast.jpg"
              alt="Toast artesanal servido na Dr. Coffee Station"
              width={700}
              height={700}
              sizes="(max-width: 620px) 45vw, 22vw"
            />
          </div>
        </div>
      </section>

      <section className="location-section">
        <div className="location-section__map" aria-hidden="true">
          <span>Resende</span>
          <i />
          <strong>Dr.</strong>
          <p>Alpha Center</p>
        </div>
        <div className="location-section__copy">
          <p className="eyebrow">CAFÉ ESPECIAL EM RESENDE</p>
          <h2>Sua pausa favorita no Alpha Center.</h2>
          <address>
            {siteConfig.address.street}
            <br />
            {siteConfig.address.neighborhood} — {siteConfig.address.city},{" "}
            {siteConfig.address.region}
          </address>
          <p>Abra a localização oficial no Google Maps e trace sua rota até a cafeteria.</p>
          <a className="button button-dark" href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">
            Abrir no Google Maps
          </a>
        </div>
      </section>

      <section className="home-final-cta">
        <p className="eyebrow">CAFÉ, PAUSA E ENCONTRO</p>
        <h2>Venha viver a sua pausa favorita.</h2>
        <p>Café especial e bons sabores esperam por você em Resende.</p>
        <div className="home-final-cta__actions">
          <Link className="button button-light" href="/cardapio">
            Escolher no cardápio
          </Link>
          <a
            className="button outline-light"
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noreferrer"
          >
            Acompanhar no Instagram
          </a>
        </div>
      </section>
    </main>
  );
}
