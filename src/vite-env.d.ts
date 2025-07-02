/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_GOOGLE_DOC_ID_FOR_RESUME: string;
  readonly VITE_BUILD_NUMBER: string;
  readonly VITE_COMMIT_SHA: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
