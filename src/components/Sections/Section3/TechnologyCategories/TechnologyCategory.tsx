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
    >
      <div className='flex items-center gap-3'>
        <div className='text-white'>{props.category.icon}</div>
        <h3 className='text-md md:text-xl font-bold text-white flex-1'>{props.category.title}</h3>
        <span className='text-white/80 text-sm'>({props.category.technologies.length})</span>
        <div className='bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors'>
          {props.isCollapsed ? <Plus className='w-4 h-4 text-white' /> : <Minus className='w-4 h-4 text-white' />}
        </div>
      </div>

      {!props.isCollapsed && (
        <div className='mt-6 space-y-3 animate-in slide-in-from-top duration-300'>
          {props.category.technologies.map((item) => (
            <TechnologyCategoryItem
              key={item.technology}
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}
