/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_GOOGLE_DOCS_DOCUMENT_ID: string;
  // add other env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
