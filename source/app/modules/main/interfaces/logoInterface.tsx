type Props = {
  className?: string;
  withText?: boolean;
};

// Logo de marca: ícono de la bacha (terracota + grifo + gota) + wordmark apilado
// "Carili" (fuente caligráfica script) sobre "Design" (serif en mayúsculas espaciadas).
export default function LogoInterface({ className = "", withText = true }: Props) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        viewBox="224 78 152 120"
        fill="none"
        role="img"
        aria-label="Carili Design"
        className="h-12 w-auto shrink-0"
      >
        <path d="M230 190 L370 190" stroke="#2a2521" strokeWidth="2.6" strokeLinecap="round" />
        <path
          d="M248 150 C249 173 268 190 300 190 C332 190 351 173 352 150"
          stroke="#c06b4e"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <path d="M248 150 L352 150" stroke="#c06b4e" strokeWidth="2.2" strokeLinecap="round" />
        <path
          d="M350 150 L350 104 C350 88 336 84 320 86 C312 87 306 92 306 104"
          stroke="#2a2521"
          strokeWidth="3.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M306 114 C309 118.5 310.5 122 310.5 125.5 C310.5 129 308 131 306 131 C304 131 301.5 129 301.5 125.5 C301.5 122 303 118.5 306 114 Z"
          fill="#c06b4e"
        />
      </svg>
      {withText && (
        <span className="flex flex-col leading-none">
          <span className="font-script text-[2.1rem] leading-none text-ink">Carili</span>
          <span className="-mt-1 font-display text-[0.6rem] font-semibold uppercase tracking-[0.45em] text-ink">
            Design
          </span>
        </span>
      )}
    </span>
  );
}
