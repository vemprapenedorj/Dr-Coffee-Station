import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Experiências",
  description:
    "Conheça o ambiente, os cafés, os sabores e as experiências da Dr. Coffee Station no Alpha Center, em Resende.",
  alternates: { canonical: "/experiencias" },
};

const moments = [
  {
    number: "01",
    title: "Uma pausa para o café",
    description:
      "Espresso, filtrados, cappuccinos e receitas para escolher de acordo com o momento.",
  },
  {
    number: "02",
    title: "Sabores para compartilhar",
    description:
      "Sanduíches, toasts, bolos e acompanhamentos para uma conversa ou um café da manhã em Resende.",
  },
  {
    number: "03",
    title: "Encontros sem pressa",
    description:
      "Um espaço no Alpha Center para aproveitar a bebida, a companhia e o tempo com mais calma.",
  },
];

export default function ExperienciasPage() {
  return (
    <main className="experiences-page" id="conteudo">
      <section className="experiences-hero">
        <div className="experiences-hero__copy">
          <p className="eyebrow">A EXPERIÊNCIA DR. COFFEE</p>
          <h1>Momentos para aproveitar com calma.</h1>
          <p>
            Café especial, sabores para acompanhar e um ambiente feito para
            encontros no Alpha Center, em Resende.
          </p>
          <div>
            <Link className="button button-dark" href="/cardapio">
              Escolher no cardápio
            </Link>
            <Link className="button button-outline" href="/contato">
              Ver localização
            </Link>
          </div>
        </div>
        <div className="experiences-hero__image">
          <Image
            src="/images/institucional/dr-coffee-facade.png"
            alt="Fachada da Dr. Coffee Station no Alpha Center, em Resende"
            width={1200}
            height={1500}
            sizes="(max-width: 850px) calc(100vw - 40px), 46vw"
            priority
          />
        </div>
      </section>

      <section className="experiences-intro">
        <div>
          <p className="eyebrow">CAFÉ, PAUSA E ENCONTRO</p>
          <h2>A experiência acontece ao redor da mesa.</h2>
        </div>
        <div>
          <p>
            Algumas visitas começam pela vontade de tomar um café. Outras, por um
            encontro, uma manhã mais tranquila ou a escolha de um sabor novo.
          </p>
          <p>
            A Dr. Coffee Station reúne essas possibilidades em uma cafeteria no
            Alpha Center, com bebidas quentes e geladas, opções salgadas e doces
            para diferentes tipos de pausa.
          </p>
        </div>
      </section>

      <section className="experiences-moments" aria-labelledby="momentos-title">
        <div className="experiences-moments__heading">
          <p className="eyebrow">ESCOLHA O SEU MOMENTO</p>
          <h2 id="momentos-title">Cada pausa pode ter um sabor.</h2>
        </div>
        <div className="experiences-moments__grid">
          {moments.map((moment) => (
            <article key={moment.number}>
              <span>{moment.number}</span>
              <h3>{moment.title}</h3>
              <p>{moment.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="experiences-gallery" aria-label="Sabores da Dr. Coffee Station">
        <figure className="experiences-gallery__large">
          <Image
            src="/images/institucional/dr-coffee-cappuccinos.png"
            alt="Cappuccinos preparados na Dr. Coffee Station"
            width={1400}
            height={900}
            sizes="(max-width: 850px) 100vw, 58vw"
          />
        </figure>
        <div className="experiences-gallery__stack">
          <figure>
            <Image
              src="/images/cardapio/dr-coffee-sandwich.png"
              alt="Sanduíche artesanal servido na Dr. Coffee Station"
              width={900}
              height={900}
              sizes="(max-width: 850px) 100vw, 42vw"
            />
          </figure>
          <figure>
            <Image
              src="/images/cardapio/dr-coffee-iced-real.png"
              alt="Bebida gelada da Dr. Coffee Station"
              width={900}
              height={900}
              sizes="(max-width: 850px) 100vw, 42vw"
            />
          </figure>
        </div>
      </section>

      <section className="experiences-instagram">
        <div>
          <p className="eyebrow">ACOMPANHE OS MOMENTOS</p>
          <h2>Novidades e sabores no Instagram.</h2>
          <p>
            Veja conteúdos da cafeteria e acompanhe o perfil oficial{" "}
            {siteConfig.instagram.handle}.
          </p>
        </div>
        <a
          className="button button-light"
          href={siteConfig.instagram.url}
          target="_blank"
          rel="noreferrer"
        >
          Abrir Instagram
        </a>
      </section>

      <section className="institutional-cta">
        <p className="eyebrow">SUA PRÓXIMA PAUSA</p>
        <h2>Venha viver a experiência Dr. Coffee.</h2>
        <div>
          <Link className="button button-light" href="/cardapio">
            Ver cardápio
          </Link>
          <Link className="button outline-light" href="/contato">
            Como chegar
          </Link>
        </div>
      </section>
    </main>
  );
}
