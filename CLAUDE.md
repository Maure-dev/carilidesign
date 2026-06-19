# CLAUDE.md — carilidesign

Carili Design Store. Aplicación frontend React + TypeScript + Vite + Tailwind CSS.

## Stack

- React 18+ con TypeScript
- Vite (bundler)
- Tailwind CSS v4 vía `@tailwindcss/vite`
- React Router (routing declarativo)
- Axios (HTTP, siempre a través de un service tipado)
- Biome (linter + formatter)
- Vitest + Testing Library (tests)

## Layout

- `source/` — raíz del proyecto npm (todo el código vive acá)
- `source/app/` — código de la aplicación
- `deploy.sh` — wrapper que corre los scripts npm dentro de `source/`

```
source/app/
├── index.html              # entry HTML (raíz de Vite en dev/build)
├── index.tsx               # entry: BrowserRouter + rutas
├── index.css               # Tailwind v4 + tema (@theme)
└── modules/
    ├── main/               # capa compartida (layout, hooks/UI globales, tests utils)
    └── [name]/             # un módulo por feature/página
        ├── [name]ModuleProvider.tsx
        ├── [name]Module.tsx
        ├── constants/constants.ts   # INITIAL_STATE
        ├── entities/entities.ts     # todos los tipos del módulo
        ├── states/                  # [name]Context.tsx + [name]Provider.tsx
        ├── services/services.ts     # llamadas Axios tipadas
        ├── hooks/                   # custom hooks
        ├── helpers/                 # funciones puras
        └── interfaces/              # componentes UI del módulo
```

### Reglas de estructura

- Cada módulo es **independiente**: nunca importar `states/`, `services/` ni `hooks/` de otro módulo.
- El módulo `main` es la única capa compartida. Tipos compartidos en `modules/main/entities/entities.ts`.
- Todos los tipos del módulo viven en su `entities/entities.ts`. No crear archivos de tipos sueltos.
- Path alias: `@app/*` → `source/app/*` (configurado en `tsconfig.json` y `vite.config.ts`).

## Patrón de módulo

Orden de creación: **entities → constants → states (Context + Provider) → services → Module → ModuleProvider → ruta**.

| Artifact          | Convención                 | Ejemplo                     |
| ----------------- | -------------------------- | --------------------------- |
| Carpeta           | `camelCase`                | `modules/home/`             |
| ModuleProvider    | `[name]ModuleProvider.tsx` | `homeModuleProvider.tsx`    |
| Module            | `[name]Module.tsx`         | `homeModule.tsx`            |
| Context           | `[name]Context.tsx`        | `homeContext.tsx`           |
| Provider          | `[name]Provider.tsx`       | `homeProvider.tsx`          |
| Provider hook     | `use[Name]Provider`        | `useHomeProvider`           |
| Getter / Setter   | `get[Name]State` / `set[Name]State` | `getHomeState` / `setHomeState` |
| INITIAL_STATE key | `[NAME]_PAGE`              | `HOME_PAGE`                 |
| Interface         | sufijo `Interface`         | `homeListInterface.tsx`     |

## Estado

React Context + `useState` exclusivamente (sin Redux/Zustand).

- Un único `useState` por módulo con todo el estado de la página como objeto.
- Estado inicial en `constants/constants.ts` bajo `INITIAL_STATE.[NAME]_PAGE`.
- El provider expone el par `get[Name]State` / `set[Name]State`.
- Updates siempre con callback: `setState((prev) => ({ ...prev, ... }))`.
- Context: `createContext<[Name]ContextType | null>(null)`. `ChildrenType` desde `modules/main`.

## Routing

- Rutas en `app/index.tsx`, anidadas bajo `MainModuleProvider` (layout raíz con estado global y notificaciones).
- El element de ruta es siempre un `*ModuleProvider`, nunca un `*Module` directo.
- Params vía el hook compartido `useRouter()` (`modules/main/hooks/`), nunca `useParams()` directo.

## Code style

- Biome como único formatter/linter (config en `source/biome.json`): ancho 100, indent 2 espacios, sin trailing commas.
- Sin enums (usar union types o `as const`). Sin `any` (usar `unknown` + type guards). Sin non-null assertions (`!`).
- `import type` para imports de solo tipos. `const` siempre. Igualdad estricta (`===`).
- `strict: false` en tsconfig; los tipos vienen del `entities/entities.ts` del módulo.
- **Código** (variables, funciones, tipos, archivos, services) en **inglés**. **Texto de usuario** y **comentarios** en **español**.
- **Unidades relativas obligatorias**: no usar `px` en CSS propio (usar `rem`, `%`, `vh`/`vw`). Excepciones: SVG `viewBox` y valores internos de `box-shadow`.

## Services

- Todas las llamadas HTTP en `modules/[name]/services/services.ts`, tipadas (request y response) con tipos del propio módulo.
- Devuelven `AxiosResponse<T>`. El manejo de errores va en los hooks (try/catch), no en los services.
- Proxies del backend por proyecto en `vite.config.ts`. Variables de entorno con prefijo `ENV_` (`envPrefix`).

## Tests

- Vitest (runner) + jsdom. `globals: false`: importar `describe`, `it`, `expect` explícitamente desde `"vitest"`.
- Setup: `source/app/modules/main/tests/setup.ts`. Utilidades compartidas en `modules/main/tests/`.
- Naming: `<archivo>.test.ts` para lógica pura, `.test.tsx` para componentes/hooks con JSX. Un test por archivo fuente.

## Comandos

```bash
./deploy.sh install   # instala dependencias en source/
./deploy.sh start     # format + lint + dev server
./deploy.sh build     # format + lint + build de producción (source/dist/)
./deploy.sh test      # corre los tests una vez

# o directo desde source/
npm start · npm run build · npm run lint · npm run format · npm run typecheck · npm test
```
