/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_GOOGLE_DOC_ID_FOR_RESUME: string;
  readonly VITE_BUILD_NUMBER: string;
  readonly VITE_COMMIT_SHA: string;
  readonly VITE_GITHUB_REPO_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
