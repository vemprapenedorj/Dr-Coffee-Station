import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Conheça a experiência atual e as possibilidades futuras de encomendas, eventos e café corporativo da Dr. Coffee Station em Resende.",
  alternates: { canonical: "/servicos" },
};

const services = [
  {
    number: "01",
    status: "Na cafeteria",
    title: "Sua pausa no Alpha Center",
    description:
      "Cafés especiais, cappuccinos, bebidas geladas, sanduíches e doces para aproveitar na Dr. Coffee Station.",
    action: "Ver cardápio",
    href: "/cardapio",
    available: true,
  },
  {
    number: "02",
    status: "Em planejamento",
    title: "Encomendas",
    description:
      "Uma futura frente para pedidos especiais, presentes e sabores da cafeteria em ocasiões que pedem praticidade.",
    available: false,
  },
  {
    number: "03",
    status: "Em planejamento",
    title: "Eventos e café corporativo",
    description:
      "Uma estrutura preparada para receber propostas de eventos e soluções de café para empresas quando o serviço for definido.",
    available: false,
  },
];

export default function ServicosPage() {
  return (
    <main className="services-page" id="conteudo">
      <section className="services-hero">
        <div>
          <p className="eyebrow">SERVIÇOS E POSSIBILIDADES</p>
          <h1>Experiências que podem ir além da xícara.</h1>
          <p>
            A cafeteria já recebe quem busca café especial e bons sabores em
            Resende. Novos formatos serão apresentados somente quando estiverem
            oficialmente disponíveis.
          </p>
        </div>
        <div className="services-hero__image">
          <Image
            src="/images/cardapio/dr-coffee-breakfast.jpg"
            alt="Café da manhã servido na Dr. Coffee Station"
            width={1200}
            height={900}
            sizes="(max-width: 850px) calc(100vw - 40px), 45vw"
            priority
          />
        </div>
      </section>

      <section className="services-list" aria-labelledby="services-title">
        <div className="services-list__heading">
          <p className="eyebrow">COMO PODEMOS FAZER PARTE</p>
          <h2 id="services-title">Do café de hoje às ideias de amanhã.</h2>
        </div>
        <div className="service-cards">
          {services.map((service) => (
            <article
              className={`service-card${service.available ? " service-card--available" : ""}`}
              key={service.number}
            >
              <div className="service-card__top">
                <span>{service.number}</span>
                <em>{service.status}</em>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              {service.href && (
                <Link href={service.href}>
                  {service.action} <span aria-hidden="true">→</span>
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="services-note">
        <div>
          <p className="eyebrow">TRANSPARÊNCIA EM PRIMEIRO LUGAR</p>
          <h2>Novidades serão divulgadas pelos canais oficiais.</h2>
        </div>
        <p>
          Encomendas, eventos e café corporativo ainda não são apresentados como
          serviços disponíveis. Quando houver formatos, condições e atendimento
          definidos, esta página será atualizada.
        </p>
      </section>

      <section className="institutional-cta">
        <p className="eyebrow">ENQUANTO ISSO</p>
        <h2>Venha aproveitar a experiência na cafeteria.</h2>
        <div>
          <Link className="button button-light" href="/cardapio">
            Escolher no cardápio
          </Link>
          <Link className="button outline-light" href="/contato">
            Ver localização
          </Link>
        </div>
      </section>
    </main>
  );
}
