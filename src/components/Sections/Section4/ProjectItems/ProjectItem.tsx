import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { IProject } from "../../../../hooks/useProjects";
import { TechnologyIcon } from "../../../Icons/TechnologyIcon";
import { ExternalLink, Eye, Github, Terminal as TerminalIcon } from "lucide-react";
import { TechnologyMetadataMapping } from "../../../../types/TechnologyMetadataMapping";
import { cn } from "../../../../utils/cn";
import { getProjectStatus, getProjectStatusColor, getProjectType } from "../../../../utils";
import { MarkdownText } from "../../../MarkdownText";
import { PREVIEW_HEIGHT, PREVIEW_WIDTH, ProjectPreviewFloating } from "../../../ProjectPreview";
import { ProjectPreviewCarousel } from "../../../ProjectPreview/ProjectPreviewCarousel";
import { ProjectTerminal } from "../../../Terminal/ProjectTerminal";

const PREVIEW_CURSOR_GAP = 24;
const PREVIEW_VIEWPORT_MARGIN = 16;

interface ProjectItemProps {
  project: IProject;
}

export function ProjectItem(props: Readonly<ProjectItemProps>) {
  const [previewPosition, setPreviewPosition] = useState<{ x: number; y: number } | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [frontHeight, setFrontHeight] = useState<number>();
  const [backHeight, setBackHeight] = useState<number>();
  const [canHover, setCanHover] = useState(false);

  const previewButtonRef = useRef<HTMLButtonElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const images = props.project.previewImages ?? [];
  const terminalApp = props.project.terminal;
  const hasImages = images.length > 0;
  const hasFlip = hasImages || Boolean(terminalApp);
  const backId = `${props.project.id}-preview`;

  // Only devices with a real pointer get the hover preview.
  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(hoverQuery.matches);
    sync();
    hoverQuery.addEventListener("change", sync);
    return () => hoverQuery.removeEventListener("change", sync);
  }, []);

  const isPreviewShowing = previewPosition !== null;
  const showFloatingPreview = hasImages && canHover && isPreviewShowing && !isFlipped;

  // Dismiss the hover preview on scroll / blur.
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

  // Measure BOTH faces up front (not just the active one) so the flip has its
  // target height immediately — no post-flip growth/lag. Observe once, not per
  // flip. setState bails when a height is unchanged, so this can't feedback-loop.
  useLayoutEffect(() => {
    if (!hasFlip) return;
    const measure = () => {
      if (frontRef.current) setFrontHeight(frontRef.current.offsetHeight);
      if (backRef.current) setBackHeight(backRef.current.offsetHeight);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (frontRef.current) observer.observe(frontRef.current);
    if (backRef.current) observer.observe(backRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [hasFlip]);

  const sceneHeight = isFlipped ? backHeight : frontHeight;

  // Mark the hidden face `inert` (backface-visibility hides it visually only).
  useEffect(() => {
    if (!hasFlip) return;
    frontRef.current?.toggleAttribute("inert", isFlipped);
    backRef.current?.toggleAttribute("inert", !isFlipped);
  }, [hasFlip, isFlipped]);

  const toggleFlip = useCallback(() => setIsFlipped((f) => !f), []);
  const flipBack = useCallback(() => {
    setIsFlipped(false);
    previewButtonRef.current?.focus();
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const flipToLeft = e.clientX + PREVIEW_CURSOR_GAP + PREVIEW_WIDTH > window.innerWidth - PREVIEW_VIEWPORT_MARGIN;
    const x = flipToLeft ? e.clientX - PREVIEW_CURSOR_GAP - PREVIEW_WIDTH : e.clientX + PREVIEW_CURSOR_GAP;
    const maxY = window.innerHeight - PREVIEW_HEIGHT - PREVIEW_VIEWPORT_MARGIN;
    const y = Math.min(Math.max(e.clientY - PREVIEW_HEIGHT / 2, PREVIEW_VIEWPORT_MARGIN), Math.max(maxY, PREVIEW_VIEWPORT_MARGIN));
    setPreviewPosition({ x: Math.max(x, PREVIEW_VIEWPORT_MARGIN), y });
  }, []);

  // Clicking the card body (any device) flips to the preview/terminal. Nested
  // links, buttons, and tech chips (which stopPropagation) handle their own
  // clicks; exit is via the Back button / Escape.
  const handleCardActivate = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (target.closest("a,button")) return;
      if (window.getSelection()?.toString()) return;
      if (!hasFlip || isFlipped) return;
      setPreviewPosition(null);
      toggleFlip();
    },
    [hasFlip, isFlipped, toggleFlip]
  );

  const projectStatusInfo = useMemo(() => {
    const status = getProjectStatus(props.project);
    return { status, color: getProjectStatusColor(status) };
  }, [props.project]);

  const projectType = useMemo(() => getProjectType(props.project), [props.project]);

  const detailsContent = (
    <>
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

      <div className='mb-4'>
        <div className='flex flex-wrap gap-2'>
          {props.project.technologies.map((tech, index) => (
            <div
              key={index + tech}
              className='flex items-center gap-1 bg-blue-600/80 text-white px-2 py-1 rounded-full text-xs cursor-pointer hover:scale-105 transition-transform duration-300'
              onClick={(e) => {
                e.stopPropagation();
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

      {(props.project.link || hasFlip) && (
        <div className='flex flex-wrap gap-3'>
          {hasFlip && (
            <button
              ref={previewButtonRef}
              onClick={toggleFlip}
              aria-expanded={isFlipped}
              aria-controls={backId}
              className='inline-flex items-center gap-2 rounded-lg bg-gray-700 px-3 py-2 text-sm text-white transition duration-300 hover:scale-105 hover:bg-gray-600'
            >
              {terminalApp ? (
                <>
                  <TerminalIcon className='h-4 w-4' />
                  Try it
                </>
              ) : (
                <>
                  <Eye className='h-4 w-4' />
                  Preview
                </>
              )}
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
    </>
  );

  return (
    <div
      className={cn("bg-gradient-to-br from-gray-400 to-gray-700 rounded-2xl p-6 shadow-2xl hover:scale-[101%] transition-transform duration-300", hasFlip && !isFlipped && "cursor-pointer")}
      id={props.project.id}
      onPointerMove={hasImages && canHover ? handlePointerMove : undefined}
      onPointerLeave={() => setPreviewPosition(null)}
      onPointerCancel={() => setPreviewPosition(null)}
      onClick={handleCardActivate}
    >
      {hasFlip ? (
        <div
          ref={sceneRef}
          className={cn("flip-scene", isFlipped && "is-flipped")}
          style={{ height: sceneHeight }}
        >
          <div className='flip-card'>
            <div
              ref={frontRef}
              className='flip-face flip-face-front'
              aria-hidden={isFlipped}
            >
              {detailsContent}
            </div>
            <div
              ref={backRef}
              id={backId}
              className='flip-face flip-face-back'
              aria-hidden={!isFlipped}
            >
              {terminalApp ? (
                <ProjectTerminal
                  app={terminalApp}
                  title={props.project.title}
                  url={props.project.link}
                  onClose={flipBack}
                  active={isFlipped}
                />
              ) : (
                <ProjectPreviewCarousel
                  images={images}
                  title={props.project.title}
                  url={props.project.link}
                  index={carouselIndex}
                  onIndexChange={setCarouselIndex}
                  onClose={flipBack}
                  active={isFlipped}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        detailsContent
      )}

      {showFloatingPreview && images[0] && (
        <ProjectPreviewFloating
          src={images[0]}
          title={props.project.title}
          url={props.project.link}
          x={previewPosition.x}
          y={previewPosition.y}
        />
      )}
    </div>
  );
}
