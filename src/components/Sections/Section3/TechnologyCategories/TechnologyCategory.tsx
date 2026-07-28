import { ITechnologyCategory } from "../../../../hooks/useTechnologies";
import { Plus, Minus } from "lucide-react";
import { TechnologyCategoryItem } from "./TechnologyCategoryItem";

interface TechnologyCategoryProps {
  category: ITechnologyCategory;
  isCollapsed: boolean;
  onToggleCollapse: (category: string) => void;
}

export function TechnologyCategory(props: Readonly<TechnologyCategoryProps>) {
  return (
    <div
      className={`bg-gradient-to-br ${props.category.color} rounded-2xl p-3 md:p-6 shadow-lg transition-all duration-300 cursor-pointer`}
      onClick={() => props.onToggleCollapse(props.category.category)}
      id={props.category.category}
    >
      <div className='flex items-center gap-3'>
        <div className='text-white'>{props.category.icon}</div>
        <h3 className='text-md md:text-xl font-bold text-white flex-1'>{props.category.title}</h3>
        <span className='text-white/80 text-sm'>({props.category.technologies.length})</span>
        <div className='bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors'>
          <div className={`transition-transform duration-300 ${props.isCollapsed ? "rotate-0" : "rotate-180"}`}>
            {props.isCollapsed ? <Plus className='w-4 h-4 text-white' /> : <Minus className='w-4 h-4 text-white' />}
          </div>
        </div>
      </div>

      <div className={`collapsible-content ${props.isCollapsed ? "" : "is-open"}`}>
        <div className='collapsible-inner'>
          <div className='mt-6 space-y-3 skill-cascade'>
            {props.category.technologies.map((item) => (
              <TechnologyCategoryItem
                key={item.technology}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
