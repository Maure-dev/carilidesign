import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  tone?: "clay" | "sage" | "sand";
};

const TONE = {
  clay: "bg-clay text-white",
  sage: "bg-sage text-ink",
  sand: "bg-sand text-ink-soft"
};

// Etiqueta/badge (p. ej. "Hecho a mano", "Pieza única").
export default function BadgeInterface({ children, tone = "sand" }: Props) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${TONE[tone]}`}>
      {children}
    </span>
  );
}
