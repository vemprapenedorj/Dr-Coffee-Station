import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { JsonLd } from "@/components/StructuredData";
import {
  blogArticles,
  getArticleBySlug,
  getRelatedArticles,
} from "@/content/blog";
import { siteConfig } from "@/content/site";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Artigo não encontrado" };
  }

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `/blog/${article.slug}`,
      siteName: siteConfig.name,
      locale: "pt_BR",
      images: [{ url: article.image, alt: article.imageAlt }],
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const related = getRelatedArticles(article);
  const publishedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${article.publishedAt}T00:00:00Z`));

  return (
    <main className="article-page" id="conteudo">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          description: article.description,
          image: `${siteConfig.url}${article.image}`,
          datePublished: article.publishedAt,
          dateModified: article.publishedAt,
          inLanguage: "pt-BR",
          mainEntityOfPage: `${siteConfig.url}/blog/${article.slug}`,
          author: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
          },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: {
              "@type": "ImageObject",
              url: `${siteConfig.url}/images/brand/dr-coffee-logo-transparent.png`,
            },
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Início",
              item: siteConfig.url,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: `${siteConfig.url}/blog`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: article.title,
              item: `${siteConfig.url}/blog/${article.slug}`,
            },
          ],
        }}
      />
      <article>
        <header className="article-hero">
          <Link href="/blog" className="article-back">
            ← Voltar ao Blog
          </Link>
          <div className="article-hero__meta">
            <span>{article.category}</span>
            <span>{article.readingTime}</span>
          </div>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
          <time dateTime={article.publishedAt}>Publicado em {publishedDate}</time>
        </header>

        <div className="article-cover">
          <Image
            src={article.image}
            alt={article.imageAlt}
            width={1500}
            height={950}
            sizes="(max-width: 850px) 100vw, 1250px"
            priority
          />
        </div>

        <div className="article-layout">
          <aside>
            <p>Dr. Coffee Station</p>
            <span>Café, pausa e encontro em Resende.</span>
          </aside>
          <div className="article-content">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </article>

      <section className="article-related" aria-labelledby="relacionados-title">
        <div className="article-related__heading">
          <p className="eyebrow">CONTINUE A PAUSA</p>
          <h2 id="relacionados-title">Artigos relacionados</h2>
        </div>
        <div className="article-grid">
          {related.map((relatedArticle) => (
            <ArticleCard article={relatedArticle} key={relatedArticle.slug} />
          ))}
        </div>
      </section>

      <section className="institutional-cta">
        <p className="eyebrow">VIVA A EXPERIÊNCIA</p>
        <h2>Do conteúdo para o café.</h2>
        <div>
          <Link className="button button-light" href="/cardapio">
            Abrir cardápio
          </Link>
          <a className="button outline-light" href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">
            Ver localização
          </a>
        </div>
      </section>
    </main>
  );
}
