import { useCallback, useMemo, useState } from "react";
import { useTechnologies } from "../../../../hooks/useTechnologies";
import { Minus, Plus } from "lucide-react";
import { TechnologyCategory } from "./TechnologyCategory";

export function TechnologyCategories() {
  const { technologyCategories } = useTechnologies();

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSectionCollapse = useCallback((sectionKey: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  }, []);

  const collapseAllSections = useCallback(() => {
    const allCollapsed: Record<string, boolean> = {};
    technologyCategories.forEach((category) => {
      allCollapsed[category.category] = true;
    });
    setCollapsedSections(allCollapsed);
  }, [technologyCategories]);

  const expandAllSections = useCallback(() => {
    setCollapsedSections({});
  }, [technologyCategories]);

  // Calculate how many sections are actually collapsed
  const collapsedCount = useMemo(() => {
    return technologyCategories.filter((category) => collapsedSections[category.category] === true).length;
  }, [collapsedSections, technologyCategories]);

  // Calculate how many sections are expanded
  const expandedCount = useMemo(() => {
    return technologyCategories.length - collapsedCount;
  }, [collapsedCount, technologyCategories.length]);

  return (
    <div className='container mx-auto max-w-7xl'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4'>
        <div className='w-full md:w-1/3'></div>
        <h2 className='w-full md:w-1/3 text-center text-5xl font-bold text-blue-400'>Tech Stack</h2>

        {/* Compact Section Controls */}
        <div className='w-full md:w-1/3 flex justify-center md:justify-end'>
          <div className='flex items-center gap-1 bg-white/10 rounded-lg p-1'>
            <button
              onClick={expandAllSections}
              // Disable button if all sections are expanded
              disabled={expandedCount === technologyCategories.length}
              className='bg-blue-500 hover:bg-blue-600 text-white md:px-3 md:py-1.5 px-8 py-3 rounded text-sm transition flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <Plus className='w-3 h-3' />
              Expand
            </button>
            <button
              onClick={collapseAllSections}
              // Disable button if all sections are collapsed
              disabled={collapsedCount === technologyCategories.length}
              className='bg-gray-600 hover:bg-gray-500 text-white md:px-3 md:py-1.5 px-8 py-3 rounded text-sm transition flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <Minus className='w-3 h-3' />
              Collapse
            </button>
          </div>
        </div>
      </div>

      <div className='grid gap-6'>
        {technologyCategories.map((data) => (
          <TechnologyCategory
            key={data.category}
            category={data}
            isCollapsed={collapsedSections[data.category] || false}
            onToggleCollapse={toggleSectionCollapse}
          />
        ))}
      </div>
    </div>
  );
}
