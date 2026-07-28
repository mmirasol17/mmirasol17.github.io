import { KeyboardEvent, PointerEvent, useEffect, useRef } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";
import { ProjectPreviewFrame } from ".";

interface ProjectPreviewCarouselProps {
  images: string[];
  title: string;
  url?: string;
  icon?: string;
  index: number;
  onIndexChange: (i: number) => void;
  /** Flip the card back to the details face. */
  onClose: () => void;
  /** Whether this (back) face is currently shown - gates keyboard handling + focus. */
  active: boolean;
}

const SWIPE_THRESHOLD = 40;

/**
 * The card's back face: a paginatable gallery of screenshots inside the shared
 * browser-chrome frame. Arrows + dots on desktop, swipe on touch, Left/Right +
 * Escape on keyboard, and a clear "Back to details" control.
 */
export function ProjectPreviewCarousel(props: Readonly<ProjectPreviewCarouselProps>) {
  const { images, index, onIndexChange, onClose } = props;
  const count = images.length;
  const multiple = count > 1;
  const startX = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // When the card flips to this face, move focus here so arrow keys and Escape
  // work immediately and screen readers land on the gallery.
  useEffect(() => {
    if (props.active) rootRef.current?.focus();
  }, [props.active]);

  const clamp = (i: number) => Math.max(0, Math.min(count - 1, i));
  const go = (delta: number) => onIndexChange(clamp(index + delta));

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!props.active) return;
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (!multiple) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (!multiple) return;
    if (dx <= -SWIPE_THRESHOLD) go(1);
    else if (dx >= SWIPE_THRESHOLD) go(-1);
  };

  return (
    <div
      ref={rootRef}
      tabIndex={-1}
      className='relative outline-none'
      role='group'
      aria-roledescription='carousel'
      aria-label={`${props.title} screenshots`}
      onKeyDown={handleKeyDown}
    >
      <ProjectPreviewFrame
        title={props.title}
        url={props.url}
        icon={props.icon}
      >
        <div
          className='carousel-viewport relative bg-gray-900'
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => (startX.current = null)}
        >
          <div
            className='carousel-track'
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((src, i) => (
              <div
                className='carousel-slide'
                key={src}
              >
                <img
                  src={src}
                  alt={`${props.title} screenshot ${i + 1} of ${count}`}
                  className='block max-h-[60vh] w-full object-contain'
                  decoding='async'
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {multiple && (
            <>
              <button
                type='button'
                onClick={() => go(-1)}
                disabled={index === 0}
                className='absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-gray-900/70 p-1.5 text-white backdrop-blur transition hover:bg-gray-900 disabled:pointer-events-none disabled:opacity-30'
                aria-label='Previous screenshot'
              >
                <ChevronLeft className='h-5 w-5' />
              </button>
              <button
                type='button'
                onClick={() => go(1)}
                disabled={index === count - 1}
                className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-gray-900/70 p-1.5 text-white backdrop-blur transition hover:bg-gray-900 disabled:pointer-events-none disabled:opacity-30'
                aria-label='Next screenshot'
              >
                <ChevronRight className='h-5 w-5' />
              </button>
            </>
          )}
        </div>
      </ProjectPreviewFrame>

      <div className='mt-3 flex items-center justify-between gap-3'>
        <button
          type='button'
          onClick={onClose}
          className='inline-flex items-center gap-2 rounded-lg bg-gray-700 px-3 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:bg-gray-600'
        >
          <ArrowLeft className='h-4 w-4' />
          Back to details
        </button>

        {multiple && (
          <div className='flex items-center gap-2'>
            {images.map((src, i) => (
              <button
                type='button'
                key={src}
                onClick={() => onIndexChange(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                aria-current={i === index}
                className={cn("h-2 rounded-full transition-all duration-300", i === index ? "w-5 bg-white" : "w-2 bg-white/40 hover:bg-white/70")}
              />
            ))}
          </div>
        )}
      </div>

      <span
        className='sr-only'
        aria-live='polite'
      >
        Screenshot {index + 1} of {count}
      </span>
    </div>
  );
}
