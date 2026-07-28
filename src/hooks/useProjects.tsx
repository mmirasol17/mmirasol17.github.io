import { useMemo } from "react";
import { TechnologyType } from "../types/TechnologyType";
import { TerminalAppId } from "../components/Terminal/ProjectTerminal";

export interface IProject {
  id: string;
  title: string;
  description: string;
  technologies: TechnologyType[];
  link?: string;
  isPublic: boolean;
  highlights?: string[];
  /** Screenshots shown as a hover peek and a swipeable flip carousel. Order = display order. Omit for projects with nothing to show. */
  previewImages?: string[];
  /** Interactive CLI reimplementation the card flips to, in place of screenshots. */
  terminal?: TerminalAppId;
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
        previewImages: ["./images/project-previews/enterprise-saas.webp"],
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
        id: "lifelyze",
        title: "Lifelyze",
        description:
          "Cross-platform personal organizer unifying Calendar, Budget, Health, Notes, Reminders, and an AI assistant in one dashboard, shipping to web, iOS, and Android from a shared Expo codebase with native modules and a Go API backend.",
        technologies: ["react", "typescript", "tailwind", "expo", "swift", "kotlin", "go", "firebase", "gcp", "githubactions"],
        link: "https://lifelyze.com",
        isPublic: true,
        previewImages: [
          "./images/project-previews/lifelyze-1.webp",
          "./images/project-previews/lifelyze-2.webp",
          "./images/project-previews/lifelyze-3.webp",
          "./images/project-previews/lifelyze-4.webp",
        ],
        highlights: [
          "Go 1.23 + Gin REST API on Google Cloud Run, backing a React Native + TypeScript app bundled with Metro and exported to static web",
          "Styled with NativeWind 4, compiling Tailwind classes to native styles across web, iOS, and Android",
          "Shared Expo SDK 52 / React Native codebase delivering web, iOS, and Android from one source of truth",
          "Swift modules for HealthKit, WidgetKit home screen widgets, Live Activities, and a companion Apple Watch app with complications",
          "Matching Kotlin modules for Health Connect, five home screen widget providers, a Quick Settings tile, and media notification control",
          "Custom Expo config plugins wiring the native iOS and Android modules into the prebuild pipeline",
          "Two-way Apple Health and Health Connect sync for weights, nutrition, and workouts",
          "Google Calendar bidirectional sync with recurring events and holiday integration",
          "Groq-powered meal, label, and barcode scanning from camera captures with USDA FDC and Open Food Facts lookups",
          "Claude-powered AI insights for calendar scheduling, budget optimization, and health trends",
          "Firebase Auth and Cloud Firestore with backend Web Push for reminders and workout rest timers",
          "CI/CD pipeline with GitHub Actions deploying to Firebase Hosting and Cloud Run",
        ],
      },
      {
        id: "tunelyze",
        title: "Tunelyze",
        description:
          "Smart Spotify playlist builder that syncs your entire library into a sortable, filterable grid of audio features (BPM, energy, valence, danceability), then builds playlists from those filters and exports them back to Spotify.",
        technologies: ["react", "typescript", "tailwind", "vite", "nodejs", "express", "prisma", "postgresql", "supabase", "docker", "digitalocean", "githubactions"],
        link: "https://tunelyze.com",
        isPublic: true,
        previewImages: [
          "./images/project-previews/tunelyze-1.webp",
          "./images/project-previews/tunelyze-2.webp",
          "./images/project-previews/tunelyze-3.webp",
          "./images/project-previews/tunelyze-4.webp",
        ],
        highlights: [
          "Spotify OAuth 2.0 with automatic token refresh and a self-serve access request flow for new users",
          "Full library sync of every playlist and liked song, run as background jobs on a pg-boss queue with live progress streamed to the client",
          "Prisma-modeled PostgreSQL schema of 12 entities tracking songs, play events, playlists, and per-user library state, hosted on Supabase in production",
          "Virtualized TanStack Query song grid rendering thousands of tracks with drag-and-drop playlist ordering via dnd-kit",
          "Claude-powered vibe matching that recommends songs from a playlist's aggregate audio features, with per-user AI usage tracking",
          "Hardened Express API using JWT auth, TOTP two-factor, Helmet, request validation, and rate limiting tuned around Spotify's API quotas",
          "Role-gated admin console for user management, sync job monitoring, and issue reports",
          "Dockerized deployment via GitHub Actions to GHCR, released over SSH to a Caddy-fronted DigitalOcean droplet on merge to main, with Docker Compose Postgres for local development",
          "Self-documenting architecture: ERD and system diagrams regenerated from the Prisma schema and source tree on every build",
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
        previewImages: ["./images/project-previews/prouml-1.webp"],
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
        description:
          "A minimalistic blog website, which allows users to post, reply, and search for blogs. Originally a [CSUSM](https://www.csusm.edu/) CIS444 team project, since rehosted as a subdomain of this site and hardened against SQL injection and XSS.",
        technologies: ["javascript", "html", "css", "php", "mysql"],
        link: "https://exchangemyideas.marinmirasol.com",
        isPublic: true,
        previewImages: [
          "./images/project-previews/exchangemyideas-1.webp",
          "./images/project-previews/exchangemyideas-2.webp",
        ],
        highlights: [
          "Server-rendered PHP application backed by a normalized MySQL schema",
          "Posts and threaded replies linked by foreign key with cascading deletes",
          "Full-text search across post titles, bodies, and author names",
          "Rebuilt every query as a PDO prepared statement, eliminating the original SQL injection holes",
          "Output escaping added throughout to close stored XSS in user-submitted posts and replies",
          "Vanilla JavaScript inline reply forms with no framework dependencies",
          "Restyled to match this portfolio and rehosted at a marinmirasol.com subdomain",
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
        terminal: "tic-tac-toe",
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
