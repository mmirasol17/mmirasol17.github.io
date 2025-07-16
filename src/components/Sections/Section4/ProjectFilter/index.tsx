import { useState, useRef, useEffect } from "react";
import { Filter, X, Search } from "lucide-react";
import { TechnologyIcon } from "../../../Icons/TechnologyIcon";
import { TechnologyMetadataMapping } from "../../../../types/TechnologyMetadataMapping";
import { useProjectFilters } from "../../../../providers/ProjectFilterProvider";
import { useTechnologies } from "../../../../hooks/useTechnologies";
import { cn } from "../../../../utils/cn";

export function ProjectFilters() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const { technologyCategories } = useTechnologies();
  const { filters, availableStatuses, availableTypes, updateSearchTerm, toggleTechnology, toggleStatus, toggleType, clearAllFilters, hasActiveFilters, totalFilterCount } =
    useProjectFilters();

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open Source":
        return "bg-purple-500";
      case "Live Production":
        return "bg-green-500";
      case "Public":
        return "bg-blue-500";
      case "Private/Academic":
        return "bg-pink-500";
      default:
        return "bg-gray-500";
    }
  };

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
            <div
              ref={dropdownRef}
              className='absolute top-full left-0 w-full sm:w-[28rem] lg:w-[32rem] bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50 max-h-[32rem] overflow-y-auto'
            >
              <div className='p-4 space-y-6'>
                {/* Technologies Filter - Grouped by Category */}
                <div>
                  <h4 className='text-white font-semibold mb-4 flex items-center gap-2'>Technologies</h4>
                  <div className='space-y-4'>
                    {technologyCategories.map((category) => {
                      const categoryTechs = category.technologies;

                      if (categoryTechs.length === 0) return null;

                      return (
                        <div
                          key={category.title}
                          className={cn(
                            "space-y-2 p-1 rounded-2xl",
                            category.color === "from-blue-500 to-cyan-500" && "bg-gradient-to-br from-blue-500 to-cyan-500",
                            category.color === "from-green-500 to-emerald-500" && "bg-gradient-to-br from-green-500 to-emerald-500",
                            category.color === "from-orange-500 to-red-500" && "bg-gradient-to-br from-orange-500 to-red-500",
                            category.color === "from-yellow-500 to-orange-500" && "bg-gradient-to-br from-yellow-500 to-orange-500",
                            category.color === "from-pink-500 to-rose-500" && "bg-gradient-to-br from-pink-500 to-rose-500",
                            category.color === "from-purple-500 to-pink-500" && "bg-gradient-to-br from-purple-500 to-pink-500"
                          )}
                        >
                          <h5 className={"text-sm font-medium flex items-center gap-2 text-white p-1"}>
                            {category.icon}
                            {category.title}
                          </h5>
                          <div className='grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2'>
                            {categoryTechs.map((tech) => (
                              <label
                                key={tech.technology}
                                className='flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm cursor-pointer transition-colors duration-200'
                              >
                                <input
                                  type='checkbox'
                                  checked={filters.selectedTechnologies.includes(tech.technology)}
                                  onChange={() => toggleTechnology(tech.technology)}
                                  className='w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2'
                                />
                                <div className='flex items-center gap-1 text-white px-2 py-1 rounded-full text-xs'>
                                  <span>
                                    <TechnologyIcon
                                      className='w-4 h-4 flex-shrink-0'
                                      icon={tech.technology}
                                    />
                                  </span>
                                  <span className='truncate'>{TechnologyMetadataMapping[tech.technology].name}</span>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Status Filter */}
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
                          <span className={cn("px-3 py-1 rounded-full text-xs font-medium text-white whitespace-nowrap self-start", getStatusColor(status))}>{status}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Project Type Filter */}
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

                {/* Clear All Button */}
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      clearAllFilters();
                      setIsDropdownOpen(false);
                    }}
                    className='w-full flex items-center justify-center gap-2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200'
                  >
                    <X className='w-4 h-4' />
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Clear All Button (outside dropdown) */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className='flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 w-full sm:w-auto justify-center'
          >
            <X className='w-4 h-4' />
            Clear All
          </button>
        )}
      </div>

      {/* Active Filters Display - Enhanced Pills */}
      {hasActiveFilters && (
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
              className={`text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-1 shadow-lg border border-white/20 hover:shadow-xl transition-shadow ${getStatusColor(
                status
              )}`}
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
      )}
    </div>
  );
}
