import { useHomeProvider } from "@app/modules/home/states/homeProvider";
import LoadingInterface from "@app/modules/main/interfaces/loadingInterface";
import EmptyBoxInterface from "@app/modules/main/interfaces/emptyBoxInterface";
import { formatDate } from "@app/modules/home/helpers/formatDate";

export default function HomeListInterface() {
  const { getHomeState } = useHomeProvider();
  const { loading, data, filters } = getHomeState;

  if (loading) {
    return <LoadingInterface />;
  }

  const filtered = data.filter((task) =>
    task.title.toLowerCase().includes(filters.search.toLowerCase())
  );

  if (filtered.length === 0) {
    return <EmptyBoxInterface message="No hay tareas para mostrar." />;
  }

  return (
    <ul className="flex flex-col gap-2">
      {filtered.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between rounded-buttons border border-light-gray px-4 py-3"
        >
          <span className={task.done ? "text-dark-gray line-through" : "text-primary"}>
            {task.title}
          </span>
          <span className="text-sm text-dark-gray">{formatDate(task.createdAt)}</span>
        </li>
      ))}
    </ul>
  );
}
