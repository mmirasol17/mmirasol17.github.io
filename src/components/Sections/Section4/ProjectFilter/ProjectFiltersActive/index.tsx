import { X } from "lucide-react";
import { TechnologyIcon } from "../../../../Icons/TechnologyIcon";
import { useProjectFilters } from "../../../../../providers/ProjectFilterProvider";
import { TechnologyMetadataMapping } from "../../../../../types/TechnologyMetadataMapping";
import { getProjectStatusColor } from "../../../../../utils";
import { cn } from "../../../../../utils/cn";

export function ProjectFiltersActive() {
  const { filters, updateSearchTerm, toggleTechnology, toggleStatus, toggleType } = useProjectFilters();

  return (
    <div className='flex flex-wrap gap-2'>
      {filters.searchTerm && (
        <span className='bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-1 shadow-lg border border-blue-500/30'>
          Search: "{filters.searchTerm}"
          <button
            onClick={() => updateSearchTerm("")}
            className='hover:bg-blue-700 rounded-full p-1 ml-1 transition-colors'
          >
            <X className='w-3 h-3' />
          </button>
        </span>
      )}
      {filters.selectedTechnologies.map((tech) => (
        <span
          key={tech}
          className='bg-gradient-to-r from-purple-600 to-purple-700 text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-1 shadow-lg border border-purple-500/30 hover:shadow-xl transition-shadow'
        >
          <TechnologyIcon
            className='w-3 h-3'
            icon={tech}
          />
          {TechnologyMetadataMapping[tech]?.name || tech}
          <button
            onClick={() => toggleTechnology(tech)}
            className='hover:bg-purple-800 rounded-full p-1 ml-1 transition-colors'
          >
            <X className='w-3 h-3' />
          </button>
        </span>
      ))}
      {filters.selectedStatuses.map((status) => (
        <span
          key={status}
          className={cn(
            "text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-1 shadow-lg border border-white/20 hover:shadow-xl transition-shadow",
            getProjectStatusColor(status)
          )}
        >
          {status}
          <button
            onClick={() => toggleStatus(status)}
            className='hover:opacity-80 rounded-full p-1 ml-1 transition-opacity'
          >
            <X className='w-3 h-3' />
          </button>
        </span>
      ))}
      {filters.selectedTypes.map((type) => (
        <span
          key={type}
          className='bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-1 shadow-lg border border-green-500/30 hover:shadow-xl transition-shadow'
        >
          {type}
          <button
            onClick={() => toggleType(type)}
            className='hover:bg-green-800 rounded-full p-1 ml-1 transition-colors'
          >
            <X className='w-3 h-3' />
          </button>
        </span>
      ))}
    </div>
  );
}
