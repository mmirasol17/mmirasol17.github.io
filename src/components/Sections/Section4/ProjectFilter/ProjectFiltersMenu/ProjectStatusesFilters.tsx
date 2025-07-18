import { useProjectFilters } from "../../../../../providers/ProjectFilterProvider";
import { getProjectStatusColor } from "../../../../../utils";
import { cn } from "../../../../../utils/cn";

export function ProjectStatusesFilters() {
  const { filters, availableStatuses, toggleStatus } = useProjectFilters();

  return (
    <div>
      <h4 className='text-white font-semibold mb-3'>Project Status</h4>
      <div className='space-y-2'>
        {availableStatuses.map((status) => (
          <label
            key={status}
            className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors duration-200'
          >
            <input
              type='checkbox'
              checked={filters.selectedStatuses.includes(status)}
              onChange={() => toggleStatus(status)}
              className='w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2'
            />
            <div className='flex items-center gap-2 text-sm text-gray-300'>
              <span className={cn("px-3 py-1 rounded-full text-xs font-medium text-white whitespace-nowrap self-start", getProjectStatusColor(status))}>{status}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
