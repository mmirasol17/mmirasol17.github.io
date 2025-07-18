import { Minus, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "../../utils/cn";

interface CollapsibleContainerProps {
  // Optional header to display at the top of the container
  header?: React.ReactNode;
  // Optional callback when the collapse state changes
  onToggleCollapse?: () => void;
  // Optional action to trigger collapse on container or header click
  collapseAction?: "container-click" | "header-click";
  // Optional background color for the container
  backgroundColor?: string;
  // Children to render inside the container
  children: React.ReactNode;
}
export function CollapsibleContainer(props: Readonly<CollapsibleContainerProps>) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const onToggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
    if (props.onToggleCollapse) {
      props.onToggleCollapse();
    }
  }, [props.onToggleCollapse]);

  return (
    <div
      className={cn(
        "bg-gradient-to-br rounded-2xl p-3 md:p-6 shadow-lg transition-all duration-300 cursor-pointer",
        props.backgroundColor ? props.backgroundColor : "from-gray-800 to-gray-900"
      )}
      onClick={(e) => {
        if (props.collapseAction === "container-click") {
          onToggleCollapse();
        }
        e.stopPropagation();
      }}
    >
      <div className='flex items-center gap-3'>
        {props.header ?? null}
        <div className='bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors'>
          {isCollapsed ? (
            <Plus
              className='w-4 h-4 text-white'
              onClick={(e) => {
                if (props.collapseAction === "header-click") {
                  onToggleCollapse();
                }
                e.stopPropagation();
              }}
            />
          ) : (
            <Minus
              className='w-4 h-4 text-white'
              onClick={(e) => {
                if (props.collapseAction === "header-click") {
                  onToggleCollapse();
                }
                e.stopPropagation();
              }}
            />
          )}
        </div>
      </div>
      {!isCollapsed && <div className='mt-6 space-y-3 animate-in slide-in-from-top duration-300'>{props.children}</div>}
    </div>
  );
}
