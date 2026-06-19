import { useEffect } from "react";
import { useRouter } from "@app/modules/main/hooks/useRouter";
import { useDocumentHead } from "@app/modules/main/hooks/useDocumentHead";
import { useAuthProvider } from "@app/modules/auth/states/authProvider";
import { useAuthActions } from "@app/modules/auth/hooks/useAuthActions";
import { ROUTE_TO_MODE } from "@app/modules/auth/constants/constants";
import AuthFormInterface from "@app/modules/auth/interfaces/authFormInterface";

export default function AuthModule() {
  const router = useRouter();
  const mode = ROUTE_TO_MODE[router.pathname] ?? "login";
  const { getAuthState } = useAuthProvider();
  const {
    handleChangeField,
    handleSetMode,
    handleLogin,
    handleRegister,
    handleGoogle,
    handleRecover
  } = useAuthActions();
  const { form, submitting } = getAuthState;

  useDocumentHead({ title: mode === "register" ? "Crear cuenta" : "Ingresar" });

  useEffect(() => {
    handleSetMode(mode);
  }, [mode]);

  const onSubmit =
    mode === "register" ? handleRegister : mode === "recover" ? handleRecover : handleLogin;

  return (
    <section className="mx-auto flex max-w-sm justify-center px-4 py-16">
      <AuthFormInterface
        mode={mode}
        form={form}
        submitting={submitting}
        onChange={handleChangeField}
        onSubmit={onSubmit}
        onGoogle={handleGoogle}
      />
    </section>
  );
}
