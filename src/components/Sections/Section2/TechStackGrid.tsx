import { useMemo } from "react";
import { TechStack } from "../../../types/TechStack";

export function TechStackGrid() {
  const techStack: TechStack[] = useMemo(() => {
    return [
      {
        name: "React.js",
        icon: (
          <img
            className='w-12 h-12'
            src='./icons/tech-stack/react.svg'
            alt='React.js'
          />
        ),
        url: "https://react.dev/",
      },
      { name: "TypeScript", icon: "📘", url: "https://www.typescriptlang.org/" },
      { name: "PHP", icon: "🐘", url: "https://www.php.net/" },
      { name: "C#", icon: "🔷", url: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
      { name: "ASP.NET", icon: "🌐", url: "https://dotnet.microsoft.com/en-us/apps/aspnet" },
      { name: "HTML", icon: "📄", url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics" },
      { name: "CSS", icon: "🎨", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { name: "TailwindCSS", icon: "💨", url: "https://tailwindcss.com/" },
      { name: "C++", icon: "⚡", url: "https://www.cplusplus.com/" },
      { name: "Python", icon: "🐍", url: "https://www.python.org/" },
      { name: "PyQt", icon: "🖼️", url: "https://doc.qt.io/qtforpython-6/" },
      { name: "Kotlin", icon: "🤖", url: "https://kotlinlang.org/" },
      { name: "Java", icon: "☕", url: "https://www.java.com/en/" },
      { name: "Bash", icon: "💻", url: "https://www.gnu.org/software/bash/manual/bash.html#What-is-Bash_003f" },
      { name: "MySQL", icon: "🗄️", url: "https://www.mysql.com/" },
      { name: "PostgreSQL", icon: "🐘", url: "https://www.postgresql.org/" },
      { name: "Git", icon: "📝", url: "https://git-scm.com/" },
      { name: "AWS", icon: "☁️", url: "https://aws.amazon.com/" },
      { name: "Firebase", icon: "🔥", url: "https://firebase.google.com/" },
      { name: "Android Studio", icon: "📱", url: "https://developer.android.com/studio" },
    ];
  }, []);

  return (
    <div className='mb-8'>
      <h3 className='text-3xl font-bold mb-4 text-center text-blue-400'>My Tech Stack</h3>
      <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 text-xs font-bold justify-center'>
        {techStack.map((tech) => (
          <a
            key={tech.name}
            href={tech.url}
            target='_blank'
            rel='noopener noreferrer'
            className='flex flex-col rounded-2xl bg-gradient-to-br from-gray-400 to-gray-700 p-4 transition hover:scale-105 justify-center items-center text-center text-white'
          >
            <div className='text-3xl mb-2'>{tech.icon}</div>
            {tech.name}
          </a>
        ))}
      </div>
    </div>
  );
}
