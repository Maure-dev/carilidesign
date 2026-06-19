import { useHomeProvider } from "@app/modules/home/states/homeProvider";

// Consume el estado del módulo directamente (componente acoplado al módulo).
export default function HomeFiltersInterface() {
  const { getHomeState, setHomeState } = useHomeProvider();
  const { filters } = getHomeState;

  const handleChange = (value: string): void => {
    setHomeState((s) => ({
      ...s,
      filters: { ...s.filters, search: value }
    }));
  };

  return (
    <input
      type="text"
      value={filters.search}
      onChange={(e) => handleChange(e.target.value)}
      placeholder="Buscar tareas..."
      aria-label="Buscar tareas"
      className="w-full rounded-buttons border border-light-gray px-4 py-2 outline-none focus:border-accent"
    />
  );
}
