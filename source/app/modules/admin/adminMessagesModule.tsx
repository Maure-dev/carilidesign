import { useAdminActions } from "@app/modules/admin/hooks/useAdminActions";
import { useAdminProvider } from "@app/modules/admin/states/adminProvider";
import { useDocumentHead } from "@app/modules/main/hooks/useDocumentHead";
import LoadingInterface from "@app/modules/main/interfaces/loadingInterface";
import { useEffect } from "react";
import MessagesListInterface from "./interfaces/messagesListInterface";

export default function AdminMessagesModule() {
  const { getAdminState } = useAdminProvider();
  const actions = useAdminActions();
  const { loading, messages } = getAdminState;

  useDocumentHead({ title: "Mensajes" });

  useEffect(() => {
    actions.handleLoadMessages();
  }, []);

  return (
    <section className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-ink">Mensajes</h1>
      {loading ? (
        <LoadingInterface />
      ) : (
        <MessagesListInterface messages={messages} onMarkRead={actions.handleMarkRead} />
      )}
    </section>
  );
}
