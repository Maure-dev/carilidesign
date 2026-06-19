import CartModule from "./cartModule";

// El estado del carrito vive en el módulo main (useCart), por eso este provider
// sólo renderiza el módulo.
export default function CartModuleProvider() {
  return <CartModule />;
}
