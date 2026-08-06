import { siteConfig } from "@/content/site";
import { SocialIcon } from "./SocialIcon";

export function InteractiveMap() {
  const mapSrc = "https://maps.google.com/maps?q=-22.4820086,-44.4671952&hl=pt-BR&z=17&output=embed";

  return (
    <section className="interactive-map-section" aria-label="Localização da Dr. Coffee Station">
      <div className="interactive-map-container">
        <div className="interactive-map-info">
          <p className="eyebrow">COMO CHEGAR</p>
          <address className="interactive-map-address">
            <strong>{siteConfig.name}</strong>
            <br />
            {siteConfig.address.street}
            <br />
            {siteConfig.address.neighborhood} — {siteConfig.address.city}, {siteConfig.address.region}
          </address>
          <p className="interactive-map-hint">
            Venha tomar um café especial no Alpha Center em Resende ou trace sua rota no mapa.
          </p>
          <div className="interactive-map-actions">
            <a
              className="button button-dark button-sm"
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              <SocialIcon name="location" />
              Abrir no Google Maps
            </a>
          </div>
        </div>

        <div className="interactive-map-frame-wrap">
          <iframe
            title="Mapa interativo da localização da Dr. Coffee Station no Alpha Center em Resende"
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="interactive-map-iframe"
          />
        </div>
      </div>
    </section>
  );
}
