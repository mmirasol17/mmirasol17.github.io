import { useEffect, useMemo, useRef, useState } from "react";
import { getProjectType, handleScrollToElementById } from "../../../../utils";
import { Menu } from "../../../Menu";
import { useTechnologies } from "../../../../hooks/useTechnologies";
import { useProjects } from "../../../../hooks/useProjects";
import { cn } from "../../../../utils/cn";
import { PROJECT_TYPE_ICONS } from "../../../Sections/Section4/ProjectFilter/ProjectFiltersMenu/ProjectTypeIcons";

interface DesktopNavSectionProps {
  section: string;
  activeSection: string;
}

export function DesktopNavSection(props: Readonly<DesktopNavSectionProps>) {
  const { technologyCategories } = useTechnologies({ iconSize: "sm" });
  const { projects } = useProjects();

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [activeSubSection, setActiveSubSection] = useState<string>("");

  const hasSubSections = useMemo(() => {
    const subsections = ["technologies", "projects"]; // Example subsections
    return subsections.includes(props.section);
  }, [props.section]);

  const subSections = useMemo(() => {
    if (props.section === "technologies") {
      return technologyCategories.map((category) => category.category);
    } else if (props.section === "projects") {
      return projects.map((project) => project.id);
    }
    return [];
  }, [props.section, technologyCategories, projects]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of subSections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSubSection(sectionId);
            break;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSubSection("");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [subSections]);

  return (
    <div
      ref={containerRef}
      className='relative'
      onMouseEnter={() => {
        console.log("Mouse entered!", props.section);
        setIsDropdownOpen(true);
      }}
      onMouseLeave={() => {
        console.log("Mouse left!", props.section);
        setIsDropdownOpen(false);
      }}
    >
      <button
        key={props.section}
        ref={buttonRef}
        onClick={() => handleScrollToElementById(props.section)}
        className={cn("transition hover:scale-110 capitalize h-full", props.activeSection === props.section && "text-blue-400 underline", isDropdownOpen && "scale-110")}
      >
        {props.section}
      </button>
      {isDropdownOpen && hasSubSections && (
        <Menu
          ref={dropdownRef}
          isOpen={isDropdownOpen}
          onClose={() => setIsDropdownOpen(false)}
          title='Filter Projects'
          showDoneButton={true}
          doneButtonText='Apply Filters'
          dropdownWidth={cn(props.section === "technologies" ? "w-[250px]" : "w-[260px]")}
          alignment='right'
        >
          {props.section === "technologies" && (
            <>
              {technologyCategories.map((category) => (
                <button
                  key={category.category}
                  onClick={() => handleScrollToElementById(category.category)}
                  className={cn(
                    "flex gap-2 items-center w-full text-left px-4 py-2 hover:bg-white/20",
                    activeSubSection === category.category && props.activeSection === "technologies" && "text-blue-400"
                  )}
                >
                  {category.icon}
                  {category.title}
                </button>
              ))}
            </>
          )}

          {props.section === "projects" && (
            <>
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleScrollToElementById(project.id)}
                  className={cn(
                    "flex gap-2 items-center w-full text-left px-4 py-2 hover:bg-white/20",
                    activeSubSection === project.id && props.activeSection === "projects" && "text-blue-400"
                  )}
                >
                  {PROJECT_TYPE_ICONS[getProjectType(project)] || <span className='text-gray-400'>?</span>}
                  {project.title}
                </button>
              ))}
            </>
          )}
        </Menu>
      )}
    </div>
  );
}
