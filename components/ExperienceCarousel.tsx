"use client";

import Image from "next/image";
import { useState } from "react";

const galleryImages = [
  {
    src: "/images/institucional/dr-coffee-cappuccinos.png",
    alt: "Cappuccinos preparados na Dr. Coffee Station",
    position: "center",
  },
  {
    src: "/images/institucional/dr-coffee-facade.png",
    alt: "Ambiente interno da Dr. Coffee Station no Alpha Center",
    position: "center 30%",
  },
  {
    src: "/images/cardapio/dr-coffee-sandwich.png",
    alt: "Sanduíche artesanal servido na Dr. Coffee Station",
    position: "center 58%",
  },
  {
    src: "/images/cardapio/dr-coffee-iced-real.png",
    alt: "Bebida gelada da Dr. Coffee Station",
    position: "center",
  },
  {
    src: "/images/cardapio/dr-coffee-toast.jpg",
    alt: "Toast artesanal servido na Dr. Coffee Station",
    position: "center 62%",
  },
  {
    src: "/images/cardapio/dr-coffee-cappuccino-real.png",
    alt: "Cappuccino cremoso da Dr. Coffee Station",
    position: "center 54%",
  },
  {
    src: "/images/home/dr-coffee-hero.png",
    alt: "Café especial preparado na Dr. Coffee Station",
    position: "center",
  },
  {
    src: "/images/cardapio/dr-coffee-breakfast.jpg",
    alt: "Café da manhã servido na Dr. Coffee Station",
    position: "center",
  },
] as const;

export function ExperienceCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleImages = [0, 1].map(
    (offset) => galleryImages[(startIndex + offset) % galleryImages.length],
  );

  const move = (direction: -1 | 1) => {
    setStartIndex((current) => {
      const next = current + direction * 2;
      return (next + galleryImages.length) % galleryImages.length;
    });
  };

  return (
    <section
      className="experiences-carousel"
      aria-label="Galeria de sabores e momentos da Dr. Coffee Station"
    >
      <div className="experiences-carousel__viewport" aria-live="polite">
        {visibleImages.map((image, slot) => (
          <figure
            className="experiences-carousel__slide"
            key={`${startIndex}-${image.src}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 850px) 50vw, 50vw"
              style={{ objectPosition: image.position }}
              priority={startIndex === 0 && slot === 0}
            />
          </figure>
        ))}
      </div>

      <button
        className="experiences-carousel__button experiences-carousel__button--previous"
        type="button"
        onClick={() => move(-1)}
        aria-label="Exibir imagens anteriores"
      >
        <span aria-hidden="true">←</span>
      </button>
      <button
        className="experiences-carousel__button experiences-carousel__button--next"
        type="button"
        onClick={() => move(1)}
        aria-label="Exibir próximas imagens"
      >
        <span aria-hidden="true">→</span>
      </button>

      <p className="experiences-carousel__status">
        {String(startIndex + 1).padStart(2, "0")}–{String(startIndex + 2).padStart(2, "0")}
        <span aria-hidden="true"> / </span>
        {String(galleryImages.length).padStart(2, "0")}
      </p>
    </section>
  );
}
