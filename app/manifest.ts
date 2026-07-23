import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dr. Coffee Station",
    short_name: "Dr. Coffee",
    description:
      "Café especial, preparo artesanal e boas pausas no Alpha Center, em Resende.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5efe5",
    theme_color: "#381a0b",
    lang: "pt-BR",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

