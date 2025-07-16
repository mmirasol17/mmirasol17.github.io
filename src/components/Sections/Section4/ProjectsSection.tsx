import { AnimatedSection } from "../../AnimatedSection";
import { useProjects } from "../../../hooks/useProjects";
import { ProjectFilters } from "./ProjectFilter";
import { ProjectFilterProvider } from "../../../providers/ProjectFilterProvider";
import { ProjectItems } from "./ProjectItems";

export function ProjectsSection() {
  const { projects } = useProjects();

  return (
    <AnimatedSection
      id='projects'
      className='py-16 px-4 bg-gray-800'
    >
      <div className='mx-auto max-w-7xl md:px-4'>
        <h2 className='text-5xl font-bold text-blue-400 text-center mb-8'>Projects</h2>

        {/* Search and Filter Component */}
        <ProjectFilterProvider projects={projects}>
          <ProjectFilters />
          <ProjectItems />
        </ProjectFilterProvider>
      </div>
    </AnimatedSection>
  );
}
