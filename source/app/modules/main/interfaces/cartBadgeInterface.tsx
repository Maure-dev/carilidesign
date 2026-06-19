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
        width="1.4rem"
        height="1.4rem"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <path d="M6 7h12l-1 13H7L6 7Z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1 text-xs font-semibold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
