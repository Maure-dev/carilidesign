import { Link } from "react-router";

export default function CtaInterface() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col items-center gap-4 rounded-card bg-clay px-6 py-12 text-center text-white">
        <h2 className="font-display text-3xl">Encargá tu pieza única</h2>
        <p className="max-w-prose text-white/90">
          Personalizá medida, esmalte y grabado. Te acompañamos en todo el proceso.
        </p>
        <Link
          to="/catalogo"
          className="rounded-buttons bg-white px-6 py-3 text-sm font-medium text-clay-deep transition-colors hover:bg-canvas"
        >
          Explorar la colección
        </Link>
      </div>
    </section>
  );
}
