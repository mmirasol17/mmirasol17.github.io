import { useProjectFilters } from "../../../../../providers/ProjectFilterProvider";

export function ProjectTypesFilters() {
  const { filters, availableTypes, toggleType } = useProjectFilters();
  return (
    <div>
      <h4 className='text-white font-semibold mb-3'>Project Type</h4>
      <div className='space-y-2'>
        {availableTypes.map((type) => (
          <label
            key={type}
            className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors duration-200'
          >
            <input
              type='checkbox'
              checked={filters.selectedTypes.includes(type)}
              onChange={() => toggleType(type)}
              className='w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2'
            />
            <span className='text-sm text-gray-300'>{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
