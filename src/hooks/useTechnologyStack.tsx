import { useMemo } from "react";
import { TechnologyType } from "../types/TechnologyType";

/**
 * Custom hook to get the tech stack used in the application.
 * Returns an array of tech stack objects, each containing a name, icon, and URL.
 * (NOTE: In the future, this could be re-factored to fetch data from an API or a database)
 *
 * @returns {ITechnologyStackItem[]} Array of tech stack objects.
 */
export function useTechnologyStack() {
  const technologyStack: TechnologyType[] = useMemo(() => {
    return [
      "react",
      "typescript",
      "terraform",
      "cs",
      "dotnet",
      "html",
      "css",
      "tailwind",
      "cpp",
      "python",
      "pyqt",
      "kotlin",
      "java",
      "bash",
      "mysql",
      "postgresql",
      "git",
      "aws",
      "firebase",
      "androidstudio",
    ];
  }, []);

  return { technologyStack };
}
