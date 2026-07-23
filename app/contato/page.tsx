import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Contato e localização",
  description:
    "Encontre a Dr. Coffee Station na Av. Luiz Dias Martins, 73, Alpha Center, em Resende, e acompanhe as novidades pelo Instagram.",
  alternates: { canonical: "/contato" },
};

const pendingDetails = [
  {
    title: "WhatsApp",
    description: "Número oficial aguardando confirmação.",
  },
  {
    title: "Horários",
    description: "Dias e horários de atendimento aguardando confirmação.",
  },
  {
    title: "Google Maps",
    description: "Link e mapa oficial aguardando confirmação.",
  },
];

export default function ContatoPage() {
  return (
    <main className="contact-page-new" id="conteudo">
      <section className="contact-hero">
        <div className="contact-hero__copy">
          <p className="eyebrow">CONTATO E LOCALIZAÇÃO</p>
          <h1>Venha viver a sua pausa favorita.</h1>
          <p>
            A Dr. Coffee Station está no Alpha Center, em Resende. Para novidades
            e conteúdos da cafeteria, acompanhe o perfil oficial no Instagram.
          </p>
          <div className="contact-hero__actions">
            <a
              className="button button-dark"
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noreferrer"
            >
              Abrir Instagram
            </a>
            <Link className="button button-outline" href="/cardapio">
              Ver cardápio
            </Link>
          </div>
        </div>
        <div className="contact-location-card">
          <p className="eyebrow">ONDE ESTAMOS</p>
          <address>
            <strong>{siteConfig.address.street}</strong>
            <span>{siteConfig.address.neighborhood}</span>
            <span>
              {siteConfig.address.city}, {siteConfig.address.region}
            </span>
          </address>
          <div className="contact-location-card__marker" aria-hidden="true">
            <i />
            <span>Dr.</span>
          </div>
        </div>
      </section>

      <section className="contact-channels">
        <div className="contact-channels__confirmed">
          <p className="eyebrow">CANAL CONFIRMADO</p>
          <h2>Instagram</h2>
          <p>
            Acompanhe cafés, sabores, novidades e momentos da Dr. Coffee Station.
          </p>
          <a href={siteConfig.instagram.url} target="_blank" rel="noreferrer">
            {siteConfig.instagram.handle} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="contact-channels__pending">
          {pendingDetails.map((detail, index) => (
            <article key={detail.title}>
              <span>0{index + 1}</span>
              <div>
                <h3>{detail.title}</h3>
                <p>{detail.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-map-placeholder">
        <div className="contact-map-placeholder__visual" aria-hidden="true">
          <span>Resende</span>
          <strong>Dr.</strong>
          <p>Alpha Center</p>
        </div>
        <div className="contact-map-placeholder__copy">
          <p className="eyebrow">MAPA EM PREPARAÇÃO</p>
          <h2>O ponto oficial será conectado aqui.</h2>
          <p>
            Até a validação do perfil no Google Maps, exibimos apenas o endereço
            confirmado para evitar direcionamentos incorretos.
          </p>
          <address>{siteConfig.address.display}</address>
        </div>
      </section>

      <section className="institutional-cta">
        <p className="eyebrow">ANTES DE CHEGAR</p>
        <h2>Descubra o sabor da sua próxima pausa.</h2>
        <div>
          <Link className="button button-light" href="/cardapio">
            Abrir cardápio
          </Link>
          <a
            className="button outline-light"
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noreferrer"
          >
            Acompanhar novidades
          </a>
        </div>
      </section>
    </main>
  );
}
