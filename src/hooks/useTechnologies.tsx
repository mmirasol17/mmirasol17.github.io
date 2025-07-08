import { ReactNode, useMemo } from "react";
import { TechnologyType } from "../types/TechnologyType";
import { Code, Server, Smartphone, Database, Cloud, Brain } from "lucide-react";
import { useProjects } from "./useProjects";

export interface ITechnologyCategory {
  category: string;
  title: string;
  icon: ReactNode;
  color: string;
  technologies: ITechnologyCategoryItem[];
}

export type TechnologyCategoryItemLevel = "Expert" | "Advanced" | "Intermediate" | "Beginner";

export interface ITechnologyCategoryItem {
  technology: TechnologyType;
  level: TechnologyCategoryItemLevel;
  projects: string[];
}

export function useTechnologies() {
  const { projects } = useProjects();

  const technologyCategories: ITechnologyCategory[] = useMemo(
    () => [
      {
        category: "frontend",
        title: "Frontend Development",
        icon: <Code className='w-6 h-6' />,
        color: "from-blue-500 to-cyan-500",
        technologies: [
          { technology: "react", level: "Expert", projects: projects.filter((p) => p.technologies.includes("react")).map((p) => p.title) },
          { technology: "typescript", level: "Expert", projects: projects.filter((p) => p.technologies.includes("typescript")).map((p) => p.title) },
          { technology: "tailwind", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("tailwind")).map((p) => p.title) },
          { technology: "html", level: "Expert", projects: projects.filter((p) => p.technologies.includes("html")).map((p) => p.title) },
          { technology: "css", level: "Expert", projects: projects.filter((p) => p.technologies.includes("css")).map((p) => p.title) },
          { technology: "javascript", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("javascript")).map((p) => p.title) },
        ],
      },
      {
        category: "backend",
        title: "Backend Development",
        icon: <Server className='w-6 h-6' />,
        color: "from-green-500 to-emerald-500",
        technologies: [
          { technology: "cs", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("cs")).map((p) => p.title) },
          { technology: "dotnet", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("dotnet")).map((p) => p.title) },
          { technology: "go", level: "Intermediate", projects: projects.filter((p) => p.technologies.includes("go")).map((p) => p.title) },
          { technology: "python", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("python")).map((p) => p.title) },
          { technology: "php", level: "Intermediate", projects: projects.filter((p) => p.technologies.includes("php")).map((p) => p.title) },
          { technology: "cpp", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("cpp")).map((p) => p.title) },
        ],
      },
      {
        category: "database",
        title: "Database & Storage",
        icon: <Database className='w-6 h-6' />,
        color: "from-orange-500 to-red-500",
        technologies: [
          { technology: "postgresql", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("postgresql")).map((p) => p.title) },
          { technology: "mysql", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("mysql")).map((p) => p.title) },
          { technology: "firebase", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("firebase")).map((p) => p.title) },
        ],
      },
      {
        category: "cloud",
        title: "Cloud & DevOps",
        icon: <Cloud className='w-6 h-6' />,
        color: "from-yellow-500 to-orange-500",
        technologies: [
          { technology: "aws", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("aws")).map((p) => p.title) },
          { technology: "terraform", level: "Intermediate", projects: projects.filter((p) => p.technologies.includes("terraform")).map((p) => p.title) },
          { technology: "git", level: "Expert", projects: projects.filter((p) => p.technologies.includes("git")).map((p) => p.title) },
          { technology: "bash", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("bash")).map((p) => p.title) },
        ],
      },
      {
        category: "ml",
        title: "Machine Learning",
        icon: <Brain className='w-6 h-6' />,
        color: "from-pink-500 to-rose-500",
        technologies: [
          { technology: "sagemaker", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("sagemaker")).map((p) => p.title) },
          { technology: "bedrock", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("bedrock")).map((p) => p.title) },
          { technology: "jupyter", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("jupyter")).map((p) => p.title) },
          { technology: "huggingface", level: "Intermediate", projects: projects.filter((p) => p.technologies.includes("huggingface")).map((p) => p.title) },
        ],
      },
      {
        category: "mobile",
        title: "Mobile Development",
        icon: <Smartphone className='w-6 h-6' />,
        color: "from-purple-500 to-pink-500",
        technologies: [
          { technology: "kotlin", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("kotlin")).map((p) => p.title) },
          { technology: "java", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("java")).map((p) => p.title) },
          { technology: "androidstudio", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("androidstudio")).map((p) => p.title) },
        ],
      },
    ],
    [projects]
  );

  return { technologyCategories };
}
