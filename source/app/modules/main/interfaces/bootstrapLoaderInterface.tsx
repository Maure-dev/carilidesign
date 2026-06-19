import LogoInterface from "./logoInterface";

// Loader general a pantalla completa mientras se trae la data inicial de Firestore.
export default function BootstrapLoaderInterface() {
  return (
    <div
      role="status"
      aria-label="Cargando"
      className="flex min-h-screen flex-col items-center justify-center gap-6 bg-canvas text-ink"
    >
      <LogoInterface />
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-sand border-t-clay" />
    </div>
  );
}
