import { useCallback, useMemo } from "react";
import { Project } from "../../../types/Project";
import { AnimatedSection } from "../../AnimatedSection";

export function ProjectsSection() {
  const projects: Project[] = useMemo(() => {
    return [
      {
        title: "MyOrganizer",
        description: "Web application that allows users to organize and visualize their schedule, budget, and tasks all in one dashboard.",
        technologies: ["TailwindCSS", "React", "TypeScript", "Firebase"],
        link: "https://myorganizer.app/",
        isPublic: true,
      },
      {
        title: "ProUML",
        description:
          "Web application that allows users to create and edit UML diagrams, import Java projects to be translated to UML, and collaborate with other users in real-time.",
        technologies: ["TailwindCSS", "React", "TypeScript", "Go", "PostgreSQL"],
        link: "https://prouml.com/",
        isPublic: true,
      },
      {
        title: "Chattington",
        description: "Chatbot Android mobile application that allows users to have conversations with an automated chatbot, enabled by using OpenAI's Chat Completions API.",
        technologies: ["Android Studio", "Kotlin", "Firebase"],
        link: "https://github.com/mmirasol17/Chattington",
        isPublic: true,
      },
      {
        title: "GradeApp",
        description: "Android mobile application that interfaces with the grading system of a professor's courses to record and update students' grades seamlessly.",
        technologies: ["Android Studio", "Java"],
        isPublic: false,
      },
      {
        title: "Attendance Grading System",
        description:
          "System that records and grades attendance by receiving identification data from students, then recording their attendance grades directly into a professor's gradebook.",
        technologies: ["Python", "Bash"],
        isPublic: false,
      },
      {
        title: "myPR200 GUI",
        description:
          "GUI application that processes parsed data from a PR200 electromagnetic spectrum analyzer and visualizes the data in plots used by radio frequency specialists.",
        technologies: ["Python", "PyQt"],
        isPublic: false,
      },
      {
        title: "ExchangeMyIdeas",
        description: "A minimalistic blog website, which allows users to post, reply, and search for blogs.",
        technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
        link: "http://www.exchangemyideas.online",
        isPublic: true,
      },
      {
        title: "Car Database CLI",
        description:
          "Database command-line interface (CLI), which stores car information using a hash table. The data is locally stored in a .txt file, where the data will be accessed.",
        technologies: ["C++", "Bash"],
        link: "https://github.com/mmirasol17/Car-Database",
        isPublic: true,
      },
      {
        title: "Tic-Tac-Toe CLI",
        description:
          "Implementation of the Tic-Tac-Toe game, which allows users to play the game directly on your local command-line, such as the Mac Terminal, Windows Command Prompt, etc.",
        technologies: ["C++", "Bash"],
        link: "https://github.com/mmirasol17/Terminal-Tic-Tac-Toe",
        isPublic: true,
      },
    ];
  }, []);

  const getTechIcon = useCallback((tech: string): string => {
    const iconMap: { [key: string]: string } = {
      TailwindCSS: "💨",
      React: "⚛️",
      TypeScript: "📘",
      Firebase: "🔥",
      Go: "🐹",
      PostgreSQL: "🐘",
      "Android Studio": "📱",
      Kotlin: "🤖",
      Java: "☕",
      Python: "🐍",
      Bash: "💻",
      PyQt: "🖼️",
      HTML: "📄",
      CSS: "🎨",
      JavaScript: "⚡",
      PHP: "🐘",
      MySQL: "🗄️",
      "C++": "⚡",
    };
    return iconMap[tech] || "🔧";
  }, []);

  return (
    <AnimatedSection
      id='projects'
      className='py-16 px-4 bg-gradient-to-b from-blue-800 via-blue-900 to-gray-900'
    >
      <div className='container mx-auto'>
        <h2 className='text-5xl font-bold text-blue-400 text-center mb-8'>My Projects</h2>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm lg:text-base'>
          {projects.map((project, index) => (
            <div
              key={index + project.title}
              className='text-center bg-gray-600 rounded-2xl p-4 shadow-2xl bg-gradient-to-br from-gray-400 to-gray-700 flex flex-col justify-between'
            >
              <div>
                <h3 className='text-2xl font-bold text-white mb-2'>{project.title}</h3>
                <p className='text-white font-light mb-2'>{project.description}</p>
                <div className='flex flex-wrap items-center gap-2 justify-center mb-2'>
                  {project.technologies.map((tech, techIndex) => (
                    <div
                      key={techIndex + tech}
                      className='flex flex-col items-center'
                    >
                      <div className='text-2xl'>{getTechIcon(tech)}</div>
                      <span className='text-xs'>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
              {project.isPublic && project.link ? (
                <a
                  href={project.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-400 underline text-lg transition hover:scale-110'
                >
                  View Project
                </a>
              ) : (
                <span className='text-blue-400 text-lg'>Not Open-Sourced / Publicly Available</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
