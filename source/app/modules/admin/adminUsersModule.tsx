import { useAdminActions } from "@app/modules/admin/hooks/useAdminActions";
import { useAdminProvider } from "@app/modules/admin/states/adminProvider";
import { useDocumentHead } from "@app/modules/main/hooks/useDocumentHead";
import LoadingInterface from "@app/modules/main/interfaces/loadingInterface";
import { useEffect } from "react";
import UsersListInterface from "./interfaces/usersListInterface";

export default function AdminUsersModule() {
  const { getAdminState } = useAdminProvider();
  const actions = useAdminActions();
  const { loading, users } = getAdminState;

  useDocumentHead({ title: "Usuarios" });

  useEffect(() => {
    actions.handleLoadUsers();
  }, []);

  return (
    <section className="flex flex-col gap-6">
      <h1 className="font-display text-2xl text-ink">Usuarios y roles</h1>
      <p className="text-sm text-ink-soft">
        Asigná o quitá el rol de administrador. Los cambios se aplican al volver a iniciar sesión.
      </p>
      {loading ? (
        <LoadingInterface />
      ) : (
        <UsersListInterface users={users} onSetRole={actions.handleSetRole} />
      )}
    </section>
  );
}
