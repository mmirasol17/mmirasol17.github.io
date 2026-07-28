import { useProjectFilters } from "../../../../providers/ProjectFilterProvider";
import { ProjectItem } from "./ProjectItem";

export function ProjectItems() {
  const { filteredProjects, resultCount, totalProjectCount } = useProjectFilters();

  return (
    <>
      <div className='grid grid-cols-1 gap-8 text-sm lg:text-base'>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <ProjectItem
              key={index + project.title}
              project={project}
            />
          ))
        ) : (
          <div className='text-center py-12'>
            <div className='text-gray-400 text-lg mb-4'>No projects found matching your criteria</div>
            <p className='text-gray-500'>Try adjusting your search or filters to see more results.</p>
          </div>
        )}
      </div>

      {/* Results Count */}
      {filteredProjects.length > 0 && filteredProjects.length < totalProjectCount && (
        <div className='text-center mt-8 text-gray-400'>
          Showing {resultCount} of {totalProjectCount} projects
        </div>
      )}
    </>
  );
}
