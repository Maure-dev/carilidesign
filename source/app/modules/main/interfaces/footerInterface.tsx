// Footer del sitio.
export default function FooterInterface() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-sand bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-base text-ink">Carili Design</span>
        <span>Bachas de baño hechas a mano · Argentina</span>
        <span>© {year} Carili Design</span>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-6 text-right text-xs text-ink-soft">
        Diseñado y desarrollado por{" "}
        <a
          href="https://maure-dev.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-clay-deep hover:text-clay"
        >
          Maure-dev
        </a>
      </div>
    </footer>
  );
}
