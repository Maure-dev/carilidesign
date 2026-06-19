import type { AdminMessageType } from "@app/modules/admin/entities/entities";
import EmptyBoxInterface from "@app/modules/main/interfaces/emptyBoxInterface";

type Props = {
  messages: AdminMessageType[];
  onMarkRead: (id: string) => void;
};

export default function MessagesListInterface({ messages, onMarkRead }: Props) {
  if (messages.length === 0) {
    return <EmptyBoxInterface message="No hay mensajes." />;
  }

  return (
    <ul className="flex flex-col gap-3">
      {messages.map((message) => (
        <li
          key={message.id}
          className={`rounded-card border p-4 ${
            message.read ? "border-sand bg-surface" : "border-clay bg-sand/30"
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium text-ink">
              {message.name} · {message.email}
            </span>
            {!message.read && (
              <button
                type="button"
                onClick={() => onMarkRead(message.id)}
                className="text-sm text-clay-deep hover:text-clay"
              >
                Marcar leído
              </button>
            )}
          </div>
          <p className="mt-2 text-sm text-ink-soft">{message.message}</p>
        </li>
      ))}
    </ul>
  );
}
