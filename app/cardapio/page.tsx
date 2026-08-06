import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/content/site";
import CardapioBook from "./CardapioBook";

export const metadata: Metadata = {
  title: "Cardápio",
  description:
    "Conheça o cardápio da Dr. Coffee Station: cafés especiais, bebidas geladas e acompanhamentos preparados com calma.",
  alternates: { canonical: "/cardapio" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/cardapio",
    siteName: siteConfig.name,
    title: "Cardápio da Dr. Coffee Station",
    description:
      "Conheça cafés especiais, bebidas geladas, sanduíches, doces e acompanhamentos.",
    images: [
      {
        url: "/images/cardapio/dr-coffee-menu-cover.png",
        width: 1080,
        height: 1080,
        alt: "Cardápio digital da Dr. Coffee Station",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cardápio da Dr. Coffee Station",
    description:
      "Cafés especiais, bebidas geladas, sanduíches, doces e acompanhamentos.",
    images: ["/images/cardapio/dr-coffee-menu-cover.png"],
  },
};

export default function CardapioPage() {
  return (
    <main className="menu-page" id="conteudo">
      <section className="menu-hero">
        <div className="menu-hero-copy">
          <p className="eyebrow">CARDÁPIO DIGITAL</p>
          <h1>
            Cardápio
            <br />
            Dr. Coffee
          </h1>
          <div className="ornament" aria-hidden="true">
            <i />✦<i />
          </div>
          <p>Uma pausa feita com calma, sabor e bons grãos.</p>
          <a className="button button-dark" href="#revista">
            Abrir cardápio <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="menu-hero-image">
          <span className="hero-leaf leaf-a" aria-hidden="true">
            ❧
          </span>
          <Image
            src="/images/home/dr-coffee-hero.png"
            alt="Café especial preparado na Dr. Coffee Station"
            width={1000}
            height={1000}
            sizes="(max-width: 850px) calc(100vw - 40px), 55vw"
            priority
            fetchPriority="high"
          />
          <span className="hero-leaf leaf-b" aria-hidden="true">
            ✦
          </span>
        </div>
      </section>

      <CardapioBook />
    </main>
  );
}
