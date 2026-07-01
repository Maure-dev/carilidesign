import { Check } from "lucide-react";
import IconInterface from "@app/modules/main/interfaces/iconInterface";

type Props = {
  current: number; // 0 = Carrito, 1 = Envío, 2 = Pago
  onNavigate?: (index: number) => void;
};

const STEPS = ["Carrito", "Envío", "Pago"];

// Stepper del flujo de compra. Los pasos ya completados (índice < current) son clickeables
// para volver atrás; el actual se resalta y los siguientes quedan deshabilitados.
export default function CheckoutStepperInterface({ current, onNavigate }: Props) {
  return (
    <ol className="mb-8 flex items-center justify-center">
      {STEPS.map((label, index) => {
        const done = index < current;
        const active = index === current;
        const clickable = done && Boolean(onNavigate);

        return (
          <li key={label} className="flex items-center">
            <button
              type="button"
              disabled={!clickable}
              onClick={() => onNavigate?.(index)}
              className={`flex items-center gap-2 ${clickable ? "cursor-pointer" : "cursor-default"}`}
              aria-current={active ? "step" : undefined}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  active
                    ? "bg-clay text-white"
                    : done
                      ? "bg-clay-deep text-white"
                      : "bg-sand text-ink-soft"
                }`}
              >
                {done ? <IconInterface icon={Check} size="sm" /> : index + 1}
              </span>
              <span
                className={`text-sm ${
                  active ? "font-medium text-ink" : done ? "text-clay-deep" : "text-ink-soft"
                }`}
              >
                {label}
              </span>
            </button>
            {index < STEPS.length - 1 && (
              <span className={`mx-2 h-px w-6 sm:w-12 ${done ? "bg-clay-deep" : "bg-sand"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
