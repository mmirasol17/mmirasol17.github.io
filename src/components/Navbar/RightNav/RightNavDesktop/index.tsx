import { useEffect, useState } from "react";
import { DesktopNavSection } from "./DesktopNavSection";

const SECTIONS = ["about", "technologies", "projects", "contact"];
export function RightNavDesktop() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of SECTIONS) {
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

  return (
    <div className='flex gap-5 text-white font-light h-12'>
      {SECTIONS.map((section) => (
        <DesktopNavSection
          key={section}
          section={section}
          activeSection={activeSection}
        />
      ))}
    </div>
  );
}
