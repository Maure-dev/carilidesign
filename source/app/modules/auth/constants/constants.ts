import type { AuthDataType, AuthModeType } from "@app/modules/auth/entities/entities";

export const ROUTE_TO_MODE: Record<string, AuthModeType> = {
  "/ingresar": "login",
  "/registrarse": "register",
  "/recuperar-clave": "recover"
};

export const INITIAL_STATE = {
  AUTH_PAGE: {
    mode: "login",
    form: { email: "", password: "", displayName: "" },
    submitting: false
  } satisfies AuthDataType
};
