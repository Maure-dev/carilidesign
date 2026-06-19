import CheckoutProvider from "@app/modules/checkout/states/checkoutProvider";
import CheckoutModule from "./checkoutModule";

export default function CheckoutModuleProvider() {
  return (
    <CheckoutProvider>
      <CheckoutModule />
    </CheckoutProvider>
  );
}
