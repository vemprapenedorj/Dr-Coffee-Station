import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a proposta da Dr. Coffee Station: café especial, acolhimento e boas pausas no Alpha Center, em Resende.",
  alternates: { canonical: "/sobre" },
};

const values = [
  {
    number: "01",
    title: "Cuidado",
    description:
      "Cada detalhe da experiência é pensado para que a pausa seja leve, acolhedora e cheia de sabor.",
  },
  {
    number: "02",
    title: "Qualidade",
    description:
      "Bons grãos, preparo atento e escolhas que valorizam o café servido em cada xícara.",
  },
  {
    number: "03",
    title: "Encontro",
    description:
      "Um café pode acompanhar conversas, começos de manhã e momentos que merecem um pouco mais de tempo.",
  },
];

export default function SobrePage() {
  return (
    <main className="about-page" id="conteudo">
      <section className="about-hero">
        <div className="about-hero__copy">
          <p className="eyebrow">SOBRE A DR. COFFEE STATION</p>
          <h1>Um café para acolher bons momentos.</h1>
          <p>
            A Dr. Coffee Station nasce do carinho pelo café bem preparado e pela
            experiência que existe ao redor de cada xícara.
          </p>
        </div>
        <div className="about-hero__image">
          <div className="about-hero__image-panel">
            <Image
              src="/images/institucional/dr-coffee-cappuccinos.png"
              alt="Dois cappuccinos preparados na Dr. Coffee Station"
              fill
              sizes="(max-width: 850px) calc(100vw - 40px), 52vw"
              style={{ objectPosition: "center 48%" }}
              priority
            />
          </div>
          <div className="about-hero__image-panel">
            <Image
              src="/images/cardapio/dr-coffee-cappuccino-real.png"
              alt="Cappuccino cremoso servido na Dr. Coffee Station"
              fill
              sizes="(max-width: 850px) calc(100vw - 40px), 52vw"
              style={{ objectPosition: "center 54%" }}
            />
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="about-story__heading">
          <p className="eyebrow">NOSSA ESSÊNCIA</p>
          <h2>Café, pausa e encontro.</h2>
        </div>
        <div className="about-story__copy">
          <p>
            Mais do que escolher uma bebida, visitar uma cafeteria também é
            escolher como viver aquele momento. Pode ser o café da manhã em
            Resende, uma conversa tranquila, um intervalo no meio do dia ou a
            vontade de provar algo novo.
          </p>
          <p>
            Na Dr. Coffee Station, o café especial encontra receitas preparadas
            com cuidado e um ambiente que convida a aproveitar sem pressa. É essa
            combinação que queremos colocar em cada visita.
          </p>
          <p>
            Estamos no Alpha Center, em Resende, construindo uma experiência
            próxima, saborosa e com personalidade própria.
          </p>
        </div>
      </section>

      <section className="about-values" aria-labelledby="valores-title">
        <div className="about-values__intro">
          <p className="eyebrow">O QUE NOS MOVE</p>
          <h2 id="valores-title">O essencial está nos detalhes.</h2>
        </div>
        <div className="about-values__grid">
          {values.map((value) => (
            <article key={value.number}>
              <span>{value.number}</span>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-visual">
        <div className="about-visual__image">
          <Image
            src="/images/institucional/dr-coffee-facade.png"
            alt="Fachada da Dr. Coffee Station no Alpha Center"
            fill
            sizes="(max-width: 850px) 100vw, 58vw"
          />
        </div>
        <div className="about-visual__quote">
          <span aria-hidden="true">“</span>
          <blockquote>
            Todo dia é uma boa oportunidade para tomar um café bem feito.
          </blockquote>
          <p>Dr. Coffee Station</p>
        </div>
      </section>

      <section className="institutional-cta">
        <p className="eyebrow">VIVA A EXPERIÊNCIA</p>
        <h2>Escolha o sabor da sua próxima pausa.</h2>
        <div>
          <Link className="button button-light" href="/cardapio">
            Ver cardápio
          </Link>
          <Link className="button outline-light" href="/contato">
            Planejar uma visita
          </Link>
        </div>
      </section>
    </main>
  );
}
