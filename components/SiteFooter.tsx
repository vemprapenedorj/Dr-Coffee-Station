import Link from "next/link";
import { primaryNavigation, siteConfig, utilityNavigation } from "@/content/site";
import { Brand } from "./Brand";
import { SocialIcon } from "./SocialIcon";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="site-footer__brand">
          <Link className="brand" href="/" aria-label="Dr. Coffee — início">
            <Brand compact />
          </Link>
          <p>Uma pausa feita com calma, sabor e bons encontros.</p>
        </div>

        <div className="site-footer__nav">
          <p className="footer-title">Explore</p>
          {[...primaryNavigation, ...utilityNavigation].map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="site-footer__contact">
          <p className="footer-title">Visite</p>
          <address>
            {siteConfig.address.street}
            <br />
            {siteConfig.address.neighborhood} — {siteConfig.address.city}, {siteConfig.address.region}
          </address>
          <div className="footer-social-links">
            <a href={siteConfig.whatsapp.url} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${siteConfig.whatsapp.display}`}>
              <SocialIcon name="whatsapp" />
              {siteConfig.whatsapp.display}
            </a>
            <a href={siteConfig.instagram.url} target="_blank" rel="noreferrer" aria-label={`Instagram ${siteConfig.instagram.handle}`}>
              <SocialIcon name="instagram" />
              {siteConfig.instagram.handle}
            </a>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} Dr. Coffee Station.</p>
        <p>Café especial no Alpha Center, em Resende.</p>
      </div>
    </footer>
  );
}
