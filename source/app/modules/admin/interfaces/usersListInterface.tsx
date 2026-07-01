import type { AdminUserType } from "@app/modules/admin/entities/entities";
import BadgeInterface from "@app/modules/main/interfaces/badgeInterface";
import ButtonInterface from "@app/modules/main/interfaces/buttonInterface";
import EmptyBoxInterface from "@app/modules/main/interfaces/emptyBoxInterface";

type Props = {
  users: AdminUserType[];
  onSetRole: (uid: string, admin: boolean) => void;
};

export default function UsersListInterface({ users, onSetRole }: Props) {
  if (users.length === 0) {
    return <EmptyBoxInterface message="No hay usuarios registrados." />;
  }

  return (
    <div className="overflow-x-auto rounded-card border border-sand">
      <table className="w-full min-w-[36rem] text-sm">
        <thead className="border-b border-sand bg-surface text-left text-xs uppercase tracking-wide text-ink-soft">
          <tr>
            <th className="px-4 py-3 font-medium">Usuario</th>
            <th className="px-4 py-3 font-medium">Rol</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid} className="border-t border-sand">
              <td className="px-4 py-3">
                <div className="flex flex-col">
                  <span className="font-medium text-ink">{user.displayName || "—"}</span>
                  <span className="text-xs text-ink-soft">{user.email}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <BadgeInterface tone={user.isAdmin ? "clay" : "sand"}>
                  {user.isAdmin ? "Admin" : "Usuario"}
                </BadgeInterface>
              </td>
              <td className="px-4 py-3 text-right">
                {user.isAdmin ? (
                  <ButtonInterface
                    variant="secondary"
                    size="sm"
                    onClick={() => onSetRole(user.uid, false)}
                  >
                    Quitar admin
                  </ButtonInterface>
                ) : (
                  <ButtonInterface size="sm" onClick={() => onSetRole(user.uid, true)}>
                    Hacer admin
                  </ButtonInterface>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
