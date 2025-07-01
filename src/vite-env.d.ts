/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_GOOGLE_DOC_ID_FOR_RESUME: string;
  // add other env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
