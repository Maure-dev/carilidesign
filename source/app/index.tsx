import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "@fontsource/pinyon-script";
import "./index.css";
import MainModuleProvider from "@app/modules/main/mainModuleProvider";
import HomeModuleProvider from "@app/modules/home/homeModuleProvider";
import CatalogModuleProvider from "@app/modules/catalog/catalogModuleProvider";
import ProductModuleProvider from "@app/modules/product/productModuleProvider";
import ContentModuleProvider from "@app/modules/content/contentModuleProvider";
import CartModuleProvider from "@app/modules/cart/cartModuleProvider";
import CheckoutModuleProvider from "@app/modules/checkout/checkoutModuleProvider";
import CheckoutResultModuleProvider from "@app/modules/checkoutResult/checkoutResultModuleProvider";
import AuthModuleProvider from "@app/modules/auth/authModuleProvider";
import AccountModuleProvider from "@app/modules/account/accountModuleProvider";
import AdminModuleProvider from "@app/modules/admin/adminModuleProvider";
import ContactModuleProvider from "@app/modules/contact/contactModuleProvider";
import RequireAuthInterface from "@app/modules/main/interfaces/requireAuthInterface";
import ComingSoonInterface from "@app/modules/main/interfaces/comingSoonInterface";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("No se encontró el elemento root");
}

ReactDOM.createRoot(rootEl).render(
  <BrowserRouter>
    <Routes>
      {/* Layout raíz: estado global, layout y notificaciones */}
      <Route element={<MainModuleProvider />}>
        <Route path="/" element={<HomeModuleProvider />} />
        <Route path="/catalogo" element={<CatalogModuleProvider />} />
        <Route path="/producto/:slug" element={<ProductModuleProvider />} />
        {/* Páginas informativas (un módulo content por slug) */}
        <Route path="/nosotros" element={<ContentModuleProvider />} />
        <Route path="/materiales-y-proceso" element={<ContentModuleProvider />} />
        <Route path="/como-instalar" element={<ContentModuleProvider />} />
        <Route path="/como-lavar" element={<ContentModuleProvider />} />
        <Route path="/preguntas-frecuentes" element={<ContentModuleProvider />} />
        {/* Carrito y checkout */}
        <Route path="/carrito" element={<CartModuleProvider />} />
        <Route path="/checkout" element={<CheckoutModuleProvider />} />
        <Route path="/pago/exito" element={<CheckoutResultModuleProvider />} />
        <Route path="/pago/error" element={<CheckoutResultModuleProvider />} />
        <Route path="/pago/pendiente" element={<CheckoutResultModuleProvider />} />
        {/* Auth (público) */}
        <Route path="/ingresar" element={<AuthModuleProvider />} />
        <Route path="/registrarse" element={<AuthModuleProvider />} />
        <Route path="/recuperar-clave" element={<AuthModuleProvider />} />
        {/* Contacto (público) */}
        <Route path="/contacto" element={<ContactModuleProvider />} />
        {/* Rutas protegidas (requieren sesión) */}
        <Route element={<RequireAuthInterface />}>
          <Route path="/mi-cuenta" element={<AccountModuleProvider />} />
          <Route path="/mis-pedidos/:id" element={<AccountModuleProvider />} />
        </Route>
        {/* Admin (requiere rol admin) */}
        <Route element={<RequireAuthInterface requireAdmin />}>
          <Route path="/admin" element={<AdminModuleProvider />} />
        </Route>
        <Route path="*" element={<ComingSoonInterface />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
