import type { Metadata } from "next";
import Image from "next/image";
import { InteractiveMap } from "@/components/InteractiveMap";
import { SocialIcon } from "@/components/SocialIcon";
import { WorkshopGallery } from "@/components/WorkshopGallery";
import { siteConfig } from "@/content/site";
import {
  buildWhatsAppWorkshopUrl,
  featuredWorkshop,
  pastWorkshops,
  upcomingWorkshops,
  workshopIntro,
} from "@/content/workshops";

export const metadata: Metadata = {
  title: "Workshops e eventos de café especial em Resende",
  description:
    "Participe dos nossos workshops, degustações guiadas e eventos sobre cafés especiais no Alpha Center, em Resende. Aprenda técnicas de extração, cupping e harmonizações.",
  alternates: { canonical: "/workshop" },
  openGraph: {
    title: "Workshops e Eventos de Café Especial em Resende",
    description:
      "Aprenda, deguste e vivencie a cultura do café especial na Dr. Coffee Station.",
    url: `${siteConfig.url}/workshop`,
    siteName: siteConfig.name,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/images/home/dr-coffee-hero.png`,
        width: 1536,
        height: 1024,
        alt: "Workshops na Dr. Coffee Station",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Workshops e eventos de café especial em Resende",
    description:
      "Aprenda, deguste e vivencie a cultura do café especial na Dr. Coffee Station.",
    images: ["/images/home/dr-coffee-hero.png"],
  },
};

export default function WorkshopPage() {
  const jsonLdEvents = [featuredWorkshop, ...upcomingWorkshops].map((event) => ({
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: event.title,
    description: event.description,
    startDate: event.isoDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: siteConfig.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.region,
        addressCountry: "BR",
      },
    },
    image: [`${siteConfig.url}${event.image}`],
    offers: {
      "@type": "Offer",
      price: Number(
        event.price.match(/R\$\s*([\d.,]+)/)?.[1].replace(".", "").replace(",", ".") ??
          0,
      ),
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/workshop`,
    },
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }));

  return (
    <main className="workshop-page" id="conteudo">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEvents) }}
      />

      {/* 1. Banner de apresentação (Hero) */}
      <section className="workshop-hero">
        <div className="workshop-hero__copy">
          <p className="eyebrow">{workshopIntro.eyebrow}</p>
          <h1>{workshopIntro.title}</h1>
          <p>{workshopIntro.description}</p>
          <div className="workshop-hero__actions">
            <a
              className="button button-dark"
              href="#proximo-workshop"
            >
              Ver próximo workshop <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="workshop-hero__image">
          <Image
            src="/images/home/dr-coffee-hero.png"
            alt="Preparo de café especial durante workshop na Dr. Coffee Station"
            width={1200}
            height={900}
            sizes="(max-width: 850px) calc(100vw - 40px), 46vw"
            priority
            fetchPriority="high"
          />
        </div>
      </section>

      {/* 2. Destaque do Próximo Workshop (No topo) */}
      <section className="workshop-featured-section" id="proximo-workshop" aria-labelledby="featured-title">
        <div className="workshop-featured-card">
          <div className="workshop-featured-card__badge-bar">
            <span className={`status-badge status-badge--${featuredWorkshop.statusType}`}>
              ✦ {featuredWorkshop.status}
            </span>
            <span className="spots-badge">{featuredWorkshop.spots}</span>
          </div>

          <div className="workshop-featured-card__grid">
            <div className="workshop-featured-card__content">
              <p className="eyebrow">DESTAQUE DO MÊS</p>
              <h2 id="featured-title">{featuredWorkshop.title}</h2>
              <p className="workshop-tagline">{featuredWorkshop.tagline}</p>
              <p className="workshop-description">{featuredWorkshop.description}</p>

              <div className="workshop-details-grid">
                <div className="workshop-detail-item">
                  <strong>Data:</strong>
                  <span>{featuredWorkshop.date}</span>
                </div>
                <div className="workshop-detail-item">
                  <strong>Horário:</strong>
                  <span>{featuredWorkshop.time}</span>
                </div>
                <div className="workshop-detail-item">
                  <strong>Local:</strong>
                  <span>{featuredWorkshop.location}</span>
                </div>
                <div className="workshop-detail-item">
                  <strong>Investimento:</strong>
                  <span>{featuredWorkshop.price}</span>
                </div>
              </div>

              <div className="workshop-highlights-list">
                <p className="highlights-title">O que está incluso na experiência:</p>
                <ul>
                  {featuredWorkshop.highlights.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="workshop-featured-card__actions">
                <a
                  className="button button-whatsapp button-sm"
                  href={buildWhatsAppWorkshopUrl(featuredWorkshop.whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SocialIcon name="whatsapp" />
                  Garantir vaga via WhatsApp
                </a>
              </div>
            </div>

            <div className="workshop-featured-card__image-wrap">
              <Image
                src={featuredWorkshop.image}
                alt={featuredWorkshop.imageAlt}
                width={800}
                height={800}
                sizes="(max-width: 850px) 100vw, 42vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Área para divulgar próximos workshops */}
      <section className="workshop-list-section" aria-labelledby="proximos-eventos-title">
        <div className="workshop-section-heading">
          <p className="eyebrow">AGENDA OFICIAL</p>
          <h2 id="proximos-eventos-title">Próximos workshops & encontros</h2>
          <p>Garanta a sua inscrição com antecedência. As turmas são reduzidas para melhor aproveitamento.</p>
        </div>

        <div className="workshop-cards-grid">
          {upcomingWorkshops.map((item) => (
            <article key={item.id} className="workshop-card">
              <div className="workshop-card__image">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={600}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className={`status-badge status-badge--${item.statusType}`}>
                  {item.status}
                </span>
              </div>
              <div className="workshop-card__body">
                <h3>{item.title}</h3>
                <p className="workshop-card__tagline">{item.tagline}</p>

                <div className="workshop-card__meta">
                  <p>📅 <strong>{item.date}</strong></p>
                  <p>⏰ {item.time}</p>
                  <p>📍 {item.location}</p>
                  <p>👥 {item.spots}</p>
                  <p className="workshop-card__price">💳 {item.price}</p>
                </div>

                <a
                  className="button button-whatsapp button-sm button-full"
                  href={buildWhatsAppWorkshopUrl(item.whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SocialIcon name="whatsapp" />
                  Inscrever-se pelo WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Galeria de fotos */}
      <WorkshopGallery />

      {/* 5. Área para listar workshops já realizados */}
      <section className="workshop-past-section" aria-labelledby="realizados-title">
        <div className="workshop-section-heading">
          <p className="eyebrow">HISTÓRICO DE ENCONTROS</p>
          <h2 id="realizados-title">Workshops já realizados</h2>
          <p>Veja algumas das oficinas e experiências sensoriais conduzidas na Dr. Coffee Station.</p>
        </div>

        <div className="workshop-past-grid">
          {pastWorkshops.map((item) => (
            <article key={item.id} className="workshop-past-card">
              <div className="workshop-past-card__header">
                <span className="status-badge status-badge--completed">
                  ✓ {item.status}
                </span>
                <span className="workshop-past-date">{item.date}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="workshop-past-card__footer">
                <span>Resende/RJ — Alpha Center</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. CTA final para contato / inscrição via WhatsApp */}
      <section className="workshop-cta-section">
        <div className="workshop-cta-content">
          <p className="eyebrow">EVENTOS PRIVADOS E GRUPOS</p>
          <h2>Quer organizar um workshop ou encontro exclusivo?</h2>
          <p>
            Realizamos encontros corporativos, aniversários e oficinas privativas de café especial para grupos no Alpha Center em Resende.
          </p>
          <div className="workshop-cta-actions">
            <a
              className="button button-whatsapp button-sm"
              href={buildWhatsAppWorkshopUrl("Olá! Gostaria de consultar disponibilidade para realizar um workshop privativo/evento na Dr. Coffee Station.")}
              target="_blank"
              rel="noreferrer"
            >
              <SocialIcon name="whatsapp" />
              Solicitar orçamento via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 7. Mapa interativo no final da página */}
      <InteractiveMap />
    </main>
  );
}
