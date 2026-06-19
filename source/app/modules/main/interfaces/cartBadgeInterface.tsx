import { Link } from "react-router";
import { useCart } from "@app/modules/main/hooks/useCart";

// Ícono de carrito con contador. Lee el estado compartido del carrito (MainData).
export default function CartBadgeInterface() {
  const { getCount } = useCart();
  const count = getCount();

  return (
    <Link
      to="/carrito"
      aria-label={`Carrito, ${count} ${count === 1 ? "ítem" : "ítems"}`}
      className="relative inline-flex items-center text-ink hover:text-clay-deep"
    >
      <svg
        viewBox="0 0 24 24"
        width="1.5rem"
        height="1.5rem"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="9" cy="20" r="1.4" />
        <circle cx="18" cy="20" r="1.4" />
        <path d="M2.5 3.5 H5 L7 15 H19 L21 7 H6" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1 text-xs font-semibold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
