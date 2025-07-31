import { forwardRef, useCallback } from "react";
import { useProjectFilters } from "../../../../../providers/ProjectFilterProvider";
import { Filter, X } from "lucide-react";
import { ProjectTechnologiesFilters } from "./ProjectTechnologiesFilters";
import { ProjectStatusesFilters } from "./ProjectStatusesFilters";
import { ProjectTypesFilters } from "./ProjectTypesFilters";
import { Menu } from "../../../../Menu";

interface ProjectFiltersMenuProps {
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ProjectFiltersMenu = forwardRef(function ProjectFiltersMenu(props: Readonly<ProjectFiltersMenuProps>, ref: React.ForwardedRef<HTMLDivElement>) {
  const { clearAllFilters, hasActiveFilters } = useProjectFilters();

  const handleClose = useCallback(() => props.setIsDropdownOpen(false), []);

  return (
    <Menu
      ref={ref}
      isOpen={props.isDropdownOpen}
      onClose={handleClose}
      title={
        <div className='flex items-center gap-2'>
          <Filter className='w-5 h-5' />
          <span className='text-lg font-semibold'>Filters</span>
        </div>
      }
      showDoneButton={true}
      doneButtonText='Apply Filters'
    >
      <div className='p-4 space-y-6'>
        <div className='flex flex-col sm:flex-row sm:gap-6 space-y-6 sm:space-y-0'>
          <div className='flex-1'>
            <ProjectStatusesFilters />
          </div>
          <div className='flex-1'>
            <ProjectTypesFilters />
          </div>
        </div>

        <ProjectTechnologiesFilters />

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
    </Menu>
  );
});
