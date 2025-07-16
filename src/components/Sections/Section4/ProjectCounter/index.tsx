import { useProjectFilters } from "../../../../providers/ProjectFilterProvider";

export function ProjectCounter() {
  const { resultCount, totalProjectCount, hasActiveFilters } = useProjectFilters();

  if (!hasActiveFilters) return null;

  return (
    <div className='text-sm text-gray-400 text-center'>
      {resultCount} of {totalProjectCount} projects
    </div>
  );
}
