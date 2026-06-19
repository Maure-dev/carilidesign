import type { Dispatch, SetStateAction } from "react";

export type AuthModeType = "login" | "register" | "recover";

export type AuthFormType = {
  email: string;
  password: string;
  displayName: string;
};

export type AuthDataType = {
  mode: AuthModeType;
  form: AuthFormType;
  submitting: boolean;
};

export type AuthContextType = {
  getAuthState: AuthDataType;
  setAuthState: Dispatch<SetStateAction<AuthDataType>>;
};
