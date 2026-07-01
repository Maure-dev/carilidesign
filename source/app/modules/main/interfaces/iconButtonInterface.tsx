import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "ghost" | "solid" | "subtle";
type Size = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  // aria-label obligatorio: los botones de solo ícono deben tener nombre accesible.
  label: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

const VARIANT = {
  ghost: "text-ink-soft hover:bg-sand hover:text-ink",
  solid: "bg-clay text-white hover:bg-clay-deep",
  subtle: "border border-sand text-ink hover:bg-sand"
};

const SIZE = { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-11 w-11" };

// Botón de solo ícono con área táctil y foco consistentes.
export default function IconButtonInterface({
  label,
  variant = "ghost",
  size = "md",
  type = "button",
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={`inline-flex shrink-0 items-center justify-center rounded-buttons transition-[background-color,color,transform] duration-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT[variant]} ${SIZE[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
