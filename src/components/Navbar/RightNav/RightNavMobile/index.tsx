import { useState, useEffect, useRef } from "react";
import { Briefcase, ChevronDown, Menu as MenuIcon, MessageCircle, User, Wrench } from "lucide-react";
import { getProjectType, handleScrollToElementById } from "../../../../utils";
import { Menu } from "../../../Menu";
import { useTechnologies } from "../../../../hooks/useTechnologies";
import { useProjects } from "../../../../hooks/useProjects";
import { cn } from "../../../../utils/cn";
import { PROJECT_TYPE_ICONS } from "../../../Sections/Section4/ProjectFilter/ProjectFiltersMenu/ProjectTypeIcons";

const SECTIONS = ["about", "technologies", "projects", "contact"];
const SECTION_ICONS = {
  about: User,
  technologies: Wrench, // or Code2, Laptop
  projects: Briefcase, // or Database, Layers
  contact: MessageCircle, // or Github, Globe
};

export function RightNavMobile() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { technologyCategories } = useTechnologies({ iconSize: "sm" });
  const { projects } = useProjects();

  const [activeSection, setActiveSection] = useState<string>("");
  const [activeSubSection, setActiveSubSection] = useState<string>("");
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsMainMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Track active section based on scroll
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

  // Track active subsection based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      const subSections = technologyCategories.map((cat) => cat.category).concat(projects.map((proj) => proj.id));

      for (const subSectionId of subSections) {
        const element = document.getElementById(subSectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSubSection(subSectionId);
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
  }, [technologyCategories, projects]);

  const hasSubSections = (section: string) => {
    return ["technologies", "projects"].includes(section);
  };

  const handleSectionClick = (section: string) => {
    if (hasSubSections(section)) {
      // Toggle expanded state for sections with subsections
      setExpandedSection(expandedSection === section ? null : section);
    } else {
      // Navigate to section and close menu
      handleScrollToElementById(section);
      setIsMainMenuOpen(false);
      setExpandedSection(null);
    }
  };

  const handleSubSectionClick = (id: string) => {
    handleScrollToElementById(id);
    setIsMainMenuOpen(false);
    setExpandedSection(null);
  };

  return (
    <div className='sm:hidden'>
      {/* Menu Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsMainMenuOpen(true)}
        className='p-2 text-white hover:bg-white/10 rounded-lg transition-colors'
        aria-label='Open navigation menu'
      >
        <MenuIcon className='w-6 h-6' />
      </button>

      {/* Mobile Navigation Menu */}
      <Menu
        ref={dropdownRef}
        isOpen={isMainMenuOpen}
        onClose={() => {
          setIsMainMenuOpen(false);
          setExpandedSection(null);
        }}
        title='Menu'
        showDoneButton={false}
      >
        <div className='py-2 text-white'>
          {SECTIONS.map((section) => (
            <div key={section}>
              {/* Main Section Button */}
              <button
                onClick={() => handleSectionClick(section)}
                className={cn("flex items-center justify-between w-full px-4 py-3 text-left hover:bg-white/10 transition-colors", activeSection === section && "text-blue-400")}
              >
                <div className='flex items-center gap-3 flex-1'>
                  {/* Section Icon */}
                  {(() => {
                    const IconComponent = SECTION_ICONS[section as keyof typeof SECTION_ICONS];
                    return IconComponent ? <IconComponent className='w-5 h-5' /> : null;
                  })()}
                  <span className='capitalize font-medium'>{section}</span>
                </div>
                {hasSubSections(section) && <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", expandedSection === section && "rotate-180")} />}
              </button>

              {/* Subsections */}
              {hasSubSections(section) && expandedSection === section && (
                <div className='bg-gray-700/50 border-l-2 border-blue-400'>
                  {section === "technologies" &&
                    technologyCategories.map((category) => (
                      <button
                        key={category.category}
                        onClick={() => handleSubSectionClick(category.category)}
                        className={cn(
                          "flex items-center gap-3 w-full px-4 py-2 text-sm text-left hover:bg-white/10 transition-colors",
                          activeSubSection === category.category && activeSection === "technologies" && "text-blue-400"
                        )}
                      >
                        {category.icon}
                        <span>{category.title}</span>
                      </button>
                    ))}

                  {section === "projects" &&
                    projects.map((project) => (
                      <button
                        key={project.id}
                        onClick={() => handleSubSectionClick(project.id)}
                        className={cn(
                          "flex items-center gap-3 w-full px-4 py-2 text-sm text-left hover:bg-white/10 transition-colors",
                          activeSubSection === project.id && activeSection === "projects" && "text-blue-400"
                        )}
                      >
                        {PROJECT_TYPE_ICONS[getProjectType(project)] || <span className='text-gray-400'>?</span>}
                        <span>{project.title}</span>
                      </button>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Menu>
    </div>
  );
}
