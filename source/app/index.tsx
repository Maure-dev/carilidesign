import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "./index.css";
import MainModuleProvider from "@app/modules/main/mainModuleProvider";
import HomeModuleProvider from "@app/modules/home/homeModuleProvider";
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
        {/* Rutas planificadas (catálogo, producto, carrito, checkout, auth, cuenta, admin,
            contacto) se agregan en sus fases; hasta entonces caen acá. */}
        <Route path="*" element={<ComingSoonInterface />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
