import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "@fontsource/pinyon-script";
import "./index.css";
import MainModuleProvider from "@app/modules/main/mainModuleProvider";
import StorefrontLayoutInterface from "@app/modules/main/interfaces/storefrontLayoutInterface";
import HomeModuleProvider from "@app/modules/home/homeModuleProvider";
import CatalogModuleProvider from "@app/modules/catalog/catalogModuleProvider";
import ProductModuleProvider from "@app/modules/product/productModuleProvider";
import ContentModuleProvider from "@app/modules/content/contentModuleProvider";
import CartModuleProvider from "@app/modules/cart/cartModuleProvider";
import CheckoutModuleProvider from "@app/modules/checkout/checkoutModuleProvider";
import CheckoutResultModuleProvider from "@app/modules/checkoutResult/checkoutResultModuleProvider";
import AuthModuleProvider from "@app/modules/auth/authModuleProvider";
import AccountModuleProvider from "@app/modules/account/accountModuleProvider";
import AdminLayoutModuleProvider from "@app/modules/admin/adminLayoutModuleProvider";
import AdminDashboardModule from "@app/modules/admin/adminDashboardModule";
import AdminProductsModule from "@app/modules/admin/adminProductsModule";
import AdminOrdersModule from "@app/modules/admin/adminOrdersModule";
import AdminContentModule from "@app/modules/admin/adminContentModule";
import AdminMessagesModule from "@app/modules/admin/adminMessagesModule";
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
      {/* Layout raíz: estado global (sesión + bootstrap) y compuerta loader/mantenimiento */}
      <Route element={<MainModuleProvider />}>
        {/* Storefront: chrome (header/footer) */}
        <Route element={<StorefrontLayoutInterface />}>
          <Route path="/" element={<HomeModuleProvider />} />
          <Route path="/catalogo" element={<CatalogModuleProvider />} />
          <Route path="/producto/:slug" element={<ProductModuleProvider />} />
          {/* Páginas informativas (un módulo content por slug) */}
          <Route path="/nosotros" element={<ContentModuleProvider />} />
          <Route path="/materiales-y-proceso" element={<ContentModuleProvider />} />
          <Route path="/como-instalar" element={<ContentModuleProvider />} />
          <Route path="/como-lavar" element={<ContentModuleProvider />} />
          <Route path="/preguntas-frecuentes" element={<ContentModuleProvider />} />
          <Route path="/terminos" element={<ContentModuleProvider />} />
          <Route path="/privacidad" element={<ContentModuleProvider />} />
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
          <Route path="*" element={<ComingSoonInterface />} />
        </Route>

        {/* Admin: shell propio (sidebar + topbar) con rutas hijas, requiere rol admin */}
        <Route element={<RequireAuthInterface requireAdmin />}>
          <Route path="/admin" element={<AdminLayoutModuleProvider />}>
            <Route index element={<AdminDashboardModule />} />
            <Route path="productos" element={<AdminProductsModule />} />
            <Route path="pedidos" element={<AdminOrdersModule />} />
            <Route path="contenido" element={<AdminContentModule />} />
            <Route path="mensajes" element={<AdminMessagesModule />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
