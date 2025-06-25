import { useCallback } from "react";
import { AnimatedSection } from "../../AnimatedSection";
import { TechnologyStackGrid } from "./TechnologyStackGrid";

export function AboutSection() {
  const scrollToProjects = useCallback(() => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      const navbar = document.querySelector(".navbar");
      const offset = navbar ? navbar.clientHeight : 64;
      window.scrollTo({
        top: projectsSection.offsetTop - offset,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <AnimatedSection
      id='about'
      className='py-16 px-4 bg-gray-800'
    >
      <div className='mx-auto text-white md:max-w-5xl flex flex-col h-full'>
        <div>
          <h2 className='text-5xl font-bold mb-8 text-center text-blue-400'>About Me</h2>
          <p className='text-lg md:text-xl font-light leading-relaxed text-center mb-8 mx-6'>
            I graduated from Cal State San Marcos in May 2023 with a B.S. in Software Engineering, and I have a lot of experience with developing web and mobile applications. As a
            result of working on these applications, I have learned many different programming languages, frameworks, technologies, and tools, which I have listed below.
          </p>
        </div>

        <TechnologyStackGrid />

        <div className='text-center items-center justify-center gap-2 flex flex-col'>
          <button
            onClick={scrollToProjects}
            className='text-blue-400 font-bold underline transition duration-200 hover:text-blue-300 text-xl'
          >
            How have I used some of these technologies?
          </button>
          <button
            onClick={scrollToProjects}
            className='animate-bounce w-14 h-14 p-2 bg-gradient-to-br from-gray-400 to-gray-700 rounded-full cursor-pointer flex items-center justify-center transition duration-200 hover:scale-110 mt-4'
          >
            <svg
              className='w-6 h-6 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 14l-7 7m0 0l-7-7m7 7V3'
              />
            </svg>
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
}
