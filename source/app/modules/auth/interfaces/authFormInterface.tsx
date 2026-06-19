import { Link } from "react-router";
import type { AuthFormType, AuthModeType } from "@app/modules/auth/entities/entities";
import ButtonInterface from "@app/modules/main/interfaces/buttonInterface";

type Props = {
  mode: AuthModeType;
  form: AuthFormType;
  submitting: boolean;
  onChange: (field: keyof AuthFormType, value: string) => void;
  onSubmit: () => void;
  onGoogle: () => void;
};

const TITLES: Record<AuthModeType, string> = {
  login: "Ingresar",
  register: "Crear cuenta",
  recover: "Recuperar contraseña"
};

const SUBMIT_LABELS: Record<AuthModeType, string> = {
  login: "Ingresar",
  register: "Crear cuenta",
  recover: "Enviar email"
};

export default function AuthFormInterface({
  mode,
  form,
  submitting,
  onChange,
  onSubmit,
  onGoogle
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex w-full max-w-sm flex-col gap-4 rounded-card border border-sand bg-surface p-6"
    >
      <h1 className="font-display text-3xl text-ink">{TITLES[mode]}</h1>

      {mode === "register" && (
        <label className="flex flex-col gap-1">
          <span className="text-sm text-ink">Nombre</span>
          <input
            type="text"
            value={form.displayName}
            onChange={(e) => onChange("displayName", e.target.value)}
            className="rounded-buttons border border-sand bg-canvas px-3 py-2 text-sm outline-none focus:border-clay"
          />
        </label>
      )}

      <label className="flex flex-col gap-1">
        <span className="text-sm text-ink">Email</span>
        <input
          type="email"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
          className="rounded-buttons border border-sand bg-canvas px-3 py-2 text-sm outline-none focus:border-clay"
        />
      </label>

      {mode !== "recover" && (
        <label className="flex flex-col gap-1">
          <span className="text-sm text-ink">Contraseña</span>
          <input
            type="password"
            value={form.password}
            onChange={(e) => onChange("password", e.target.value)}
            className="rounded-buttons border border-sand bg-canvas px-3 py-2 text-sm outline-none focus:border-clay"
          />
        </label>
      )}

      <ButtonInterface type="submit" block disabled={submitting}>
        {submitting ? "Procesando..." : SUBMIT_LABELS[mode]}
      </ButtonInterface>

      {mode !== "recover" && (
        <button
          type="button"
          onClick={onGoogle}
          disabled={submitting}
          className="rounded-buttons border border-sand px-4 py-2.5 text-sm font-medium text-ink hover:bg-sand"
        >
          Continuar con Google
        </button>
      )}

      <div className="flex flex-col gap-1 text-sm text-ink-soft">
        {mode === "login" && (
          <>
            <Link to="/registrarse" className="hover:text-clay-deep">
              ¿No tenés cuenta? Registrate
            </Link>
            <Link to="/recuperar-clave" className="hover:text-clay-deep">
              Olvidé mi contraseña
            </Link>
          </>
        )}
        {mode !== "login" && (
          <Link to="/ingresar" className="hover:text-clay-deep">
            Volver a ingresar
          </Link>
        )}
      </div>
    </form>
  );
}
