import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "@/content/blog";

type ArticleCardProps = {
  article: BlogArticle;
  featured?: boolean;
};

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <article className={`article-card${featured ? " article-card--featured" : ""}`}>
      <Link
        className="article-card__image"
        href={`/blog/${article.slug}`}
        aria-label={`Ler: ${article.title}`}
      >
        <Image
          src={article.image}
          alt={article.imageAlt}
          width={1200}
          height={800}
          sizes={
            featured
              ? "(max-width: 850px) calc(100vw - 40px), 58vw"
              : "(max-width: 680px) calc(100vw - 40px), 33vw"
          }
        />
      </Link>
      <div className="article-card__copy">
        <div className="article-card__meta">
          <span>{article.category}</span>
          <span>{article.readingTime}</span>
        </div>
        <h2>
          <Link href={`/blog/${article.slug}`}>{article.title}</Link>
        </h2>
        <p>{article.excerpt}</p>
        <Link className="article-card__link" href={`/blog/${article.slug}`}>
          Ler artigo <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

