"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNavigation, siteConfig, utilityNavigation } from "@/content/site";
import { Brand } from "./Brand";
import { SocialIcon } from "./SocialIcon";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !menuRef.current || !toggleRef.current) return;

    const menu = menuRef.current;
    const toggle = toggleRef.current;
    const background = [
      document.querySelector<HTMLElement>("main"),
      document.querySelector<HTMLElement>(".site-footer"),
    ].filter((element): element is HTMLElement => element !== null);
    const menuItems = Array.from(
      menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    );
    const focusTargets = [toggle, ...menuItems];
    const focusFrame = window.requestAnimationFrame(() => menuItems[0]?.focus());

    background.forEach((element) => element.setAttribute("inert", ""));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || focusTargets.length === 0) return;

      const currentIndex = focusTargets.indexOf(
        document.activeElement as HTMLElement,
      );
      const nextIndex = event.shiftKey
        ? currentIndex <= 0
          ? focusTargets.length - 1
          : currentIndex - 1
        : currentIndex === focusTargets.length - 1
          ? 0
          : currentIndex + 1;

      event.preventDefault();
      focusTargets[nextIndex].focus();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      background.forEach((element) => element.removeAttribute("inert"));

      if (document.activeElement?.closest("#menu-mobile")) {
        toggle.focus();
      }
    };
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
          <a
            className="social-link social-link--whatsapp"
            href={siteConfig.whatsapp.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Falar com a Dr. Coffee Station pelo WhatsApp ${siteConfig.whatsapp.display}`}
          >
            <SocialIcon name="whatsapp" />
          </a>
          <a
            className="social-link social-link--instagram"
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram da Dr. Coffee Station"
          >
            <SocialIcon name="instagram" />
          </a>
          <button
            ref={toggleRef}
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
          ref={menuRef}
          className={`mobile-menu${isOpen ? " mobile-menu--open" : ""}`}
          id="menu-mobile"
          role="dialog"
          aria-modal={isOpen || undefined}
          aria-label="Menu de navegação"
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
            <div className="mobile-menu__socials">
              <a href={siteConfig.whatsapp.url} target="_blank" rel="noreferrer" tabIndex={isOpen ? 0 : -1} aria-label="WhatsApp">
                <SocialIcon name="whatsapp" />
              </a>
              <a href={siteConfig.instagram.url} target="_blank" rel="noreferrer" tabIndex={isOpen ? 0 : -1} aria-label="Instagram">
                <SocialIcon name="instagram" />
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
