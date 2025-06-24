import React, { useMemo } from "react";
import { AnimatedSection } from "../../AnimatedSection";

export function FunFactSection() {
  const tools = useMemo(() => {
    return [
      { name: "React", icon: "⚛️", url: "https://react.dev/" },
      { name: "TypeScript", icon: "📘", url: "https://www.typescriptlang.org/" },
      { name: "TailwindCSS", icon: "💨", url: "https://tailwindcss.com/" },
      { name: "GitHub", icon: "🐙", url: "https://pages.github.com/" },
    ];
  }, []);

  return (
    <AnimatedSection
      id='fact'
      className='py-16 px-8 bg-gradient-to-b from-blue-800 via-blue-900 to-gray-900'
    >
      <div className='container mx-auto max-w-4xl'>
        <div className='rounded-3xl p-8 shadow-2xl bg-gradient-to-br from-gray-400 to-gray-700'>
          <div>
            <h2 className='text-4xl font-bold mb-4 text-white text-center'>Fun Fact!</h2>
            <p className='text-white font-light md:text-lg mb-8 text-center'>
              I built this portfolio using React, TypeScript, TailwindCSS, and modern web technologies! I used React to handle the component logic and state management, TypeScript
              for type safety, and TailwindCSS to style the components with a responsive design.
            </p>
            <p className='text-white font-light md:text-lg mb-8 text-center'>
              If you are building a website, I highly recommend trying out some of these tools, as they are very easy to use, make development much more efficient, and are very
              powerful!
            </p>
            <p className='text-white font-light md:text-lg mb-8 text-center'>
              Feel free to <span className='underline'>click</span> on any of the icons of these tools below to learn more about them!
            </p>
          </div>

          <div className='flex items-center gap-3 justify-center text-white font-light'>
            {tools.map((tool, index) => (
              <React.Fragment key={tool.name}>
                {index > 0 && <span className='text-2xl'>×</span>}
                <a
                  className='transition hover:scale-110'
                  href={tool.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  title={tool.name}
                >
                  <div className='text-3xl animate-pulse'>{tool.icon}</div>
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
