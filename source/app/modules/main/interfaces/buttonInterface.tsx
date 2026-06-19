import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  block?: boolean;
  children: ReactNode;
};

const VARIANT = {
  primary: "bg-clay text-white hover:bg-clay-deep",
  secondary: "border border-clay text-clay-deep hover:bg-sand",
  ghost: "text-ink-soft hover:text-ink"
};

// Botón base del sistema de diseño.
export default function ButtonInterface({
  variant = "primary",
  block = false,
  type = "button",
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-buttons px-5 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT[variant]} ${block ? "w-full" : ""} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
