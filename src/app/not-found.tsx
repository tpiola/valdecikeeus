import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5F1F]">404</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-stone-900">
        Página não encontrada
      </h1>
      <p className="mt-3 text-sm text-stone-500">
        O link pode ter expirado ou o endereço está incorreto.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/colecao"
          className="inline-flex min-h-11 items-center rounded-full bg-[#FF5F1F] px-6 text-sm font-bold text-white hover:bg-[#E04E0E]"
        >
          Ver coleção
        </Link>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-full border border-stone-300 px-6 text-sm font-semibold text-stone-900 hover:border-stone-500"
        >
          Ir para a home
        </Link>
      </div>
    </section>
  );
}
