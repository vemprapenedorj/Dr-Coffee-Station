import type { Metadata } from "next";
import Link from "next/link";
import { plannedProducts, shopCategories } from "@/content/shop";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Loja",
  description:
    "Em breve, cafés, acessórios, canecas, kits presenteáveis e produtos da Dr. Coffee Station em uma vitrine feita para quem ama café.",
  alternates: { canonical: "/loja" },
  robots: { index: false, follow: true },
};

export default function LojaPage() {
  return (
    <main className="shop-page" id="conteudo">
      <section className="shop-hero">
        <div className="shop-hero__copy">
          <p className="eyebrow">LOJA DR. COFFEE</p>
          <h1>Em breve, leve a experiência Dr. Coffee para casa.</h1>
          <p>
            Uma vitrine está sendo preparada para reunir cafés, acessórios,
            canecas, presentes e produtos com a identidade da marca.
          </p>
          <a className="button button-dark" href="#vitrine">
            Conhecer a futura coleção
          </a>
        </div>
        <div className="shop-hero__visual" aria-hidden="true">
          <div className="shop-hero__seal">
            <span>Dr.</span>
            <p>coffee at home</p>
          </div>
          <div className="shop-hero__package shop-hero__package--back">
            <small>CAFÉ ESPECIAL</small>
            <strong>Dr.</strong>
          </div>
          <div className="shop-hero__package shop-hero__package--front">
            <small>UMA PAUSA EM CASA</small>
            <strong>Dr.</strong>
            <i>em breve</i>
          </div>
        </div>
      </section>

      <section className="shop-categories" aria-labelledby="categorias-title">
        <div className="shop-categories__heading">
          <p className="eyebrow">CATEGORIAS PLANEJADAS</p>
          <h2 id="categorias-title">Uma coleção para diferentes momentos.</h2>
        </div>
        <nav aria-label="Categorias da futura loja">
          {shopCategories.map((category, index) => (
            <a href={`#${category.id}`} key={category.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{category.label}</strong>
              <i aria-hidden="true">↓</i>
            </a>
          ))}
        </nav>
      </section>

      <section className="shop-catalog" id="vitrine">
        <div className="shop-catalog__intro">
          <p className="eyebrow">VITRINE EM CONSTRUÇÃO</p>
          <h2>Ideias para levar a pausa com você.</h2>
          <p>
            Os itens abaixo apresentam a direção da futura loja. Produtos,
            embalagens, preços e disponibilidade ainda serão definidos.
          </p>
        </div>

        {shopCategories.map((category) => {
          const products = plannedProducts.filter(
            (product) => product.category === category.id,
          );

          return (
            <section
              className="shop-category-section"
              id={category.id}
              key={category.id}
              aria-labelledby={`${category.id}-title`}
            >
              <div className="shop-category-section__heading">
                <h3 id={`${category.id}-title`}>{category.label}</h3>
                <p>{category.description}</p>
              </div>
              <div
                className={`shop-products${products.length === 1 ? " shop-products--single" : ""}`}
              >
                {products.map((product) => (
                  <article className="shop-product" key={product.name}>
                    <div
                      className={`shop-product__visual shop-product__visual--${product.tone}`}
                      aria-hidden="true"
                    >
                      <span>{product.visual}</span>
                      <i>Dr. Coffee Station</i>
                    </div>
                    <div className="shop-product__copy">
                      <span className="shop-product__status">Em breve</span>
                      <h4>{product.name}</h4>
                      <p>{product.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </section>

      <section className="shop-interest">
        <div>
          <p className="eyebrow">RECEBA AS NOVIDADES DA LOJA</p>
          <h2>Acompanhe o que está sendo preparado.</h2>
          <p>
            Como ainda não existe uma integração de cadastro, as novidades serão
            compartilhadas pelo perfil oficial da Dr. Coffee Station.
          </p>
        </div>
        <a
          className="button button-light"
          href={siteConfig.instagram.url}
          target="_blank"
          rel="noreferrer"
        >
          Acompanhar no Instagram
        </a>
      </section>

      <section className="shop-visit">
        <div>
          <p className="eyebrow">ENQUANTO A LOJA NÃO CHEGA</p>
          <h2>A experiência já espera por você em Resende.</h2>
        </div>
        <div className="shop-visit__actions">
          <Link className="button button-dark" href="/cardapio">
            Ver cardápio
          </Link>
          <Link className="button button-outline" href="/contato">
            Ver localização
          </Link>
        </div>
      </section>
    </main>
  );
}
