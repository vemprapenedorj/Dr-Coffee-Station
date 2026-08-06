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

test("serves baseline security headers", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("security-headers", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/workshop", {
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

  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "SAMEORIGIN");
  assert.equal(
    response.headers.get("referrer-policy"),
    "strict-origin-when-cross-origin",
  );
  assert.equal(
    response.headers.get("permissions-policy"),
    "camera=(), microphone=(), geolocation=()",
  );
  assert.equal(response.headers.get("cross-origin-opener-policy"), "same-origin");
  assert.equal(response.headers.has("x-powered-by"), false);
});

test("serves local images without a Cloudflare Images binding", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("images", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const imageBody = new Uint8Array([137, 80, 78, 71]);

  const response = await worker.fetch(
    new Request(
      "http://localhost/_vinext/image?url=%2Fimages%2Ftest.png&w=640&q=75",
    ),
    {
      ASSETS: {
        fetch: async () =>
          new Response(imageBody, {
            headers: { "content-type": "image/png" },
          }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "image/png");
  assert.deepEqual(
    new Uint8Array(await response.arrayBuffer()),
    imageBody,
  );
});

test("renders every public route with the shared navigation", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("routes", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const routes = [
    "/",
    "/sobre",
    "/workshop",
    "/loja",
    "/cardapio",
    "/blog",
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
  assert.match(html, /google\.com\/maps/i);
  assert.match(html, /instagram\.com\/dr\.coffeestation/i);
  assert.match(html, /Venha viver a sua pausa favorita/i);
});

test("renders confirmed institutional and contact information", async () => {
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

  const [about, workshop] = await Promise.all([
    fetchPage("/sobre"),
    fetchPage("/workshop"),
  ]);

  assert.match(about, /Café, pausa e encontro/i);
  assert.match(about, /Alpha Center/i);
  assert.match(workshop, /Aprenda, deguste e vivencie/i);
  assert.match(workshop, /Workshops/i);
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
    assert.match(article, /google\.com\/maps/i);
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
  assert.match(sitemap, /\/workshop</i);
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

  const about = await fetchHtml("/sobre");
  assert.match(
    about,
    /rel=["']canonical["'][^>]+href=["'][^"']+\/sobre["']/i,
  );
  assert.match(
    about,
    /property=["']og:url["'][^>]+content=["'][^"']+\/sobre["']/i,
  );

  for (const route of ["/cardapio", "/blog", "/workshop"]) {
    const html = await fetchHtml(route);
    assert.match(
      html,
      new RegExp(
        `property=["']og:url["'][^>]+content=["'][^"']+${route.replace("/", "\\/")}["']`,
        "i",
      ),
    );
  }

  const article = await fetchHtml(
    "/blog/cappuccino-cremoso-o-que-faz-a-diferenca",
  );
  assert.match(article, /BlogPosting/i);
  assert.match(article, /BreadcrumbList/i);
  assert.match(
    article,
    /rel=["']canonical["'][^>]+href=["'][^"']+\/blog\/cappuccino-cremoso-o-que-faz-a-diferenca["']/i,
  );
  assert.match(
    article,
    /property=["']og:url["'][^>]+content=["'][^"']+\/blog\/cappuccino-cremoso-o-que-faz-a-diferenca["']/i,
  );

  const shop = await fetchHtml("/loja");
  assert.match(shop, /name=["']robots["'][^>]+noindex/i);
});

test("renders the complete menu as server-rendered semantic content", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("menu-content", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/cardapio", {
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
  assert.match(html, /Card.pio completo em lista/i);
  assert.match(html, /Caf. Espresso/i);
  assert.match(html, /Torta de Ma./i);
  assert.match(html, /<ul class=["']menu-catalog__items["']/i);
});

test("renders the complete Workshop page as indexable content", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("workshop", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/workshop", {
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
  assert.match(html, /Aprenda, deguste e vivencie/i);
  assert.match(html, /Alpha Center/i);
  assert.match(html, /Galeria de fotos/i);
  assert.match(html, /Próximos workshops/i);
  assert.match(html, /rel=["']canonical["'][^>]+\/workshop/i);
  assert.match(html, /EducationEvent/i);
  assert.doesNotMatch(html, /name=["']robots["'][^>]+noindex/i);
});

test("keeps legacy routes redirecting", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("redirects", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  for (const legacyRoute of ["/servicos", "/experiencias"]) {
    const response = await worker.fetch(
      new Request(`http://localhost${legacyRoute}`, {
        headers: { accept: "text/html" },
        redirect: "manual",
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

    assert.equal(response.status, 308, `${legacyRoute} should redirect permanently`);
    assert.equal(new URL(response.headers.get("location")).pathname, "/workshop");
  }

  const contactResponse = await worker.fetch(
    new Request("http://localhost/contato", {
      headers: { accept: "text/html" },
      redirect: "manual",
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

  assert.equal(contactResponse.status, 307);
  assert.equal(new URL(contactResponse.headers.get("location")).pathname, "/");
});

test("keeps every internal navigation link reachable", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("link-integrity", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const seedRoutes = [
    "/",
    "/sobre",
    "/workshop",
    "/loja",
    "/cardapio",
    "/blog",
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
