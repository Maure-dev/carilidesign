import LogoInterface from "./logoInterface";

// Pantalla de mantenimiento: se muestra cuando no se pudo traer la data desde Firestore.
export default function MaintenanceInterface() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-canvas px-6 text-center text-ink">
      <LogoInterface />
      <div className="flex max-w-md flex-col gap-3">
        <h1 className="font-display text-3xl text-ink">Volvemos enseguida</h1>
        <p className="text-ink-soft">
          Estamos haciendo tareas de mantenimiento en la tienda. Por favor, intentá nuevamente en
          unos minutos.
        </p>
      </div>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="rounded-buttons bg-clay px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-clay-deep"
      >
        Reintentar
      </button>
    </div>
  );
}
