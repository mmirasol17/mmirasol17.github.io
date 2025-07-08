import { AnimatedSection } from "../../AnimatedSection";
import { useProjects } from "../../../hooks/useProjects";
import { ProjectItem } from "./ProjectItem";

export function ProjectsSection() {
  const { projects } = useProjects();

  return (
    <AnimatedSection
      id='projects'
      className='py-16 px-4 bg-gray-800'
    >
      <div className='mx-auto md:px-4'>
        <h2 className='text-5xl font-bold text-blue-400 text-center mb-8'>My Projects</h2>

        <div className='grid grid-cols-1 gap-8 text-sm lg:text-base'>
          {projects.map((project, index) => (
            <ProjectItem
              key={index + project.title}
              project={project}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
