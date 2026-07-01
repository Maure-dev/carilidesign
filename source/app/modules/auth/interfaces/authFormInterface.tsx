import { Link } from "react-router";
import type { AuthFormType, AuthModeType } from "@app/modules/auth/entities/entities";
import ButtonInterface from "@app/modules/main/interfaces/buttonInterface";
import FieldInterface from "@app/modules/main/interfaces/fieldInterface";
import { InputInterface } from "@app/modules/main/interfaces/inputInterface";

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
      className="flex w-full max-w-sm flex-col gap-4 rounded-card border border-sand bg-surface p-6 shadow-card"
    >
      <h1 className="font-display text-3xl text-ink">{TITLES[mode]}</h1>

      {mode === "register" && (
        <FieldInterface label="Nombre">
          <InputInterface
            type="text"
            autoComplete="name"
            value={form.displayName}
            onChange={(e) => onChange("displayName", e.target.value)}
          />
        </FieldInterface>
      )}

      <FieldInterface label="Email">
        <InputInterface
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </FieldInterface>

      {mode !== "recover" && (
        <FieldInterface label="Contraseña">
          <InputInterface
            type="password"
            required
            minLength={mode === "register" ? 6 : undefined}
            autoComplete={mode === "register" ? "new-password" : "current-password"}
            value={form.password}
            onChange={(e) => onChange("password", e.target.value)}
          />
        </FieldInterface>
      )}

      <ButtonInterface type="submit" block loading={submitting}>
        {submitting ? "Procesando..." : SUBMIT_LABELS[mode]}
      </ButtonInterface>

      {mode !== "recover" && (
        <ButtonInterface
          type="button"
          variant="secondary"
          block
          onClick={onGoogle}
          disabled={submitting}
        >
          Continuar con Google
        </ButtonInterface>
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
