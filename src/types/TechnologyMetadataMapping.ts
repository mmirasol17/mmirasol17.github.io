import { TechnologyMetadata } from "./TechnologyMetadata";
import { TechnologyType } from "./TechnologyType";

/**
 * Mapping of technology types to their metadata.
 * This mapping is used to provide information about each technology,
 * such as its name and URL.
 */
export const TechnologyMetadataMapping: Record<TechnologyType, TechnologyMetadata> = {
  androidstudio: {
    name: "Android Studio",
    url: "https://developer.android.com/studio",
  },
  aws: {
    name: "AWS",
    url: "https://aws.amazon.com/",
  },
  bash: {
    name: "Bash",
    url: "https://www.gnu.org/software/bash/manual/bash.html#What-is-Bash_003f",
  },
  bedrock: {
    name: "AWS Bedrock",
    url: "https://aws.amazon.com/bedrock/",
  },
  cpp: {
    name: "C++",
    url: "https://www.cplusplus.com/",
  },
  cs: {
    name: "C#",
    url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
  },
  css: {
    name: "CSS",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  dotnet: {
    name: "ASP.NET",
    url: "https://dotnet.microsoft.com/en-us/apps/aspnet",
  },
  firebase: {
    name: "Firebase",
    url: "https://firebase.google.com/",
  },
  gcp: {
    name: "GCP",
    url: "https://cloud.google.com/",
  },
  git: {
    name: "Git",
    url: "https://git-scm.com/",
  },
  githubactions: {
    name: "GitHub Actions",
    url: "https://docs.github.com/en/actions",
  },
  githubdesktop: {
    name: "GitHub Desktop",
    url: "https://desktop.github.com/",
  },
  githubpages: {
    name: "GitHub Pages",
    url: "https://pages.github.com/",
  },
  go: {
    name: "Golang",
    url: "https://go.dev/",
  },
  html: {
    name: "HTML",
    url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics",
  },
  huggingface: {
    name: "Hugging Face",
    url: "https://huggingface.co/",
  },
  java: {
    name: "Java",
    url: "https://www.java.com/en/",
  },
  javascript: {
    name: "JavaScript",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
  },
  jetbrains: {
    name: "JetBrains",
    url: "https://www.jetbrains.com/",
  },
  jupyter: {
    name: "Jupyter",
    url: "https://jupyter.org/",
  },
  kotlin: {
    name: "Kotlin",
    url: "https://kotlinlang.org/",
  },
  mysql: {
    name: "MySQL",
    url: "https://www.mysql.com/",
  },
  php: {
    name: "PHP",
    url: "https://www.php.net/",
  },
  postgresql: {
    name: "PostgreSQL",
    url: "https://www.postgresql.org/",
  },
  pyqt: {
    name: "PyQt",
    url: "https://doc.qt.io/qtforpython-6/",
  },
  python: {
    name: "Python",
    url: "https://www.python.org/",
  },
  react: {
    name: "React.js",
    url: "https://react.dev/",
  },
  sagemaker: {
    name: "AWS SageMaker",
    url: "https://aws.amazon.com/sagemaker/",
  },
  sql: {
    name: "SQL",
    url: "https://www.w3schools.com/sql/",
  },
  swift: {
    name: "Swift",
    url: "https://developer.apple.com/swift/",
  },
  tailwind: {
    name: "TailwindCSS",
    url: "https://tailwindcss.com/",
  },
  terraform: {
    name: "Terraform",
    url: "https://www.terraform.io/",
  },
  typescript: {
    name: "TypeScript",
    url: "https://www.typescriptlang.org/",
  },
  vite: {
    name: "Vite",
    url: "https://vitejs.dev/",
  },
  vscode: {
    name: "VSCode",
    url: "https://code.visualstudio.com/",
  },
};
