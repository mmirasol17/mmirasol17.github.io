import { forwardRef } from "react";
import { useProjectFilters } from "../../../../../providers/ProjectFilterProvider";
import { X } from "lucide-react";
import { ProjectTechnologiesFilters } from "./ProjectTechnologiesFilters";
import { ProjectStatusesFilters } from "./ProjectStatusesFilters";
import { ProjectTypesFilters } from "./ProjectTypesFilters";

interface ProjectFiltersMenuProps {
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ProjectFiltersMenu = forwardRef(function ProjectFiltersMenu(props: Readonly<ProjectFiltersMenuProps>, ref: React.ForwardedRef<HTMLDivElement>) {
  const { clearAllFilters, hasActiveFilters } = useProjectFilters();

  return (
    <div
      ref={ref}
      className='absolute top-full left-0 w-full sm:w-[28rem] lg:w-[32rem] bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50 max-h-[32rem] overflow-y-auto'
    >
      <div className='p-4 space-y-6'>
        <ProjectTechnologiesFilters />

        <ProjectStatusesFilters />

        <ProjectTypesFilters />

        {/* Clear All Button */}
        {hasActiveFilters && (
          <button
            onClick={() => {
              clearAllFilters();
              props.setIsDropdownOpen(false);
            }}
            className='w-full flex items-center justify-center gap-2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200'
          >
            <X className='w-4 h-4' />
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  );
});
