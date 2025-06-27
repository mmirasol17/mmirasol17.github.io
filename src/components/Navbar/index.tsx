import { useState, useEffect, useCallback } from "react";

/**
 * Navbar component that provides navigation links to different sections of the page.
 * It highlights the active section based on the scroll position.
 *
 * @returns {JSX.Element} The rendered Navbar component.
 */
export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }

      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbar = document.querySelector(".navbar");
      const offset = navbar ? navbar.clientHeight : 64;
      const elementPosition = element.offsetTop - offset;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <nav className='navbar bg-gray-800 h-16 flex items-center px-4 fixed top-0 w-full z-50 shadow-2xl'>
      <div className='container mx-auto'>
        <div className='justify-between items-center flex'>
          <button
            onClick={() => scrollToSection("intro")}
            className='w-12 h-12 p-2 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full transition hover:scale-110'
          >
            <img
              src='./icons/ui/mm.svg'
              alt='MM'
              loading='lazy'
            />
          </button>

          <div className='flex gap-5 text-white font-light'>
            {["about", "projects", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`transition hover:scale-110 capitalize ${activeSection === section ? "text-blue-400 underline" : ""}`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
