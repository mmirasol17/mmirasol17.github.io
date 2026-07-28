import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { MousePointerClick } from "lucide-react";
import { cn } from "../../utils/cn";
import { ProjectIcon } from "../Icons/ProjectIcon";

/** Rendered size of the floating preview, used to keep it inside the viewport. */
export const PREVIEW_WIDTH = 420;
export const PREVIEW_HEIGHT = 296;

interface ProjectPreviewFrameProps {
  /** Single image to show. Ignored when `children` is provided. */
  src?: string;
  title: string;
  url?: string;
  /** The project's app icon, shown in the fake URL bar like a favicon. */
  icon?: string;
  className?: string;
  /** When present, rendered inside the chrome instead of the single image (e.g. a carousel track). */
  children?: ReactNode;
}

/**
 * A screenshot (or carousel) wrapped in fake browser chrome, so the preview
 * reads as "this is the live site" rather than a floating image.
 */
export function ProjectPreviewFrame(props: Readonly<ProjectPreviewFrameProps>) {
  const displayUrl = props.url?.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className={cn("overflow-hidden rounded-xl bg-gray-900 shadow-2xl ring-1 ring-white/20", props.className)}>
      <div className='flex items-center gap-2 bg-gray-800 px-3 py-2'>
        <span className='h-2.5 w-2.5 rounded-full bg-red-400' />
        <span className='h-2.5 w-2.5 rounded-full bg-yellow-400' />
        <span className='h-2.5 w-2.5 rounded-full bg-green-400' />
        {displayUrl && (
          <span className='ml-2 flex flex-1 items-center gap-1.5 truncate rounded-full bg-gray-900/80 px-2.5 py-0.5 text-[11px] text-gray-400'>
            {props.icon && (
              <ProjectIcon
                src={props.icon}
                title={props.title}
                className='h-3.5 w-3.5 flex-shrink-0 rounded-[4px]'
              />
            )}
            <span className='truncate'>{displayUrl}</span>
          </span>
        )}
      </div>
      {props.children ? (
        props.children
      ) : (
        <img
          src={props.src}
          alt={`Preview of ${props.title}`}
          className='block w-full bg-gray-900'
          decoding='async'
        />
      )}
    </div>
  );
}

interface ProjectPreviewFloatingProps {
  src: string;
  title: string;
  url?: string;
  icon?: string;
  x: number;
  y: number;
}

/**
 * Cursor-anchored preview shown on hover. Portaled to the body so no ancestor
 * can clip it, and click-through so it never blocks the card underneath.
 */
export function ProjectPreviewFloating(props: Readonly<ProjectPreviewFloatingProps>) {
  return createPortal(
    <div
      className='pointer-events-none fixed z-40 animate-preview-in'
      style={{ left: props.x, top: props.y, width: PREVIEW_WIDTH }}
      aria-hidden='true'
    >
      <ProjectPreviewFrame
        src={props.src}
        title={props.title}
        url={props.url}
        icon={props.icon}
      />
      <div className='mx-auto mt-1.5 flex w-fit items-center gap-1.5 rounded-lg bg-gray-900/90 px-2.5 py-1 text-[11px] font-medium text-blue-200 shadow-lg'>
        <MousePointerClick className='h-3 w-3' />
        Click the card to preview screenshots
      </div>
    </div>,
    document.body
  );
}
