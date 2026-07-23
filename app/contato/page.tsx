import type { Metadata } from "next";
import Link from "next/link";
import { SocialIcon } from "@/components/SocialIcon";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Contato e localização",
  description:
    "Encontre a Dr. Coffee Station na Av. Luiz Dias Martins, 73, Alpha Center, em Resende, e acompanhe as novidades pelo Instagram.",
  alternates: { canonical: "/contato" },
};

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
              className="button button-whatsapp"
              href={siteConfig.whatsapp.url}
              target="_blank"
              rel="noreferrer"
            >
              <SocialIcon name="whatsapp" />
              Falar pelo WhatsApp
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
          <p className="eyebrow">FALE CONOSCO</p>
          <h2>WhatsApp</h2>
          <p>Entre em contato diretamente com a Dr. Coffee Station.</p>
          <a className="contact-channel-link" href={siteConfig.whatsapp.url} target="_blank" rel="noreferrer">
            <SocialIcon name="whatsapp" />
            {siteConfig.whatsapp.display} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="contact-channels__confirmed">
          <p className="eyebrow">ACOMPANHE</p>
          <h2>Instagram</h2>
          <p>Acompanhe cafés, sabores, novidades e momentos da Dr. Coffee Station.</p>
          <a className="contact-channel-link" href={siteConfig.instagram.url} target="_blank" rel="noreferrer">
            <SocialIcon name="instagram" />
            {siteConfig.instagram.handle} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="contact-map-placeholder">
        <div className="contact-map-placeholder__visual" aria-hidden="true">
          <span>Resende</span>
          <strong>Dr.</strong>
          <p>Alpha Center</p>
        </div>
        <div className="contact-map-placeholder__copy">
          <p className="eyebrow">LOCALIZAÇÃO OFICIAL</p>
          <h2>Encontre a Dr. Coffee Station.</h2>
          <p>Abra o perfil oficial no Google Maps para consultar a rota até a cafeteria.</p>
          <address>{siteConfig.address.display}</address>
          <a className="button button-dark" href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">
            <SocialIcon name="location" />
            Abrir no Google Maps
          </a>
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
