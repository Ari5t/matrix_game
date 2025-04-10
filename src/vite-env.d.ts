/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ROWS: string
  readonly VITE_COLS: string
  readonly VITE_GENERATION_TIME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
