import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

test("renders every public route with the shared navigation", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("routes", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const routes = [
    "/",
    "/sobre",
    "/servicos",
    "/loja",
    "/cardapio",
    "/contato",
    "/blog",
    "/experiencias",
  ];

  for (const route of routes) {
    const response = await worker.fetch(
      new Request(`http://localhost${route}`, {
        headers: { accept: "text/html" },
      }),
      {
        ASSETS: {
          fetch: async () => new Response("Not found", { status: 404 }),
        },
      },
      {
        waitUntil() {},
        passThroughOnException() {},
      },
    );

    assert.equal(response.status, 200, `${route} should render`);
    const html = await response.text();
    assert.match(html, /Navega(?:ç|&ccedil;|&#xE7;)ão principal/i);
    assert.match(html, /Dr\. Coffee Station/i);
    assert.match(html, /<main\b/i);
  }
});

test("renders the custom not-found page", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("not-found", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/pagina-inexistente", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 404);
  assert.match(await response.text(), /Essa página saiu para tomar um café/i);
});

test("renders the Home conversion paths and local context", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("home-conversion", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Café especial em Resende/i);
  assert.match(html, /href=["']\/cardapio["']/i);
  assert.match(html, /href=["']\/contato["']/i);
  assert.match(html, /instagram\.com\/dr\.coffeestation/i);
  assert.match(html, /Venha viver a sua pausa favorita/i);
});

test("renders confirmed and pending institutional information responsibly", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("institutional", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const fetchPage = async (route) => {
    const response = await worker.fetch(
      new Request(`http://localhost${route}`, {
        headers: { accept: "text/html" },
      }),
      {
        ASSETS: {
          fetch: async () => new Response("Not found", { status: 404 }),
        },
      },
      {
        waitUntil() {},
        passThroughOnException() {},
      },
    );
    assert.equal(response.status, 200);
    return response.text();
  };

  const [about, services, contact] = await Promise.all([
    fetchPage("/sobre"),
    fetchPage("/servicos"),
    fetchPage("/contato"),
  ]);

  assert.match(about, /Café, pausa e encontro/i);
  assert.match(about, /Alpha Center/i);
  assert.match(services, /Em planejamento/i);
  assert.match(services, /ainda não são apresentados como serviços disponíveis/i);
  assert.match(contact, /Av\. Luiz Dias Martins, 73/i);
  assert.match(contact, /Número oficial aguardando confirmação/i);
  assert.match(contact, /Google Maps/i);
});

test("renders the future shop without checkout or an unconfigured lead form", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("shop", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/loja", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /leve a experiência Dr\. Coffee para casa/i);
  assert.match(html, /Cafés/i);
  assert.match(html, /Acessórios/i);
  assert.match(html, /Canecas/i);
  assert.match(html, /Kits presenteáveis/i);
  assert.match(html, /Produtos da marca/i);
  assert.match(html, /Em breve/i);
  assert.match(html, /preços e disponibilidade ainda serão definidos/i);
  assert.match(html, /instagram\.com\/dr\.coffeestation/i);
  assert.doesNotMatch(html, /<form\b/i);
  assert.doesNotMatch(html, /finalizar compra/i);
});

test("keeps image assets organized by section", () => {
  const expectedAssets = [
    "images/brand/dr-coffee-logo-transparent.png",
    "images/home/dr-coffee-hero.png",
    "images/cardapio/dr-coffee-menu-cover.png",
    "images/cardapio/dr-coffee-cappuccino-real.png",
    "images/institucional/dr-coffee-facade.png",
    "images/blog/README.md",
  ];

  for (const asset of expectedAssets) {
    assert.equal(
      existsSync(join(process.cwd(), "public", asset)),
      true,
      `${asset} should exist`,
    );
  }

  assert.equal(
    existsSync(join(process.cwd(), "public", "dr-coffee-hero.png")),
    false,
    "section images should not remain loose in public",
  );
});

test("renders the Blog listing and every initial article", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("blog", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const slugs = [
    "onde-tomar-cafe-especial-em-resende",
    "cappuccino-cremoso-o-que-faz-a-diferenca",
    "cafe-da-manha-em-resende-para-aproveitar-a-dois",
  ];
  const fetchPage = async (route) => {
    const response = await worker.fetch(
      new Request(`http://localhost${route}`, {
        headers: { accept: "text/html" },
      }),
      {
        ASSETS: {
          fetch: async () => new Response("Not found", { status: 404 }),
        },
      },
      {
        waitUntil() {},
        passThroughOnException() {},
      },
    );
    assert.equal(response.status, 200, `${route} should render`);
    return response.text();
  };

  const listing = await fetchPage("/blog");
  assert.match(listing, /Histórias, sabores e boas pausas/i);
  assert.match(listing, /Café Especial/i);
  assert.match(listing, /Métodos de Preparo/i);
  assert.match(listing, /Gastronomia/i);

  for (const slug of slugs) {
    const article = await fetchPage(`/blog/${slug}`);
    assert.match(article, /Artigos relacionados/i);
    assert.match(article, /href=["']\/cardapio["']/i);
    assert.match(article, /href=["']\/contato["']/i);
  }
});

test("serves technical SEO routes with only indexable URLs", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("technical-seo", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const fetchText = async (route) => {
    const response = await worker.fetch(
      new Request(`http://localhost${route}`, {
        headers: { accept: "*/*" },
      }),
      {
        ASSETS: {
          fetch: async () => new Response("Not found", { status: 404 }),
        },
      },
      {
        waitUntil() {},
        passThroughOnException() {},
      },
    );
    assert.equal(response.status, 200, `${route} should render`);
    return response.text();
  };

  const [robots, sitemap, manifest] = await Promise.all([
    fetchText("/robots.txt"),
    fetchText("/sitemap.xml"),
    fetchText("/manifest.webmanifest"),
  ]);

  assert.match(robots, /User-Agent:\s*\*/i);
  assert.match(robots, /Allow:\s*\//i);
  assert.match(robots, /Sitemap:.*\/sitemap\.xml/i);
  assert.match(sitemap, /\/cardapio</i);
  assert.match(sitemap, /\/blog\/onde-tomar-cafe-especial-em-resende</i);
  assert.match(sitemap, /\/experiencias</i);
  assert.doesNotMatch(sitemap, /\/loja</i);
  assert.match(manifest, /Dr\. Coffee Station/i);
  assert.match(manifest, /#381a0b/i);
});

test("renders canonical URLs and structured data", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("structured-data", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const fetchHtml = async (route) => {
    const response = await worker.fetch(
      new Request(`http://localhost${route}`, {
        headers: { accept: "text/html" },
      }),
      {
        ASSETS: {
          fetch: async () => new Response("Not found", { status: 404 }),
        },
      },
      {
        waitUntil() {},
        passThroughOnException() {},
      },
    );
    assert.equal(response.status, 200);
    return response.text();
  };

  const contact = await fetchHtml("/contato");
  assert.match(
    contact,
    /rel=["']canonical["'][^>]+href=["'][^"']+\/contato["']/i,
  );
  assert.match(contact, /CafeOrCoffeeShop/i);
  assert.match(contact, /PostalAddress/i);
  assert.doesNotMatch(contact, /google-site-verification[^>]+fict/i);

  const article = await fetchHtml(
    "/blog/cappuccino-cremoso-o-que-faz-a-diferenca",
  );
  assert.match(article, /BlogPosting/i);
  assert.match(article, /BreadcrumbList/i);
  assert.match(
    article,
    /rel=["']canonical["'][^>]+href=["'][^"']+\/blog\/cappuccino-cremoso-o-que-faz-a-diferenca["']/i,
  );

  const shop = await fetchHtml("/loja");
  assert.match(shop, /name=["']robots["'][^>]+noindex/i);
});

test("renders the complete Experiences page as indexable content", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("experiences", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/experiencias", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Momentos para aproveitar com calma/i);
  assert.match(html, /Cada pausa pode ter um sabor/i);
  assert.match(html, /Alpha Center/i);
  assert.match(html, /rel=["']canonical["'][^>]+\/experiencias/i);
  assert.doesNotMatch(html, /name=["']robots["'][^>]+noindex/i);
});

test("keeps every internal navigation link reachable", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("link-integrity", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const seedRoutes = [
    "/",
    "/sobre",
    "/servicos",
    "/loja",
    "/cardapio",
    "/contato",
    "/blog",
    "/experiencias",
    "/blog/onde-tomar-cafe-especial-em-resende",
    "/blog/cappuccino-cremoso-o-que-faz-a-diferenca",
    "/blog/cafe-da-manha-em-resende-para-aproveitar-a-dois",
  ];
  const discovered = new Set(seedRoutes);

  for (const route of seedRoutes) {
    const response = await worker.fetch(
      new Request(`http://localhost${route}`, {
        headers: { accept: "text/html" },
      }),
      {
        ASSETS: {
          fetch: async () => new Response("Not found", { status: 404 }),
        },
      },
      {
        waitUntil() {},
        passThroughOnException() {},
      },
    );
    assert.equal(response.status, 200, `${route} should render`);
    const html = await response.text();
    assert.equal(
      (html.match(/<h1\b/gi) ?? []).length,
      1,
      `${route} should have exactly one H1`,
    );

    for (const match of html.matchAll(
      /<a\b[^>]*href=["'](\/[^"'?#]*)[^"']*["'][^>]*>/gi,
    )) {
      const path = match[1] || "/";
      if (
        !path.startsWith("/_") &&
        !path.match(/\.(?:svg|png|jpg|jpeg|webp|xml|txt|webmanifest)$/i)
      ) {
        discovered.add(path);
      }
    }
  }

  for (const route of discovered) {
    const response = await worker.fetch(
      new Request(`http://localhost${route}`, {
        headers: { accept: "text/html" },
      }),
      {
        ASSETS: {
          fetch: async () => new Response("Not found", { status: 404 }),
        },
      },
      {
        waitUntil() {},
        passThroughOnException() {},
      },
    );
    assert.equal(response.status, 200, `internal link ${route} should be reachable`);
  }
});
