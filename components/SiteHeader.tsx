"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNavigation, siteConfig, utilityNavigation } from "@/content/site";
import { Brand } from "./Brand";
import { SocialIcon } from "./SocialIcon";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <div className="topbar">
        <span aria-hidden="true">✦</span> {siteConfig.tagline}
      </div>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Dr. Coffee — início">
          <Brand />
        </Link>

        <nav className="site-nav site-nav--desktop" aria-label="Navegação principal">
          {primaryNavigation.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="header-contact-link" href="/contato">
            Contato
          </Link>
          <a
            className="social-link"
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram da Dr. Coffee Station"
          >
            <SocialIcon name="instagram" />
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={isOpen}
            aria-controls="menu-mobile"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setIsOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>

        <div
          className={`mobile-menu${isOpen ? " mobile-menu--open" : ""}`}
          id="menu-mobile"
          aria-hidden={!isOpen}
        >
          <nav className="site-nav site-nav--mobile" aria-label="Navegação móvel">
            {[...primaryNavigation, ...utilityNavigation].map((item) => (
              <Link
                href={item.href}
                key={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
            >
                {item.label}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
          <div className="mobile-menu__footer">
            <p>{siteConfig.address.display}</p>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noreferrer"
              tabIndex={isOpen ? 0 : -1}
            >
              {siteConfig.instagram.handle}
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
