import { useEffect } from "react";
import { useHomeActions } from "@app/modules/home/hooks/useHomeActions";
import HomeFiltersInterface from "@app/modules/home/interfaces/homeFiltersInterface";
import HomeListInterface from "@app/modules/home/interfaces/homeListInterface";

// Componente de página: consume el provider y compone las interfaces.
export default function HomeModule() {
  const { handleLoadTasks } = useHomeActions();

  useEffect(() => {
    handleLoadTasks();
  }, []);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">Tareas</h1>
      <HomeFiltersInterface />
      <HomeListInterface />
    </main>
  );
}
