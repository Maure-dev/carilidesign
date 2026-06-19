# carilidesign

Carili Design Store — proyecto frontend **React + Vite + TailwindCSS**

## Stack

- **React 18** + **TypeScript**
- **Vite 6** (bundler)
- **Tailwind CSS v4** vía `@tailwindcss/vite`
- **React Router v7** (routing)
- **Axios** (HTTP, siempre a través de un service tipado)
- **Biome** (linter + formatter)
- **Vitest** + Testing Library (tests)

## Estructura

```
carilidesign/
├── deploy.sh              # Wrapper: corre npm dentro de source/
├── .claude/               # Config de Claude Code
└── source/                # Raíz del proyecto npm
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── biome.json
    └── app/
        ├── index.html     # Entry HTML (raíz de Vite en dev/build)
        ├── index.tsx      # Entry: BrowserRouter + rutas
        ├── index.css      # Tailwind v4 + tema (@theme)
        └── modules/
            ├── main/      # Capa compartida (layout, hooks y UI globales, tests utils)
            └── home/      # Módulo de ejemplo (patrón completo)
```

Cada módulo es independiente y sigue el patrón:
`entities → constants → states (Context + Provider) → services → Module → ModuleProvider → ruta`.
Detalle completo en `.claude/standards/CLAUDE.md`.

## Comandos

Desde la raíz, con el wrapper:

```bash
./deploy.sh install   # instala dependencias (en source/)
./deploy.sh start     # format + lint + dev server
./deploy.sh build     # format + lint + build de producción (source/dist/)
./deploy.sh test      # corre los tests una vez
```

O directamente desde `source/`:

```bash
cd source
npm install
npm start             # format + lint + vite dev (http://localhost:5173)
npm run build
npm run lint
npm run format
npm run typecheck
npm test
npm run test:watch
npm run test:coverage
```

## Path aliases

- `@app/*` → `source/app/*` (configurado en `tsconfig.json` y `vite.config.ts`)

## Variables de entorno

Vite expone solo las variables con prefijo `ENV_` (configurado en `envPrefix`).
