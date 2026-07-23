# Configuração de SEO e Google

## URL canônica

A URL pública está centralizada em `content/site.ts`, na propriedade `siteConfig.url`.

Quando um domínio próprio for conectado, atualize somente essa propriedade e gere uma nova versão. Sitemap, robots, dados estruturados e metadados passarão a usar o novo domínio.

## Google Search Console

1. Cadastre a URL ou o domínio definitivo no Search Console.
2. Escolha a verificação por tag HTML.
3. Copie apenas o valor de `content` da tag fornecida.
4. Configure a variável de produção `GOOGLE_SITE_VERIFICATION`.
5. Publique uma nova versão e solicite a verificação.
6. Envie `/sitemap.xml` no Search Console.

Não adicione um token fictício ao código.

## Google Analytics

O Google Analytics permanece desativado. Para ativá-lo corretamente, ainda são necessários:

- ID de medição GA4 confirmado;
- política de privacidade;
- definição dos eventos de conversão;
- mecanismo de consentimento;
- configuração de Consent Mode antes do carregamento da tag.

Não basta inserir o ID no site: a coleta deve respeitar a escolha do visitante.

## Google Maps

O perfil oficial da Dr. Coffee Station está configurado em `mapsUrl`, em `content/site.ts`, e é usado nos links de localização e nos dados estruturados da cafeteria.
