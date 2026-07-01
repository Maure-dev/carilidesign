type Props = {
  className?: string;
  rounded?: "sm" | "md" | "full";
};

const ROUNDED = { sm: "rounded-buttons", md: "rounded-card", full: "rounded-full" };

// Bloque de carga (placeholder) que respeta prefers-reduced-motion vía la guardia global.
export function SkeletonInterface({ className = "", rounded = "md" }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-sand/70 ${ROUNDED[rounded]} ${className}`}
    />
  );
}

// Skeleton con la forma real de una card de producto (evita saltos de layout).
export function ProductCardSkeletonInterface() {
  return (
    <div className="flex flex-col gap-3">
      <SkeletonInterface className="aspect-[4/5] w-full" />
      <SkeletonInterface rounded="sm" className="h-4 w-3/4" />
      <SkeletonInterface rounded="sm" className="h-4 w-1/3" />
    </div>
  );
}
