import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import MainModuleProvider from "@app/modules/main/mainModuleProvider";
import HomeModuleProvider from "@app/modules/home/homeModuleProvider";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("No se encontró el elemento root");
}

ReactDOM.createRoot(rootEl).render(
  <BrowserRouter>
    <Routes>
      {/* Layout raíz: provee estado global, layout y notificaciones */}
      <Route element={<MainModuleProvider />}>
        <Route path="/" element={<HomeModuleProvider />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
