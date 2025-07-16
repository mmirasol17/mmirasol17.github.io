import { useCallback, useMemo } from "react";
import { ITechnologyCategoryItem } from "../../../../hooks/useTechnologies";
import { TechnologyMetadataMapping } from "../../../../types/TechnologyMetadataMapping";
import { TechnologyIcon } from "../../../Icons/TechnologyIcon";
import { ExternalLink } from "lucide-react";
import { handleScrollToElementById } from "../../../../utils";

interface TechnologyCategoryItemProps {
  item: ITechnologyCategoryItem;
}

/**
 * Component to render a single technology category item
 * @param props - Props containing the technology category item data
 * @return JSX Element representing the technology category item
 **/
export function TechnologyCategoryItem(props: Readonly<TechnologyCategoryItemProps>) {
  const levelWidth = useMemo(() => {
    return props.item.level === "Expert" ? "w-full" : props.item.level === "Advanced" ? "w-4/5" : props.item.level === "Intermediate" ? "w-3/5" : "w-2/5";
  }, [props.item.level]);

  /**
   * Handles click on the technology item to open the external link
   * @param e - React MouseEvent
   **/
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const url = TechnologyMetadataMapping[props.item.technology].url || "";
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    },
    [props.item.technology]
  );

  /**
   * Renders the technology category item with its details
   * @returns JSX Element
   **/
  return (
    <div
      className='bg-white/10 backdrop-blur-sm rounded-lg p-3 cursor-pointer transition-all duration-200 hover:bg-white/20 hover:scale-[101%]'
      onClick={handleClick}
    >
      <div className='flex items-center gap-3'>
        {/* Tech Logo */}
        <div className='text-2xl flex-shrink-0'>
          <TechnologyIcon
            className='w-8 h-8'
            icon={props.item.technology}
          />
        </div>

        {/* Tech Info */}
        <div className='flex-1 min-w-0'>
          <div className='flex justify-between items-start mb-1'>
            <span className='font-medium text-white text-sm truncate'>{TechnologyMetadataMapping[props.item.technology].name}</span>
            <span className='text-xs text-white/80 ml-2 flex-shrink-0'>{props.item.level}</span>
          </div>

          {/* Skill Level Bar */}
          <div className='w-full bg-white/20 rounded-full h-1.5 mb-2'>
            <div className={`h-1.5 rounded-full bg-white transition-all duration-500 ${levelWidth}`}></div>
          </div>

          {/* Project Tags */}
          <div className='flex flex-wrap gap-1'>
            {props.item.projects.map((project, i) => (
              <button
                key={`${i}:${project.title}`}
                className='text-xs bg-white/20 text-white px-2 py-0.5 rounded-full truncate transition-all duration-200 hover:scale-105'
                onClick={(e) => {
                  e.stopPropagation();
                  handleScrollToElementById(project.title);
                }}
              >
                {project.title}
              </button>
            ))}
          </div>
        </div>

        {/* External Link Icon */}
        <ExternalLink className='w-4 h-4 text-white/60 flex-shrink-0' />
      </div>
    </div>
  );
}
