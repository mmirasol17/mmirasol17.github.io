import { X } from "lucide-react";
import { useProjectFilters } from "../../../../../providers/ProjectFilterProvider";

export function ProjectFiltersClearButton() {
  const { clearAllFilters } = useProjectFilters();

  return (
    <button
      onClick={clearAllFilters}
      className='flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 w-full sm:w-auto justify-center'
    >
      <X className='w-4 h-4' />
      Clear All
    </button>
  );
}
