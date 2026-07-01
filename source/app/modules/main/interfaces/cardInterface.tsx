import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: "div" | "section" | "article";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
};

const PAD = { none: "", sm: "p-4", md: "p-5", lg: "p-6" };

// Superficie de card del sistema de diseño (borde sand + surface + elevación en reposo).
export default function CardInterface({
  children,
  as = "div",
  padding = "md",
  className = ""
}: Props) {
  const Tag = as;
  return (
    <Tag
      className={`rounded-card border border-sand bg-surface shadow-card ${PAD[padding]} ${className}`}
    >
      {children}
    </Tag>
  );
}
