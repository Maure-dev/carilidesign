import type { AuthFormType, AuthModeType } from "@app/modules/auth/entities/entities";
import { useAuthProvider } from "@app/modules/auth/states/authProvider";
import { useNotification } from "@app/modules/main/hooks/useNotification";
import { useRouter } from "@app/modules/main/hooks/useRouter";
import {
  loginEmail,
  loginGoogle,
  logout,
  recoverPassword,
  registerEmail
} from "@app/modules/auth/services/services";
import { translateAuthError } from "@app/modules/auth/helpers/translateAuthError";

export const useAuthActions = () => {
  const { getAuthState, setAuthState } = useAuthProvider();
  const { onNotification } = useNotification();
  const router = useRouter();

  const handleChangeField = (field: keyof AuthFormType, value: string): void => {
    setAuthState((s) => ({ ...s, form: { ...s.form, [field]: value } }));
  };

  const handleSetMode = (mode: AuthModeType): void => {
    setAuthState((s) => ({ ...s, mode: mode }));
  };

  const handleLogin = async (): Promise<void> => {
    const { email, password } = getAuthState.form;
    setAuthState((s) => ({ ...s, submitting: true }));
    try {
      await loginEmail(email, password);
      onNotification(true, "¡Bienvenido/a!");
      router.navigate("/mi-cuenta");
    } catch (error) {
      onNotification(false, translateAuthError(error));
    } finally {
      setAuthState((s) => ({ ...s, submitting: false }));
    }
  };

  const handleRegister = async (): Promise<void> => {
    const { email, password, displayName } = getAuthState.form;
    setAuthState((s) => ({ ...s, submitting: true }));
    try {
      await registerEmail(email, password, displayName);
      onNotification(true, "Cuenta creada con éxito.");
      router.navigate("/mi-cuenta");
    } catch (error) {
      onNotification(false, translateAuthError(error));
    } finally {
      setAuthState((s) => ({ ...s, submitting: false }));
    }
  };

  const handleGoogle = async (): Promise<void> => {
    setAuthState((s) => ({ ...s, submitting: true }));
    try {
      await loginGoogle();
      onNotification(true, "¡Bienvenido/a!");
      router.navigate("/mi-cuenta");
    } catch (error) {
      onNotification(false, translateAuthError(error));
    } finally {
      setAuthState((s) => ({ ...s, submitting: false }));
    }
  };

  const handleRecover = async (): Promise<void> => {
    const { email } = getAuthState.form;
    setAuthState((s) => ({ ...s, submitting: true }));
    try {
      await recoverPassword(email);
      onNotification(true, "Te enviamos un email para restablecer la contraseña.");
      router.navigate("/ingresar");
    } catch (error) {
      onNotification(false, translateAuthError(error));
    } finally {
      setAuthState((s) => ({ ...s, submitting: false }));
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      onNotification(true, "Sesión cerrada.");
      router.navigate("/");
    } catch (error) {
      onNotification(false, translateAuthError(error));
    }
  };

  return {
    handleChangeField,
    handleSetMode,
    handleLogin,
    handleRegister,
    handleGoogle,
    handleRecover,
    handleLogout
  };
};
