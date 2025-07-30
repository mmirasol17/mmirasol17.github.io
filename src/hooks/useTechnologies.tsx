import { ReactNode, useMemo } from "react";
import { TechnologyType } from "../types/TechnologyType";
import { Code, Server, Smartphone, Database, Cloud, Brain } from "lucide-react";
import { IProject, useProjects } from "./useProjects";

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
  projects: IProject[];
}

interface TechnologiesProps {
  iconSize?: "sm" | "lg";
}
export function useTechnologies(props: TechnologiesProps = { iconSize: "lg" }) {
  const { projects } = useProjects();

  const iconClassName = useMemo(() => {
    return props.iconSize === "sm" ? "w-4 h-4" : "w-6 h-6";
  }, [props.iconSize]);

  const technologyCategories: ITechnologyCategory[] = useMemo(
    () => [
      {
        category: "frontend",
        title: "Frontend Development",
        icon: <Code className={iconClassName} />,
        color: "from-blue-500 to-cyan-500",
        technologies: [
          { technology: "react", level: "Expert", projects: projects.filter((p) => p.technologies.includes("react")) },
          { technology: "typescript", level: "Expert", projects: projects.filter((p) => p.technologies.includes("typescript")) },
          { technology: "tailwind", level: "Expert", projects: projects.filter((p) => p.technologies.includes("tailwind")) },
          { technology: "html", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("html")) },
          { technology: "css", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("css")) },
          // { technology: "javascript", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("javascript")) },
        ],
      },
      {
        category: "backend",
        title: "Backend Development",
        icon: <Server className={iconClassName} />,
        color: "from-green-500 to-emerald-500",
        technologies: [
          { technology: "cs", level: "Expert", projects: projects.filter((p) => p.technologies.includes("cs")) },
          { technology: "dotnet", level: "Expert", projects: projects.filter((p) => p.technologies.includes("dotnet")) },
          { technology: "go", level: "Intermediate", projects: projects.filter((p) => p.technologies.includes("go")) },
          { technology: "python", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("python")) },
          { technology: "php", level: "Intermediate", projects: projects.filter((p) => p.technologies.includes("php")) },
          { technology: "cpp", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("cpp")) },
        ],
      },
      {
        category: "database",
        title: "Database & Storage",
        icon: <Database className={iconClassName} />,
        color: "from-orange-500 to-red-500",
        technologies: [
          { technology: "postgresql", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("postgresql")) },
          { technology: "mysql", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("mysql")) },
          { technology: "firebase", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("firebase")) },
        ],
      },
      {
        category: "cloud",
        title: "Cloud & DevOps",
        icon: <Cloud className={iconClassName} />,
        color: "from-yellow-500 to-orange-500",
        technologies: [
          { technology: "aws", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("aws")) },
          { technology: "terraform", level: "Intermediate", projects: projects.filter((p) => p.technologies.includes("terraform")) },
          { technology: "git", level: "Expert", projects: projects.filter((p) => p.technologies.includes("git")) },
          { technology: "bash", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("bash")) },
        ],
      },
      {
        category: "ml",
        title: "Machine Learning",
        icon: <Brain className={iconClassName} />,
        color: "from-pink-500 to-rose-500",
        technologies: [
          { technology: "sagemaker", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("sagemaker")) },
          { technology: "bedrock", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("bedrock")) },
          { technology: "jupyter", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("jupyter")) },
          { technology: "huggingface", level: "Intermediate", projects: projects.filter((p) => p.technologies.includes("huggingface")) },
        ],
      },
      {
        category: "mobile",
        title: "Mobile Development",
        icon: <Smartphone className={iconClassName} />,
        color: "from-purple-500 to-pink-500",
        technologies: [
          { technology: "kotlin", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("kotlin")) },
          { technology: "java", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("java")) },
          { technology: "androidstudio", level: "Advanced", projects: projects.filter((p) => p.technologies.includes("androidstudio")) },
        ],
      },
    ],
    [projects]
  );

  return { technologyCategories };
}
