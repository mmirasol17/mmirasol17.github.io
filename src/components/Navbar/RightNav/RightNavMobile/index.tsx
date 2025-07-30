import { useState, useEffect } from "react";
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
  const { technologyCategories } = useTechnologies({ iconSize: "sm" });
  const { projects } = useProjects();

  const [activeSection, setActiveSection] = useState<string>("");
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

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
        onClick={() => setIsMainMenuOpen(true)}
        className='p-2 text-white hover:bg-white/10 rounded-lg transition-colors'
        aria-label='Open navigation menu'
      >
        <MenuIcon className='w-6 h-6' />
      </button>

      {/* Mobile Navigation Menu */}
      <Menu
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
                className={cn(
                  "flex items-center justify-between w-full px-4 py-3 text-left hover:bg-white/10 transition-colors",
                  activeSection === section && "text-blue-400 bg-white/5"
                )}
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
                        className='flex items-center gap-3 w-full px-4 py-2 text-sm text-left hover:bg-white/10 transition-colors'
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
                        className='flex items-center gap-3 w-full px-4 py-2 text-sm text-left hover:bg-white/10 transition-colors'
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
