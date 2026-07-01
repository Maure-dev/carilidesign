import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@app/modules/main/hooks/useCart";
import IconInterface from "./iconInterface";

// Ícono de carrito con contador. Pulsa cuando aumenta la cantidad (feedback de "agregado").
export default function CartBadgeInterface() {
  const { getCount } = useCart();
  const count = getCount();
  const prev = useRef(count);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    if (count > prev.current) {
      setPulseKey((k) => k + 1);
    }
    prev.current = count;
  }, [count]);

  return (
    <Link
      to="/carrito"
      aria-label={`Carrito, ${count} ${count === 1 ? "ítem" : "ítems"}`}
      className="relative inline-flex items-center text-ink transition-colors hover:text-clay-deep"
    >
      <span
        key={pulseKey}
        className={pulseKey > 0 ? "inline-flex animate-pulse-once" : "inline-flex"}
      >
        <IconInterface icon={ShoppingCart} size="lg" />
      </span>
      {count > 0 && (
        <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1 text-xs font-semibold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
