import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, Github, X } from "lucide-react";
import { cn } from "../../utils/cn";

/** Rendered size of the floating preview, used to keep it inside the viewport. */
export const PREVIEW_WIDTH = 420;
export const PREVIEW_HEIGHT = 296;

interface ProjectPreviewFrameProps {
  src: string;
  title: string;
  url?: string;
  className?: string;
}

/**
 * A screenshot wrapped in fake browser chrome, so the preview reads as
 * "this is the live site" rather than a floating image.
 */
export function ProjectPreviewFrame(props: Readonly<ProjectPreviewFrameProps>) {
  const displayUrl = props.url?.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className={cn("overflow-hidden rounded-xl bg-gray-900 shadow-2xl ring-1 ring-white/20", props.className)}>
      <div className='flex items-center gap-2 bg-gray-800 px-3 py-2'>
        <span className='h-2.5 w-2.5 rounded-full bg-red-400' />
        <span className='h-2.5 w-2.5 rounded-full bg-yellow-400' />
        <span className='h-2.5 w-2.5 rounded-full bg-green-400' />
        {displayUrl && <span className='ml-2 flex-1 truncate rounded-full bg-gray-900/80 px-3 py-0.5 text-[11px] text-gray-400'>{displayUrl}</span>}
      </div>
      <img
        src={props.src}
        alt={`Preview of ${props.title}`}
        className='block w-full bg-gray-900'
        decoding='async'
      />
    </div>
  );
}

interface ProjectPreviewFloatingProps extends ProjectPreviewFrameProps {
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
      />
    </div>,
    document.body
  );
}

interface ProjectPreviewModalProps extends ProjectPreviewFrameProps {
  onClose: () => void;
}

/** Tap-to-open equivalent for touch devices, which have no hover state. */
export function ProjectPreviewModal(props: Readonly<ProjectPreviewModalProps>) {
  const { onClose } = props;

  // Match the card's wording: repos say "View Source", live sites say "Visit".
  const isSourceLink = Boolean(props.url?.includes("github.com"));

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [onClose]);

  return createPortal(
    <div
      className='animate-backdrop-in fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4'
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role='dialog'
      aria-modal='true'
      aria-label={`Preview of ${props.title}`}
    >
      <div className='w-full max-w-3xl'>
        <div className='mb-2 flex items-center justify-between'>
          <span className='text-sm font-semibold text-white'>{props.title}</span>
          <button
            onClick={onClose}
            className='rounded-lg p-2 text-white transition-colors hover:bg-white/20'
            title='Close'
          >
            <X className='h-5 w-5' />
          </button>
        </div>
        <ProjectPreviewFrame
          src={props.src}
          title={props.title}
          url={props.url}
        />

        {/* The preview is a static screenshot, so give the user a way through
            to the real thing. Full-width for a comfortable tap target. */}
        {props.url && (
          <a
            href={props.url}
            target='_blank'
            rel='noopener noreferrer'
            className={cn(
              "mt-3 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white transition-colors",
              isSourceLink ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
            )}
          >
            {isSourceLink ? (
              <>
                <Github className='h-4 w-4' />
                View Source
              </>
            ) : (
              <>
                <ExternalLink className='h-4 w-4' />
                Visit {props.title}
              </>
            )}
          </a>
        )}
      </div>
    </div>,
    document.body
  );
}
