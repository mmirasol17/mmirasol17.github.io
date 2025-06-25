import { useMemo } from "react";
import { TechnologyType } from "../types/TechnologyType";

export interface IProject {
  title: string;
  description: string;
  technologies: TechnologyType[];
  link?: string;
  isPublic: boolean;
}

/**
 * Custom hook to retrieve a list of projects.
 * Each project contains a title, description, technologies used, and a link if applicable.
 * (NOTE: In the future, this could be re-factored to fetch data from an API or a database)
 *
 * @returns {Project[]} An array of projects.
 */
export function useProjects() {
  const projects: IProject[] = useMemo(() => {
    return [
      {
        title: "MyOrganizer",
        description: "Web application that allows users to organize and visualize their schedule, budget, and tasks all in one dashboard.",
        technologies: ["react", "typescript", "tailwind", "firebase"],
        link: "https://myorganizer.app/",
        isPublic: true,
      },
      {
        title: "ProUML",
        description:
          "Web application that allows users to create and edit UML diagrams, import Java projects to be translated to UML, and collaborate with other users in real-time.",
        technologies: ["react", "typescript", "tailwind", "go", "postgresql"],
        link: "https://prouml.com/",
        isPublic: true,
      },
      {
        title: "Chattington",
        description: "Chatbot Android mobile application that allows users to have conversations with an automated chatbot, enabled by using OpenAI's Chat Completions API.",
        technologies: ["kotlin", "firebase", "androidstudio"],
        link: "https://github.com/mmirasol17/Chattington",
        isPublic: true,
      },
      {
        title: "GradeApp",
        description: "Android mobile application that interfaces with the grading system of a professor's courses to record and update students' grades seamlessly.",
        technologies: ["java", "androidstudio", "bash"],
        isPublic: false,
      },
      {
        title: "Attendance Grading System",
        description:
          "System that records and grades attendance by receiving identification data from students, then recording their attendance grades directly into a professor's gradebook.",
        technologies: ["python", "bash"],
        isPublic: false,
      },
      {
        title: "myPR200 GUI",
        description:
          "GUI application that processes parsed data from a PR200 electromagnetic spectrum analyzer and visualizes the data in plots used by radio frequency specialists.",
        technologies: ["python", "pyqt"],
        isPublic: false,
      },
      {
        title: "ExchangeMyIdeas",
        description: "A minimalistic blog website, which allows users to post, reply, and search for blogs.",
        technologies: ["javascript", "html", "css", "php", "mysql"],
        link: "http://www.exchangemyideas.online",
        isPublic: true,
      },
      {
        title: "Car Database CLI",
        description:
          "Database command-line interface (CLI), which stores car information using a hash table. The data is locally stored in a .txt file, where the data will be accessed.",
        technologies: ["cpp", "bash"],
        link: "https://github.com/mmirasol17/Car-Database",
        isPublic: true,
      },
      {
        title: "Tic-Tac-Toe CLI",
        description:
          "Implementation of the Tic-Tac-Toe game, which allows users to play the game directly on your local command-line, such as the Mac Terminal, Windows Command Prompt, etc.",
        technologies: ["cpp", "bash"],
        link: "https://github.com/mmirasol17/Terminal-Tic-Tac-Toe",
        isPublic: true,
      },
    ];
  }, []);

  return { projects };
}
