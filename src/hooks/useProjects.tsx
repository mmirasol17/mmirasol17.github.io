import { useMemo } from "react";
import { TechnologyType } from "../types/TechnologyType";

export interface IProject {
  id: string;
  title: string;
  description: string;
  technologies: TechnologyType[];
  link?: string;
  isPublic: boolean;
  highlights?: string[];
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
        id: "enterprise-saas",
        title: "Enterprise SaaS",
        description:
          "Full-stack enterprise SaaS platform, [SigParser](https://sigparser.com), serving 1,000+ users with AI-powered parsing algorithms, third-party integrations, data enrichment, and statistics tracking for enhanced Contact data.",
        technologies: ["react", "cs", "dotnet", "postgresql", "aws", "terraform", "sagemaker", "bedrock", "huggingface", "jupyter", "python"],
        link: "https://sigparser.com",
        isPublic: false,
        highlights: [
          "Enhanced React.js Table framework with 5x faster component rendering",
          "Integrated Multi-Factor SMS authentication using Twilio's Verify service",
          "Developed geocoding features with AWS Location Service and DynamoDB for 100,000+ locations",
          "Fine-tuned ML parsing models achieving 97% data accuracy with Python and AWS SageMaker",
          "Automated multi-regional ML model deployment using GitHub Actions, AWS Lambda, and Terraform",
          "Wrote PostgreSQL migration scripts for databases with 1,000,000+ rows",
          "Implemented RESTful APIs with SwaggerUI documentation",
        ],
      },
      {
        id: "myorganizer",
        title: "MyOrganizer",
        description: "Application that allows users to organize and visualize their schedule, budget, and tasks all in one dashboard.",
        technologies: ["react", "typescript", "tailwind", "firebase"],
        link: "https://myorganizer.app/",
        isPublic: true,
        highlights: [
          "Built with React.js and TypeScript for type-safe client-side rendering",
          "Custom hooks with React Query for caching, data fetching, and state management",
          "Firebase Authentication for secure user management",
          "Firebase Firestore as NoSQL database for dynamic user data storage",
          "Date-fns JavaScript library for calendar component logic",
          "CI/CD deployment pipeline with GitHub Actions and Firebase Hosting",
        ],
      },
      {
        id: "prouml",
        title: "ProUML",
        description:
          "[CSUSM CapStone](https://www.csusm.edu/ece/engineeringcapstone/index.html) project built to simplify creating and customizing UML diagrams, which supports real-time collaboration, various diagram customizations, structured diagram storage, and Java code-to-diagram translation.",
        technologies: ["react", "typescript", "tailwind", "go", "postgresql"],
        link: "https://prouml.com/",
        isPublic: true,
        highlights: [
          "CSUSM sponsored CapStone project using Agile methodology with documentation",
          "Go backend API that retrieves and parses Java code into UML-tailored JSON",
          "Frontend built with Next.js, TypeScript, and TailwindCSS with custom routing",
          "AntV X6 React library integration for custom UML diagram shapes and styling",
          "Real-time collaboration features for multiple users",
          "Java project import functionality with automatic UML generation",
        ],
      },
      {
        id: "chattington",
        title: "Chattington",
        description: "Chatbot Android mobile application that allows users to have conversations with an automated chatbot, enabled by using OpenAI's Chat Completions API.",
        technologies: ["kotlin", "firebase", "androidstudio"],
        link: "https://github.com/mmirasol17/Chattington",
        isPublic: true,
        highlights: [
          "Android native development using Kotlin programming language",
          "OpenAI Chat Completions API integration for AI-powered conversations",
          "Firebase backend for real-time messaging and data synchronization",
          "User authentication and conversation history persistence",
          "Material Design UI components for modern Android experience",
          "Optimized for various Android device sizes and orientations",
        ],
      },
      {
        id: "gradeapp",
        title: "GradeApp",
        description:
          "Android mobile application that interfaces with the grading system of a [CSUSM](https://www.csusm.edu/) professor's courses to record and update students' grades seamlessly.",
        technologies: ["java", "androidstudio", "bash"],
        isPublic: false,
        highlights: [
          "Android mobile application developed in Java with Android Studio",
          "Direct interface with professor grading systems for seamless integration",
          "Automated grade recording and update functionality",
          "Bash scripting for system automation and data processing",
          "Optimized for tablet use in classroom environments",
          "Secure data handling for academic grade information",
        ],
      },
      {
        id: "attendance-grading-system",
        title: "Attendance Grading System",
        description:
          "System that records and grades attendance with student identification data to efficiently grade attendance and import grades directly into a [CSUSM](https://www.csusm.edu/) professor's gradebook.",
        technologies: ["python", "tkinter", "bash"],
        isPublic: false,
        highlights: [
          "Raspberry Pi desktop application using Python for hardware integration",
          "Automated attendance tracking for 30+ students per session",
          "Student identification data processing and validation",
          "Direct integration with professor gradebooks for automatic grade recording",
          "Bash scripting for system automation and data management",
          "Real-time attendance monitoring and reporting features",
        ],
      },
      {
        id: "mypr200-gui",
        title: "myPR200 GUI",
        description:
          "GUI application built for [MCTSSA](https://www.mctssa.marines.mil/), which processes parsed JSON data from a PR200 electromagnetic spectrum analyzer and visualizes the data in plots used by radio frequency specialists.",
        technologies: ["python", "pyqt"],
        isPublic: false,
        highlights: [
          "PyQt GUI application for electromagnetic spectrum analysis",
          "PR200 electromagnetic spectrum analyzer data parsing and processing",
          "Interactive data visualization with custom plotting capabilities",
          "Specialized tools designed for radio frequency (RF) specialists",
          "Real-time spectrum data processing and analysis",
          "Professional-grade interface for scientific instrumentation",
        ],
      },
      {
        id: "exchangemyideas",
        title: "ExchangeMyIdeas",
        description: "A minimalistic blog website, which allows users to post, reply, and search for blogs.",
        technologies: ["javascript", "html", "css", "php", "mysql"],
        link: "http://www.exchangemyideas.online",
        isPublic: true,
        highlights: [
          "Full-stack web development with custom PHP backend",
          "MySQL database design for blog posts, comments, and user management",
          "JavaScript frontend for dynamic user interactions",
          "Search functionality across blog posts and user replies",
          "Responsive design with HTML and CSS for mobile compatibility",
          "User authentication and content management system",
        ],
      },
      {
        id: "car-database-cli",
        title: "Car Database CLI",
        description:
          "Database command-line interface (CLI), which stores car information using a hash table. The data is locally stored in a .txt file, where the data will be accessed.",
        technologies: ["cpp", "bash"],
        link: "https://github.com/mmirasol17/Car-Database",
        isPublic: true,
        highlights: [
          "Hash table data structure implementation in C++ for efficient storage",
          "Command-line interface (CLI) with intuitive user commands",
          "File-based persistent storage system using .txt files",
          "Efficient data retrieval and manipulation operations",
          "Cross-platform compatibility with Bash scripting",
          "Memory-efficient algorithms for large dataset handling",
        ],
      },
      {
        id: "terminal-tic-tac-toe",
        title: "Tic-Tac-Toe CLI",
        description:
          "Implementation of the Tic-Tac-Toe game, which allows users to play the game directly on your local command-line, such as the Mac Terminal, Windows Command Prompt, etc.",
        technologies: ["cpp", "bash"],
        link: "https://github.com/mmirasol17/Terminal-Tic-Tac-Toe",
        isPublic: true,
        highlights: [
          "Cross-platform C++ implementation for Mac Terminal and Windows Command Prompt",
          "Clean command-line user interface with ASCII graphics",
          "Game state management and win condition detection",
          "Input validation and error handling for robust gameplay",
          "Modular code architecture for easy feature expansion",
        ],
      },
    ];
  }, []);

  return { projects };
}
