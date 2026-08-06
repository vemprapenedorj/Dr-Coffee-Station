import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { blogArticles, blogCategories } from "@/content/blog";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conteúdos da Dr. Coffee Station sobre café especial, métodos de preparo, gastronomia, novidades e experiências em Resende.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/blog",
    siteName: siteConfig.name,
    title: "Blog da Dr. Coffee Station",
    description:
      "Conteúdos sobre café especial, métodos de preparo, gastronomia e experiências em Resende.",
    images: [
      {
        url: "/images/home/dr-coffee-hero.png",
        width: 1536,
        height: 1024,
        alt: "Café especial na Dr. Coffee Station",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog da Dr. Coffee Station",
    description:
      "Conteúdos sobre café especial, métodos de preparo e gastronomia em Resende.",
    images: ["/images/home/dr-coffee-hero.png"],
  },
};

export default function BlogPage() {
  const featured = blogArticles.find((article) => article.featured) ?? blogArticles[0];
  const remaining = blogArticles.filter(
    (article) => article.slug !== featured.slug,
  );

  return (
    <main className="blog-page" id="conteudo">
      <section className="blog-hero">
        <p className="eyebrow">BLOG DR. COFFEE</p>
        <h1>Histórias, sabores e boas pausas.</h1>
        <p>
          Conteúdos para descobrir o café especial, escolher novos sabores e
          aproveitar melhor cada momento em Resende.
        </p>
      </section>

      <nav className="blog-categories" aria-label="Categorias do Blog">
        {blogCategories.map((category, index) => (
          <span key={category}>
            <i>{String(index + 1).padStart(2, "0")}</i>
            {category}
          </span>
        ))}
      </nav>

      <section className="blog-featured" aria-labelledby="destaque-title">
        <p className="eyebrow" id="destaque-title">
          LEITURA EM DESTAQUE
        </p>
        <ArticleCard article={featured} featured />
      </section>

      <section className="blog-latest" aria-labelledby="recentes-title">
        <div className="blog-latest__heading">
          <p className="eyebrow">CONTEÚDOS RECENTES</p>
          <h2 id="recentes-title">Para ler com um café por perto.</h2>
        </div>
        <div className="article-grid">
          {remaining.map((article) => (
            <ArticleCard article={article} key={article.slug} />
          ))}
        </div>
      </section>

      <section className="blog-pillars" aria-labelledby="pilares-title">
        <div>
          <p className="eyebrow">PRÓXIMOS ASSUNTOS</p>
          <h2 id="pilares-title">Um espaço editorial em construção contínua.</h2>
        </div>
        <div className="blog-pillars__list">
          {blogCategories.map((category, index) => (
            <article key={category}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{category}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="institutional-cta">
        <p className="eyebrow">DA LEITURA PARA A XÍCARA</p>
        <h2>Escolha o sabor da sua próxima pausa.</h2>
        <div>
          <Link className="button button-light" href="/cardapio">
            Ver cardápio
          </Link>
          <a className="button outline-light" href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">
            Visitar a Dr. Coffee
          </a>
        </div>
      </section>
    </main>
  );
}
