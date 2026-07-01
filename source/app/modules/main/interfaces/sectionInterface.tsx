import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: "section" | "div" | "main";
  width?: "narrow" | "default" | "wide";
  spacing?: "none" | "sm" | "md" | "lg";
  className?: string;
};

const WIDTH = { narrow: "max-w-3xl", default: "max-w-6xl", wide: "max-w-7xl" };
const SPACING = { none: "", sm: "py-8", md: "py-12", lg: "py-16" };

// Contenedor de página: centra, aplica ancho máximo y ritmo vertical consistente.
export default function SectionInterface({
  children,
  as = "section",
  width = "default",
  spacing = "md",
  className = ""
}: Props) {
  const Tag = as;
  return (
    <Tag className={`mx-auto w-full px-4 ${WIDTH[width]} ${SPACING[spacing]} ${className}`}>
      {children}
    </Tag>
  );
}
