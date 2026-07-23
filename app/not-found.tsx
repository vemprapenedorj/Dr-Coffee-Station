import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found" id="conteudo">
      <p className="eyebrow">ERRO 404</p>
      <h1>Essa página saiu para tomar um café.</h1>
      <p>O endereço pode ter mudado ou ainda não existe.</p>
      <div className="not-found__actions">
        <Link className="button button-dark" href="/">
          Voltar ao início
        </Link>
        <Link className="button button-outline" href="/cardapio">
          Ver cardápio
        </Link>
      </div>
    </main>
  );
}
