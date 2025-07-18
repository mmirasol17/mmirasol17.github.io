import { useTechnologies } from "../../../../../hooks/useTechnologies";
import { useProjectFilters } from "../../../../../providers/ProjectFilterProvider";
import { TechnologyMetadataMapping } from "../../../../../types/TechnologyMetadataMapping";
import { cn } from "../../../../../utils/cn";
import { TechnologyIcon } from "../../../../Icons/TechnologyIcon";

export function ProjectTechnologiesFilters() {
  const { technologyCategories } = useTechnologies({ iconSize: "sm" });
  const { filters, toggleTechnology } = useProjectFilters();

  return (
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
  );
}
