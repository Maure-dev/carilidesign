import { Link } from "react-router";

// Placeholder para rutas planificadas que aún no fueron implementadas (se reemplazan por fase).
export default function ComingSoonInterface() {
  return (
    <section className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="font-display text-3xl text-ink">Sección en construcción</h1>
      <p className="text-ink-soft">
        Esta parte del sitio todavía está en desarrollo. Volvé pronto.
      </p>
      <Link
        to="/"
        className="rounded-buttons bg-clay px-5 py-2.5 text-sm font-medium text-white hover:bg-clay-deep"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
