import ButtonInterface from "@app/modules/main/interfaces/buttonInterface";

export default function CtaInterface() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col items-center gap-4 rounded-card bg-clay px-6 py-12 text-center text-white">
        <h2 className="font-display text-3xl">Encargá tu pieza única</h2>
        <p className="max-w-prose text-white/90">
          Personalizá medida, esmalte y grabado. Te acompañamos en todo el proceso.
        </p>
        <ButtonInterface to="/catalogo" variant="onDark" size="lg">
          Explorar la colección
        </ButtonInterface>
      </div>
    </section>
  );
}
