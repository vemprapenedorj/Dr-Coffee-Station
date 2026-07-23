"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Item = { name: string; description?: string; price: string; tag?: string; section?: string; centeredSection?: boolean; spacedSection?: boolean };
type BookPage = {
  type: "cover" | "welcome" | "menu" | "specials" | "closing";
  eyebrow: string;
  title?: string;
  copy?: string;
  note?: string;
  items?: Item[];
  photo?: "cover" | "cup" | "cappuccino" | "iced" | "sandwich" | "toast" | "breakfast" | "matcha" | "facade";
  photoAtBottom?: boolean;
  dense?: boolean;
};

const pages: BookPage[] = [
  { type: "cover", eyebrow: "DR. COFFEE STATION", title: "Cardápio", copy: "Uma pausa feita com calma, sabor e bons grãos." },
  { type: "welcome", eyebrow: "BOAS-VINDAS", title: "Café que\nacolhe.", copy: "Aqui, cada xícara começa com bons grãos e termina em um momento para chamar de seu. Preparamos tudo com técnica, cuidado e aquela conversa boa que acompanha a pausa.", photo: "cover" },
  { type: "menu", eyebrow: "CAFÉS QUENTES", title: "Clássicos bem\npreparados.", copy: "Aromas, textura e equilíbrio em cada gole.", photo: "cup", items: [
    { section: "Espresso", centeredSection: true, name: "Café Espresso", price: "R$ 9,00" },
    { name: "Espresso Duplo", price: "R$ 14,00" },
    { name: "Macchiato", price: "R$ 12,00" },
    { name: "Macchiato Duplo", price: "R$ 15,00" },
    { name: "Café Latte", price: "R$ 15,00" },
    { section: "Filtrados", centeredSection: true, spacedSection: true, name: "Método Prensa Francesa / Aeropress", price: "R$ 25,00" },
    { name: "Método Hario V60", price: "R$ 12,00" },
  ] },
  { type: "menu", eyebrow: "BEBIDAS COM LEITE", title: "Cremosidade na\nxícara.", copy: "Cremosas, equilibradas e preparadas com espresso.", photo: "cappuccino", items: [
    { section: "Cappuccinos", centeredSection: true, name: "Italiano", description: "Leite vaporizado e espresso.", price: "R$ 16,00" },
    { name: "Tradicional", description: "Leite vaporizado, espresso, cacau e canela.", price: "R$ 17,00" },
    { name: "Vegano", description: "Bebida de aveia e espresso.", price: "R$ 18,00" },
    { name: "Culinária da Casa", description: "Cappuccino doce, cremoso e com pouca presença de café.", price: "R$ 16,00" },
    { name: "Mocha", description: "Leite vaporizado, espresso e calda de chocolate.", price: "R$ 20,00" },
  ] },
  { type: "menu", eyebrow: "BEBIDAS GELADAS", copy: "Café especial, receitas refrescantes e uma pausa para aproveitar devagar.", dense: true, photo: "iced", photoAtBottom: true, items: [
    { section: "Cafés gelados", centeredSection: true, name: "Espresso Tônica", description: "Espresso, tônica, gelo e xarope opcional.", price: "R$ 18,00" },
    { name: "Cold Brew", description: "300 ml servido com gelo e fruta cítrica.", price: "R$ 15,00" },
    { name: "Dr. Coffee Gelado", description: "Cappuccino cremoso da casa batido com gelo, borda de Nutella, chantilly artesanal e finalizado com calda de chocolate.", price: "R$ 25,00" },
    { name: "Frappuccino", description: "Cappuccino gelado da casa batido com gelo, chantilly artesanal, finalizado com calda de caramelo e canela em pó.", price: "R$ 23,00" },
    { name: "Frappuccino Doce de Leite", description: "Cappuccino gelado da casa batido com gelo, borda de doce de leite, chantilly artesanal, finalizado com calda de caramelo e canela em pó.", price: "R$ 25,00" },
    { name: "Affogato", description: "Café espresso com uma bola de sorvete de creme.", price: "R$ 17,00" },
  ] },
  { type: "menu", eyebrow: "OUTRAS PAUSAS", title: "Aconchego a\ncada gole.", copy: "Chocolate, chás e receitas aromáticas para tornar a sua pausa ainda mais especial.", photo: "matcha", items: [
    { section: "Chocolates", centeredSection: true, name: "Chocolate Quente P", price: "R$ 17,00" },
    { name: "Chocolate Quente G", price: "R$ 22,00" },
    { section: "Chás e Chai", centeredSection: true, spacedSection: true, name: "Chá Gelado", description: "Branco, verde e preto (infusões a verificar).", price: "R$ 12,00" },
    { name: "Matcha", description: "Verificar as opções.", price: "R$ 20,00" },
    { name: "Massala Chai Latte Quente", price: "R$ 18,00" },
  ] },
  { type: "menu", eyebrow: "PARA UMA PAUSA MAIS SABOROSA", title: "Sabores entre\npães.", copy: "Pães artesanais, sabores marcantes e combinações preparadas para acompanhar seu café.", dense: true, photo: "sandwich", items: [
    { section: "Sanduíches", centeredSection: true, name: "Truta Defumada", description: "Pão de fermentação natural selado na manteiga, truta defumada envolvida em uma deliciosa maionese, finalizada com tomates-cereja e alface-americana.", price: "R$ 45,00" },
    { name: "Rosbife", description: "Pão de fermentação natural selado na manteiga, rosbife, molho de mostarda e mel, finalizado com tomates confitados.", price: "R$ 45,00" },
    { name: "Pastrami", description: "Pão de fermentação natural selado na manteiga, pastrami com mostarda e maionese da casa, finalizado com rúcula.", price: "R$ 45,00" },
    { name: "Monte Cristo", description: "Duas fatias de pão artesanal seladas na manteiga, cream cheese, queijo e presunto.", price: "R$ 25,00" },
    { name: "Queijo Quente", description: "Pão de fermentação natural selado na manteiga e finalizado com queijo.", price: "R$ 18,00" },
  ] },
  { type: "menu", eyebrow: "PARA UMA PAUSA MAIS SABOROSA", title: "Tostados para\naproveitar.", copy: "Pães artesanais, sabores marcantes e combinações preparadas para acompanhar seu café.", dense: true, photo: "toast", photoAtBottom: true, items: [
    { section: "Toast", centeredSection: true, name: "Geleia de Damasco", description: "Pão de fermentação natural selado na manteiga, queijo brie e geleia de damasco artesanal.", price: "R$ 25,00" },
    { name: "Tomate Confitado", description: "Pão selado na manteiga, cream cheese, tomates confitados e molho pesto da casa.", price: "R$ 28,00" },
    { name: "Ovos com Bacon", description: "Pão de fermentação natural selado na manteiga, queijo, dois ovos mexidos caipiras e bacon crocante.", price: "R$ 25,00" },
  ] },
  { type: "menu", eyebrow: "PARA ACOMPANHAR", copy: "Os clássicos para acompanhar seu café: pão de queijo, salgados e bolos artesanais.", dense: true, items: [
    { section: "Especiais", centeredSection: true, name: "Pão de Queijo", description: "Pão de queijo curado artesanal.", price: "R$ 8,00" },
    { name: "Croissant", description: "Recheio de cream cheese, Nutella ou manteiga.", price: "R$ 22,00" },
    { name: "Salgados", description: "Conheça os sabores.", price: "R$ 15,00" },
    { name: "Pão Tostado com Manteiga", description: "Pão de fermentação natural selado na manteiga.", price: "R$ 9,00" },
    { name: "Pão Tostado com Queijo", description: "Pão de fermentação natural selado na manteiga com queijo tostado.", price: "R$ 12,00" },
    { section: "Sobremesa e Bolo", centeredSection: true, spacedSection: true, name: "Bolo de Milho com Goiabada", price: "R$ 9,00" },
    { name: "Bolo de Laranja", price: "R$ 9,00" },
    { name: "Torta do Dia", description: "Sabores a consultar.", price: "R$ 22,00" },
    { name: "Brownie com Nutella e Morango", price: "R$ 25,00" },
  ] },
  { type: "menu", eyebrow: "BEBIDAS", copy: "Opções refrescantes para acompanhar a sua pausa, do mate da casa aos sabores naturais.", dense: true, photo: "breakfast", photoAtBottom: true, items: [
    { section: "Bebidas", centeredSection: true, name: "Mate da Casa", description: "Natural ou limão.", price: "R$ 15,00" },
    { name: "Soda Italiana", description: "Consultar sabor.", price: "R$ 18,00" },
    { name: "Água com Gás", price: "R$ 6,00" },
    { name: "Água sem Gás", price: "R$ 6,00" },
    { name: "Refrigerante", price: "R$ 9,00" },
    { name: "Suco Natural de Amora", price: "R$ 15,00" },
  ] },
  { type: "menu", eyebrow: "ESPECIAIS DO MÊS", copy: "Café da manhã a dois, feito para dividir bons momentos.", dense: true, items: [
    { name: "Clássico", description: "Um café da manhã tradicional e completo, com pão selado na manteiga, café com bacon, bolo do dia e café coado fresquinho.", price: "R$ 39,00" },
    { name: "Essencial", description: "Leve e equilibrado, ideal para começar o dia: pão selado na manteiga, pão de queijo, iogurte com frutas e café coado.", price: "R$ 49,00" },
    { name: "Para Compartilhar", description: "Perfeito para dividir bons momentos: dois pães selados na manteiga, dois ovos com bacon, dois iogurtes, dois pães de queijo e dois cafés coados.", price: "R$ 89,00" },
    { name: "Pizza Brotinho", description: "Consultar sabores.", price: "R$ 20,00" },
    { name: "Quiche", description: "Consultar sabores.", price: "R$ 22,00" },
    { name: "Crepe", description: "Consultar sabores.", price: "R$ 22,00" },
    { name: "Empada", description: "Consultar sabores.", price: "R$ 9,00" },
    { name: "Croissant", description: "Morango com Nutella.", price: "R$ 28,00" },
    { name: "Brownie", description: "1 bola de sorvete.", price: "R$ 28,00" },
    { name: "Torta de Maçã", description: "1 bola de sorvete.", price: "R$ 28,00" },
  ] },
  { type: "closing", eyebrow: "ATÉ A PRÓXIMA PAUSA", title: "A gente te\nespera.", copy: "Venha viver o café com calma. Acompanhe as novidades, envie uma mensagem ou visite a Dr. Coffee Station no Alpha Center.", photo: "facade", photoAtBottom: true },
];

function MenuRows({ items = [] }: { items?: Item[] }) {
  return <div className="menu-rows">
    {items.map((item) => <div key={item.name} className={item.spacedSection ? "menu-section-break" : undefined}>
      {item.section && <p className={`menu-subsection ${item.centeredSection ? "menu-subsection-centered" : ""} ${item.spacedSection ? "menu-subsection-spaced" : ""}`}>{item.section}</p>}
      <div className="menu-row">
        <div className="menu-row-copy"><div><strong>{item.name}</strong>{item.tag && <em>{item.tag}</em>}</div>{item.description && <span>{item.description}</span>}</div>
        <b>{item.price}</b>
      </div>
    </div>)}
  </div>;
}

function PaperPage({ page, number }: { page: BookPage; number: number }) {
  return <article className={`book-page book-${page.type} ${page.dense ? "book-dense" : ""} ${page.photoAtBottom ? "book-page-bottom-photo" : ""}`} aria-label={`Página ${number}: ${(page.title ?? page.eyebrow).replace("\n", " ")}`}>
    <div className="paper-grain" aria-hidden="true" />
    <p className="book-eyebrow">{page.eyebrow}</p>
    {page.type === "cover" && <span className="book-cover-logo"><Image src="/images/brand/dr-coffee-logo-transparent.png" alt="Dr. Coffee" width={490} height={272} /></span>}
    {page.title && <h2>{page.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>}
    {page.copy && <p className="book-copy">{page.copy}</p>}
    {page.photo && !page.photoAtBottom && <div className={`book-photo book-photo-${page.photo}`} role="img" aria-label="Café especial da Dr. Coffee Station" />}
    {page.items && <MenuRows items={page.items} />}
    {page.photo && page.photoAtBottom && <div className={`book-photo book-photo-${page.photo} book-photo-bottom`} role="img" aria-label={page.photo === "facade" ? "Fachada da Dr. Coffee Station" : "Bebida gelada da Dr. Coffee Station"} />}
    {page.type === "closing" && <div className="closing-overlay"><span>Não aceite</span><strong>Amores frios 🧊</strong><strong>Amizades falsas 🚫</strong><strong>Cafés ruins ☕</strong></div>}
    {page.note && <p className="book-note">✦ {page.note}</p>}
    {page.type === "specials" && <span className="special-stamp">feito<br />com calma</span>}
    {page.type === "closing" && <div className="qr-placeholder" aria-label="Espaço reservado para QR Code"><span>QR</span><small>em breve</small></div>}
    <span className="page-number">{number}</span>
    {number > 1 && <Image className="book-footer-logo" src="/images/brand/dr-coffee-cup-logo-transparent.png" alt="" aria-hidden="true" width={62} height={62} />}
  </article>;
}

export default function CardapioBook() {
  const [current, setCurrent] = useState(0);
  const [turning, setTurning] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const touchStart = useRef<number | null>(null);
  const lastDesktopStart = pages.length % 2 === 0 ? pages.length - 1 : pages.length - 2;

  useEffect(() => {
    const media = window.matchMedia("(min-width: 851px)");
    const syncLayout = () => {
      setIsDesktop(media.matches);
      setCurrent((page) => media.matches && page > 0 ? Math.min(lastDesktopStart, page % 2 === 0 ? page - 1 : page) : page);
    };
    syncLayout();
    media.addEventListener("change", syncLayout);
    return () => media.removeEventListener("change", syncLayout);
  }, [lastDesktopStart]);

  const canGoNext = isDesktop ? current < lastDesktopStart : current < pages.length - 1;
  const canGoPrevious = current > 0;

  const move = (direction: 1 | -1) => {
    const next = !isDesktop
      ? Math.max(0, Math.min(pages.length - 1, current + direction))
      : direction === 1
        ? (current === 0 ? 1 : Math.min(lastDesktopStart, current + 2))
        : (current === 1 ? 0 : Math.max(1, current - 2));
    if (next === current || turning) return;
    setTurning(true);
    window.setTimeout(() => { setCurrent(next); setTurning(false); }, 150);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const visible = isDesktop && current > 0 ? pages.slice(current, current + 2) : [pages[current]];
  const pageIndicator = current === 0 ? "Capa" : isDesktop ? `Páginas ${current + 1}–${Math.min(current + 2, pages.length)} de ${pages.length}` : `Página ${current + 1} de ${pages.length}`;
  return <section className="flipbook-section" id="revista" aria-label="Cardápio em formato de revista">
    <div className="book-intro"><p className="eyebrow">FOLHEIE O CARDÁPIO</p><p>Deslize para os lados no celular ou use as setas para navegar.</p></div>
    <div className="flipbook" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const delta = event.changedTouches[0].clientX - touchStart.current; touchStart.current = null; if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1); }}>
      <button className="book-arrow book-arrow-left" onClick={() => move(-1)} disabled={!canGoPrevious} aria-label="Página anterior">←</button>
      <div className={`book-spread ${visible.length === 1 ? "is-single" : ""} ${turning ? "is-turning" : ""}`} aria-live="polite">
        {visible.map((page, index) => <PaperPage key={`${current}-${index}`} page={page} number={current + index + 1} />)}
      </div>
      <button className="book-arrow book-arrow-right" onClick={() => move(1)} disabled={!canGoNext} aria-label="Próxima página">→</button>
    </div>
    <div className="book-controls"><button onClick={() => move(-1)} disabled={!canGoPrevious}>← Anterior</button><span>{pageIndicator}</span><button onClick={() => move(1)} disabled={!canGoNext}>Próxima →</button></div>
  </section>;
}
