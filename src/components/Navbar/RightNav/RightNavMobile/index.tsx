import { useState, useEffect, useRef, useMemo } from "react";
import { Briefcase, ChevronDown, Menu, MessageCircle, User, Wrench, X } from "lucide-react";
import { getProjectType, handleScrollToElementById } from "../../../../utils";
import { useTechnologies } from "../../../../hooks/useTechnologies";
import { useProjects } from "../../../../hooks/useProjects";
import { cn } from "../../../../utils/cn";
import { PROJECT_TYPE_ICONS } from "../../../Sections/Section4/ProjectFilter/ProjectFiltersMenu/ProjectTypeIcons";

const SECTIONS = ["about", "technologies", "projects", "contact"];
const SECTION_ICONS = {
  about: User,
  technologies: Wrench,
  projects: Briefcase,
  contact: MessageCircle,
};

export function RightNavMobile() {
  const sideMenuRef = useRef<HTMLDivElement>(null);

  const { technologyCategories } = useTechnologies({ iconSize: "sm" });
  const { projects } = useProjects();

  const [activeSection, setActiveSection] = useState<string>("");
  const [activeSubSection, setActiveSubSection] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const githubBuildNumber = useMemo(() => {
    return import.meta.env.VITE_GITHUB_BUILD_NUMBER;
  }, []);

  const githubBuildId = useMemo(() => {
    return import.meta.env.VITE_GITHUB_BUILD_ID;
  }, []);

  const githubCommitSha = useMemo(() => {
    return import.meta.env.VITE_GITHUB_COMMIT_SHA;
  }, []);

  const githubRepoUrl = useMemo(() => {
    return import.meta.env.VITE_GITHUB_REPO_URL;
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        handleMenuClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

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

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    setExpandedSection(null);
  };

  const handleSectionClick = (section: string) => {
    if (hasSubSections(section)) {
      // Toggle expanded state for sections with subsections
      setExpandedSection(expandedSection === section ? null : section);
    } else {
      // Navigate to section and close menu
      handleScrollToElementById(section);
      handleMenuClose();
    }
  };

  const handleSubSectionClick = (id: string) => {
    handleScrollToElementById(id);
    handleMenuClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleMenuClose();
    }
  };

  return (
    <div className='sm:hidden'>
      {/* Menu Button */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className='p-2 text-white hover:bg-white/10 rounded-lg transition-colors'
        aria-label='Open navigation menu'
      >
        <Menu className='w-6 h-6' />
      </button>

      {/* Backdrop */}
      {isMenuOpen && (
        <>
          <div
            className='fixed inset-0 bg-black/50 z-40 transition-opacity duration-300'
            onClick={handleBackdropClick}
          />
          {/* Side Menu */}
          <div
            ref={sideMenuRef}
            className={cn(
              "fixed top-0 right-0 h-full w-72 bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out rounded-tl-2xl rounded-bl-2xl border-l border-gray-700",
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            {/* Header */}
            <div className='flex items-center justify-between p-4 border-b border-gray-700'>
              <h2 className='flex items-center justify-start text-lg font-semibold text-white'>
                <Menu className='inline-block mr-2 w-5 h-5 text-white' />
                Menu
              </h2>
              <button
                onClick={handleMenuClose}
                className='p-2 hover:bg-gray-700 rounded-lg transition-colors'
                aria-label='Close menu'
              >
                <X className='w-5 h-5 text-gray-400' />
              </button>
            </div>

            {/* Menu Content */}
            <div
              className='flex-1 overflow-y-auto'
              style={{ maxHeight: "calc(100svh - 70px)" }}
            >
              <div className='space-y-1 p-2'>
                {SECTIONS.map((section) => (
                  <div key={section}>
                    {/* Main Section Button */}
                    <button
                      onClick={() => handleSectionClick(section)}
                      className={cn(
                        "flex items-center justify-between w-full px-4 py-3 text-left rounded-lg text-white hover:bg-white/10 transition-colors",
                        activeSection === section && "text-blue-400"
                      )}
                    >
                      <div className='flex items-center gap-3 flex-1'>
                        {/* Section Icon */}
                        {(() => {
                          const IconComponent = SECTION_ICONS[section as keyof typeof SECTION_ICONS];
                          return IconComponent ? <IconComponent className={cn("w-5 h-5", activeSection === section ? "text-blue-400" : "text-white")} /> : null;
                        })()}
                        <span className={cn("capitalize font-medium", activeSection === section && "text-blue-400")}>{section}</span>
                      </div>
                      {hasSubSections(section) && (
                        <ChevronDown className={cn("w-4 h-4 transition-transform duration-200 text-gray-400", expandedSection === section && "rotate-180")} />
                      )}
                    </button>

                    {/* Subsections */}
                    {hasSubSections(section) && expandedSection === section && (
                      <div className='mt-1 space-y-1 pl-4'>
                        {section === "technologies" &&
                          technologyCategories.map((category) => (
                            <button
                              key={category.category}
                              onClick={() => handleSubSectionClick(category.category)}
                              className={cn(
                                "flex items-center gap-3 w-full px-3 py-2 text-sm text-left rounded-md hover:bg-white/10 transition-colors",
                                activeSubSection === category.category && activeSection === "technologies" ? "text-blue-400" : "text-gray-300"
                              )}
                            >
                              <span className='text-lg'>{category.icon}</span>
                              <span>{category.title}</span>
                            </button>
                          ))}

                        {section === "projects" &&
                          projects.map((project) => (
                            <button
                              key={project.id}
                              onClick={() => handleSubSectionClick(project.id)}
                              className={cn(
                                "flex items-center gap-3 w-full px-3 py-2 text-sm text-left rounded-md hover:bg-white/10 transition-colors",
                                activeSubSection === project.id && activeSection === "projects" ? "text-blue-400" : "text-gray-300"
                              )}
                            >
                              <span className='text-lg'>{PROJECT_TYPE_ICONS[getProjectType(project)] || <span className='text-gray-400'>?</span>}</span>
                              <span>{project.title}</span>
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer (optional) */}
              <div className='p-4 border-t border-gray-700'>
                <div className='text-xs text-gray-400 text-center flex flex-col gap-2'>
                  <span>&copy; 2023 Marin Mirasol. All rights reserved.</span>
                  {/* Build info with links */}
                  {(githubBuildNumber || githubCommitSha) && (
                    <div className='text-xs text-gray-400 font-normal flex items-center justify-center gap-1'>
                      {githubBuildNumber && (
                        <a
                          href={`${githubRepoUrl}/actions/runs/${githubBuildId}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='hover:underline transition-colors'
                        >
                          Build #{githubBuildNumber}
                        </a>
                      )}
                      {githubBuildNumber && githubCommitSha && <span> • </span>}
                      {githubCommitSha && (
                        <a
                          href={`${githubRepoUrl}/commit/${githubCommitSha}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='hover:underline transition-colors'
                        >
                          {githubCommitSha.slice(0, 7)}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
