import { useCallback } from "react";

export function TechnologyStackFooter() {
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
    <div className='text-center items-center justify-center gap-2 flex flex-col'>
      <button
        onClick={scrollToProjects}
        className='text-blue-400 font-bold underline transition duration-200 hover:text-blue-300 text-xl'
      >
        How have I used these technologies?
      </button>
      <button
        onClick={scrollToProjects}
        className='animate-bounce w-14 h-14 p-2 bg-gradient-to-br from-gray-400 to-gray-700 rounded-full cursor-pointer flex items-center justify-center transition duration-200 hover:scale-110 mt-4'
      >
        <img
          className='w-6 h-6'
          src='./icons/ui/arrowdown.svg'
          alt='Arrow Down'
          loading='lazy'
        />
      </button>
    </div>
  );
}
