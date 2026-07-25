import { useCallback, useEffect, useMemo, useState } from "react";
import { IProject } from "../../../../hooks/useProjects";
import { TechnologyIcon } from "../../../Icons/TechnologyIcon";
import { ExternalLink, Eye, Github } from "lucide-react";
import { TechnologyMetadataMapping } from "../../../../types/TechnologyMetadataMapping";
import { cn } from "../../../../utils/cn";
import { getProjectStatus, getProjectStatusColor, getProjectType } from "../../../../utils";
import { MarkdownText } from "../../../MarkdownText";
import { PREVIEW_HEIGHT, PREVIEW_WIDTH, ProjectPreviewFloating, ProjectPreviewModal } from "../../../ProjectPreview";

const PREVIEW_CURSOR_GAP = 24;
const PREVIEW_VIEWPORT_MARGIN = 16;

interface ProjectItemProps {
  project: IProject;
}

export function ProjectItem(props: Readonly<ProjectItemProps>) {
  const [previewPosition, setPreviewPosition] = useState<{ x: number; y: number } | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [hasTouch, setHasTouch] = useState(false);

  // Only devices with a real pointer get the hover preview; touch gets the modal.
  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const touchQuery = window.matchMedia("(any-pointer: coarse)");
    const sync = () => {
      setCanHover(hoverQuery.matches);
      setHasTouch(touchQuery.matches);
    };
    sync();
    hoverQuery.addEventListener("change", sync);
    touchQuery.addEventListener("change", sync);
    return () => {
      hoverQuery.removeEventListener("change", sync);
      touchQuery.removeEventListener("change", sync);
    };
  }, []);

  const hasPreview = Boolean(props.project.previewImage);
  const isPreviewShowing = previewPosition !== null;
  const showFloatingPreview = hasPreview && canHover && isPreviewShowing;

  // `pointerleave` only fires when the *pointer* moves, so scrolling the card
  // out from under a stationary cursor would strand the preview on screen.
  // Dismiss it on scroll (and when the window loses focus) instead; it comes
  // straight back on the next pointer move over the card. Keyed on visibility
  // alone so pointer moves don't churn the listeners.
  useEffect(() => {
    if (!isPreviewShowing) return;

    const dismiss = () => setPreviewPosition(null);
    window.addEventListener("scroll", dismiss, { passive: true });
    window.addEventListener("blur", dismiss);

    return () => {
      window.removeEventListener("scroll", dismiss);
      window.removeEventListener("blur", dismiss);
    };
  }, [isPreviewShowing]);
  // Anything that can be touched needs the tap-to-open button, since a touch
  // never triggers the hover preview.
  const showPreviewButton = hasPreview && (!canHover || hasTouch);

  // Anchor the preview beside the cursor, flipping and clamping to stay on screen.
  // Touch and pen are ignored outright, so a tap can never open the hover
  // preview — mobile gets the tap-to-open modal instead.
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;

    const flipToLeft = e.clientX + PREVIEW_CURSOR_GAP + PREVIEW_WIDTH > window.innerWidth - PREVIEW_VIEWPORT_MARGIN;
    const x = flipToLeft ? e.clientX - PREVIEW_CURSOR_GAP - PREVIEW_WIDTH : e.clientX + PREVIEW_CURSOR_GAP;
    const maxY = window.innerHeight - PREVIEW_HEIGHT - PREVIEW_VIEWPORT_MARGIN;
    const y = Math.min(Math.max(e.clientY - PREVIEW_HEIGHT / 2, PREVIEW_VIEWPORT_MARGIN), Math.max(maxY, PREVIEW_VIEWPORT_MARGIN));

    setPreviewPosition({ x: Math.max(x, PREVIEW_VIEWPORT_MARGIN), y });
  }, []);

  // Desktop: the whole card is a shortcut to the live project. Touch is
  // excluded so a tap can't navigate away while scrolling, and it already has
  // the explicit Preview / Live Demo buttons.
  const isCardClickable = Boolean(props.project.link) && canHover && !hasTouch;

  const handleCardClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isCardClickable || !props.project.link) return;
      // Let the nested links, tech chips and buttons handle their own clicks.
      if ((e.target as HTMLElement).closest("a,button")) return;
      // Don't hijack a text selection.
      if (window.getSelection()?.toString()) return;

      window.open(props.project.link, "_blank", "noopener,noreferrer");
    },
    [isCardClickable, props.project.link]
  );

  // Shared with the filter menu, so a card can never disagree with the filter that selected it.
  const projectStatusInfo = useMemo(() => {
    const status = getProjectStatus(props.project);
    return { status, color: getProjectStatusColor(status) };
  }, [props.project]);

  const projectType = useMemo(() => getProjectType(props.project), [props.project]);

  return (
    <div
      className={cn(
        "bg-gradient-to-br from-gray-400 to-gray-700 rounded-2xl p-6 shadow-2xl hover:scale-[101%] transition-transform duration-300",
        isCardClickable && "cursor-pointer"
      )}
      id={props.project.id}
      onPointerMove={hasPreview && canHover ? handlePointerMove : undefined}
      onPointerLeave={() => setPreviewPosition(null)}
      onPointerCancel={() => setPreviewPosition(null)}
      onClick={handleCardClick}
      // Keyboard parity for the card-level shortcut; the inner links remain
      // individually focusable and are unaffected.
      role={isCardClickable ? "link" : undefined}
      tabIndex={isCardClickable ? 0 : undefined}
      aria-label={isCardClickable ? `Open ${props.project.title}` : undefined}
      onKeyDown={
        isCardClickable
          ? (e) => {
              if (e.target !== e.currentTarget) return;
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (props.project.link) window.open(props.project.link, "_blank", "noopener,noreferrer");
              }
            }
          : undefined
      }
    >
      <div className='mb-3'>
        <div className='flex justify-between items-start gap-3 sm:flex-row flex-col'>
          <div className='flex-1'>
            <h4 className='text-xl font-bold text-white mb-1'>{props.project.title}</h4>
            <span className='text-blue-300 text-sm font-medium'>{projectType}</span>
          </div>
          <span className={cn("px-3 py-1 rounded-full text-xs font-medium text-white whitespace-nowrap self-start", projectStatusInfo.color)}>{projectStatusInfo.status}</span>
        </div>
      </div>

      <MarkdownText>{props.project.description}</MarkdownText>

      {/* Conditional highlights section */}
      {/* {props.project.highlights && props.project.highlights.length > 0 && (
        <div className='mb-4'>
          <h5 className='text-white font-semibold mb-2 text-sm'>Key Features & Achievements:</h5>
          <ul className='list-disc list-inside text-gray-200 text-xs space-y-1'>
            {props.project.highlights.map((highlight) => (
              <li
                key={highlight}
                className='leading-relaxed'
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )} */}

      <div className='mb-4'>
        <div className='flex flex-wrap gap-2'>
          {props.project.technologies.map((tech, index) => (
            <div
              key={index + tech}
              className='flex items-center gap-1 bg-blue-600/80 text-white px-2 py-1 rounded-full text-xs cursor-pointer hover:scale-105 transition-transform duration-300'
              onClick={() => {
                const url = TechnologyMetadataMapping[tech].url || "";
                if (url) {
                  window.open(url, "_blank", "noopener,noreferrer");
                }
              }}
            >
              <span>
                <TechnologyIcon
                  className='w-4 h-4 flex-shrink-0'
                  icon={tech}
                />
              </span>
              <span className='truncate'>{TechnologyMetadataMapping[tech].name}</span>
            </div>
          ))}
        </div>
      </div>

      {(props.project.link || showPreviewButton) && (
        <div className='flex flex-wrap gap-3'>
          {showPreviewButton && (
            <button
              onClick={() => setIsPreviewModalOpen(true)}
              className='inline-flex items-center gap-2 rounded-lg bg-gray-700 px-3 py-2 text-sm text-white transition duration-300 hover:scale-105 hover:bg-gray-600'
            >
              <Eye className='h-4 w-4' />
              Preview
            </button>
          )}
          {props.project.link && (
            <a
              href={props.project.link}
              target='_blank'
              rel='noopener noreferrer'
              className={cn(
                "inline-flex items-center gap-2 text-white px-3 py-2 rounded-lg transition text-sm hover:scale-105 duration-300",
                props.project.link.includes("github.com") ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
              )}
            >
              {props.project.link.includes("github.com") ? (
                <>
                  <Github className='w-4 h-4' />
                  View Source
                </>
              ) : (
                <>
                  <ExternalLink className='w-4 h-4' />
                  Live Demo
                </>
              )}
            </a>
          )}
        </div>
      )}

      {showFloatingPreview && props.project.previewImage && (
        <ProjectPreviewFloating
          src={props.project.previewImage}
          title={props.project.title}
          url={props.project.link}
          x={previewPosition.x}
          y={previewPosition.y}
        />
      )}

      {isPreviewModalOpen && props.project.previewImage && (
        <ProjectPreviewModal
          src={props.project.previewImage}
          title={props.project.title}
          url={props.project.link}
          onClose={() => setIsPreviewModalOpen(false)}
        />
      )}
    </div>
  );
}
