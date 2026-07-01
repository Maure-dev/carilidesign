import { INITIAL_STATE } from "@app/modules/main/constants/constants";
import type {
  ChildrenType,
  CurrentUserType,
  MainDataType
} from "@app/modules/main/entities/entities";
import { loadCartItems, saveCartItems } from "@app/modules/main/helpers/cartStorage";
import { fetchSiteBootstrap } from "@app/modules/main/services/bootstrap";
import { auth } from "@app/modules/main/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "./mainContext";

export default function MainProvider({ children }: ChildrenType) {
  const [getMainState, setMainState] = useState<MainDataType>(
    INITIAL_STATE.MAIN_PAGE as MainDataType
  );

  // Hidratar el carrito desde localStorage al montar.
  useEffect(() => {
    const items = loadCartItems();
    setMainState((s) => ({ ...s, cart: { items: items, hydrated: true } }));
  }, []);

  // Persistir el carrito en cada cambio (sólo después de hidratar).
  useEffect(() => {
    if (!getMainState.cart.hydrated) {
      return;
    }
    saveCartItems(getMainState.cart.items);
  }, [getMainState.cart.items, getMainState.cart.hydrated]);

  // Bootstrap: traer contenido + productos desde Firestore antes de mostrar la app.
  // Éxito → status "ready"; falla o sin Firebase → "error" (pantalla de mantenimiento).
  useEffect(() => {
    let active = true;
    fetchSiteBootstrap()
      .then((data) => {
        if (!active) {
          return;
        }
        setMainState((s) => ({
          ...s,
          site: { status: "ready", content: data.content, products: data.products }
        }));
      })
      .catch(() => {
        if (!active) {
          return;
        }
        setMainState((s) => ({ ...s, site: { ...s.site, status: "error" } }));
      });
    return () => {
      active = false;
    };
  }, []);

  // Suscribir el estado de sesión de Firebase Auth.
  useEffect(() => {
    if (!auth) {
      setMainState((s) => ({ ...s, session: { status: "guest", user: null } }));
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) {
        setMainState((s) => ({ ...s, session: { status: "guest", user: null } }));
        return;
      }
      let isAdmin = false;
      try {
        const token = await fbUser.getIdTokenResult();
        isAdmin = token.claims.admin === true;
      } catch {
        isAdmin = false;
      }
      const user: CurrentUserType = {
        uid: fbUser.uid,
        email: fbUser.email,
        displayName: fbUser.displayName,
        photoURL: fbUser.photoURL,
        isAdmin: isAdmin
      };
      setMainState((s) => ({ ...s, session: { status: "authenticated", user: user } }));
    });
    return () => unsubscribe();
  }, []);

  return (
    <MainContext.Provider
      value={{
        getMainState: getMainState,
        setMainState: setMainState
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export const useMainProvider = () => {
  return useContext(MainContext);
};
