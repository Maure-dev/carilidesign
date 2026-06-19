import { signOut } from "firebase/auth";
import { auth } from "@app/modules/main/services/firebase";
import { useMainProvider } from "@app/modules/main/states/mainProvider";

// Hook compartido de sesión. Lee el estado de auth que MainProvider mantiene
// suscrito a onAuthStateChanged. El rol admin viene del custom claim (no de un campo en DB).
export const useSession = () => {
  const { getMainState } = useMainProvider();
  const { session } = getMainState;

  // Cierra la sesión en Firebase; onAuthStateChanged actualiza el estado a "guest".
  const logout = async (): Promise<void> => {
    if (auth) {
      await signOut(auth);
    }
  };

  return {
    session: session,
    user: session.user,
    loading: session.status === "loading",
    isAuthenticated: session.status === "authenticated",
    isAdmin: Boolean(session.user?.isAdmin),
    logout: logout
  };
};
