import { useState, useRef, useEffect } from "react";
import { Filter, Search } from "lucide-react";
import { useProjectFilters } from "../../../../providers/ProjectFilterProvider";
import { ProjectFiltersMenu } from "./ProjectFiltersMenu";
import { ProjectFiltersActive } from "./ProjectFiltersActive";
import { ProjectFiltersClearButton } from "./ProjectFiltersClearButton";

export function ProjectFilters() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const { filters, updateSearchTerm, hasActiveFilters, totalFilterCount } = useProjectFilters();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className='mb-8 space-y-4 max-w-full'>
      {/* Search Bar */}
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
        <input
          type='text'
          placeholder='Search projects...'
          value={filters.searchTerm}
          onChange={(e) => updateSearchTerm(e.target.value)}
          className='w-full pl-10 rounded-3xl p-3 bg-gradient-to-br from-gray-500 to-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400'
        />
      </div>

      {/* Filter Controls */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
        <div className='relative w-full sm:w-auto'>
          <button
            ref={buttonRef}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 w-full sm:w-auto justify-center sm:justify-start ${
              hasActiveFilters ? "bg-blue-600 text-white border-blue-500" : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
            }`}
          >
            <Filter className='w-4 h-4' />
            <span>Filters</span>
            {hasActiveFilters && <span className='bg-blue-400 text-white text-xs px-2 py-1 rounded-full'>{totalFilterCount}</span>}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <ProjectFiltersMenu
              ref={dropdownRef}
              setIsDropdownOpen={setIsDropdownOpen}
            />
          )}
        </div>

        {/* Clear All Button (outside dropdown) */}
        {hasActiveFilters && <ProjectFiltersClearButton />}
      </div>

      {/* Active Filters Display - Enhanced Pills */}
      {hasActiveFilters && <ProjectFiltersActive />}
    </div>
  );
}
