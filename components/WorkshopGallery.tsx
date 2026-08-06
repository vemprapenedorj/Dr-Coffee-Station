"use client";

import Image from "next/image";
import { useState } from "react";
import { workshopGallery } from "@/content/workshops";

export function WorkshopGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? workshopGallery.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === workshopGallery.length - 1 ? 0 : prev + 1));
  };

  const currentItem = workshopGallery[currentIndex];

  return (
    <section
      className="workshop-gallery-section"
      aria-label="Galeria de fotos dos workshops e encontros"
    >
      <div className="workshop-gallery-heading">
        <p className="eyebrow">REGISTROS DOS ENCONTROS</p>
        <h2>Galeria de fotos & momentos</h2>
        <p>Confira um pouco da atmosfera, práticas e encontros já realizados na Dr. Coffee Station.</p>
      </div>

      <div className="workshop-gallery-container">
        <div className="workshop-gallery-viewport" aria-live="polite">
          <figure className="workshop-gallery-slide">
            <div className="workshop-gallery-image-wrap">
              <Image
                src={currentItem.src}
                alt={currentItem.alt}
                fill
                sizes="(max-width: 850px) 100vw, 75vw"
                className="workshop-gallery-image"
              />
            </div>
            <figcaption className="workshop-gallery-caption">
              <span>{currentItem.title}</span>
              <p>{currentItem.caption}</p>
            </figcaption>
          </figure>
        </div>

        <button
          className="workshop-gallery-btn workshop-gallery-btn--prev"
          type="button"
          onClick={previousSlide}
          aria-label="Exibir imagem anterior da galeria"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          className="workshop-gallery-btn workshop-gallery-btn--next"
          type="button"
          onClick={nextSlide}
          aria-label="Exibir próxima imagem da galeria"
        >
          <span aria-hidden="true">→</span>
        </button>

        <div className="workshop-gallery-dots">
          {workshopGallery.map((item, index) => (
            <button
              key={item.src}
              type="button"
              className={`workshop-gallery-dot${index === currentIndex ? " active" : ""}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir para a foto ${index + 1}: ${item.title}`}
              aria-current={index === currentIndex ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
