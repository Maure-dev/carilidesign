import HomeProvider from "@app/modules/home/states/homeProvider";
import HomeModule from "./homeModule";

// Entrypoint de ruta: envuelve el provider del módulo alrededor del Module.
export default function HomeModuleProvider() {
  return (
    <HomeProvider>
      <HomeModule />
    </HomeProvider>
  );
}
