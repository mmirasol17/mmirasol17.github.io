import { IProject } from "../hooks/useProjects";

export function handleScrollToElementById(id: string) {
  const element = document.getElementById(id);
  if (element) {
    const navbar = document.querySelector(".navbar");
    const offset = navbar ? navbar.clientHeight : 64;
    window.scrollTo({
      top: element.offsetTop - offset,
      behavior: "smooth",
    });
  }
}

export function getProjectStatusColor(status: string) {
  switch (status) {
    case "Open Source":
      return "bg-purple-500";
    case "Live Production":
      return "bg-green-500";
    case "Public":
      return "bg-blue-500";
    case "Private/Academic":
      return "bg-pink-500";
    default:
      return "bg-gray-500";
  }
}

// Helper function to get project status
export function getProjectStatus(project: IProject): string {
  if (project.link) {
    if (project.link.includes("github.com")) {
      return "Open Source";
    } else {
      return "Live Production";
    }
  } else if (project.isPublic) {
    return "Public";
  } else {
    return "Private/Academic";
  }
}

// Helper function to get project type
export function getProjectType(project: IProject): string {
  if (project.technologies.includes("react") || project.technologies.includes("javascript") || project.technologies.includes("html")) {
    return "Web Application";
  } else if (project.technologies.includes("kotlin") || (project.technologies.includes("java") && project.technologies.includes("androidstudio"))) {
    return "Mobile App";
  } else if (project.technologies.includes("python") && (project.technologies.includes("pyqt") || project.technologies.includes("tkinter"))) {
    return "Desktop App";
  } else if (project.technologies.includes("cpp") || project.technologies.includes("bash")) {
    return "CLI Tool";
  } else {
    return "Application";
  }
}
