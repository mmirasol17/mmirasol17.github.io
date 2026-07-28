import { useState, useEffect, useCallback, useRef } from "react";
import { X, Maximize2, Minimize2, ZoomIn, ZoomOut } from "lucide-react";
import { useResumeDocument } from "../../../../hooks/useResumeDocument";
import { handleScrollToElementById } from "../../../../utils";
import { ResumeDocument } from "./ResumeDocument";

interface AboutResumeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentId: string;
}

// Same rungs Google Docs offers, minus the ones that make 9pt type unreadable either way.
const ZOOM_STEPS = [0.5, 0.75, 1, 1.25, 1.5, 2];

export function AboutResumeViewerModal(props: Readonly<AboutResumeViewerModalProps>) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { status, document: resumeDocument } = useResumeDocument(props.documentId);

  // null = follow the viewer (fit on phones, 100% once the page fits). Any number pins the zoom.
  const [zoom, setZoom] = useState<number | null>(null);
  const [scale, setScale] = useState(1);

  const handleZoom = useCallback((direction: 1 | -1) => {
    setZoom((current) => {
      const base = current ?? scale;
      const next =
        direction === 1
          ? ZOOM_STEPS.find((step) => step > base + 0.001)
          : [...ZOOM_STEPS].reverse().find((step) => step < base - 0.001);
      return next ?? base;
    });
  }, [scale]);

  // Set when a redaction chip is clicked. The scroll-lock cleanup below is the only point where the
  // page is scrollable again *and* the restore has already happened, so the jump is handed to it
  // rather than raced against it with a timer.
  const isContactRequestedRef = useRef(false);

  const handleContactRequest = useCallback(() => {
    isContactRequestedRef.current = true;
    props.onClose();
  }, [props.onClose]);

  // Lock/unlock body scroll when modal opens/closes
  useEffect(() => {
    if (props.isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;

      // Lock body scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        // Restore body scroll
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";

        // Restore scroll position
        window.scrollTo(0, scrollY);

        // The component stays mounted between openings, so a pinned zoom would otherwise persist.
        setZoom(null);

        if (isContactRequestedRef.current) {
          isContactRequestedRef.current = false;
          handleScrollToElementById("contact");
        }
      };
    }
  }, [props.isOpen]);

  // Handle click outside to close
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Only close if clicking the backdrop (not the modal content)
      if (e.target === e.currentTarget) {
        props.onClose();
      }
    },
    [props.onClose]
  );

  // Handle escape key to close
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && props.isOpen) {
        props.onClose();
      }
    };

    if (props.isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => document.removeEventListener("keydown", handleEscapeKey);
    }
  }, [props.isOpen, props.onClose]);

  if (!props.isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-0 md:p-4'
      onClick={handleBackdropClick}
    >
      {/* Edge to edge on phones - the document is dense enough that inset margins and a 5/6 height
          were costing real reading space. The windowed treatment starts at md. */}
      <div
        className={`bg-white shadow-2xl transition-all duration-300 flex flex-col w-full h-full rounded-none md:rounded-lg ${
          isFullscreen ? "md:w-full md:h-full" : "md:max-w-4xl md:h-5/6"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to backdrop
      >
        {/* Modal Header */}
        <div className='flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-none md:rounded-t-lg flex-shrink-0'>
          <h3 className='text-sm md:text-lg font-semibold text-gray-900'>Marin Mirasol - Resume</h3>
          <div className='flex items-center gap-2'>
            {/* The page is rendered at its true 8.5in width so the line breaks match the document,
                which leaves 9pt type small on a phone - hence a real zoom control rather than reflow. */}
            {status === "ready" && (
              <div className='flex items-center rounded-lg border border-gray-200 bg-white'>
                <button
                  onClick={() => handleZoom(-1)}
                  disabled={scale <= ZOOM_STEPS[0] + 0.001}
                  className='p-2 rounded-l-lg hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:hover:bg-transparent'
                  title='Zoom out'
                >
                  <ZoomOut className='w-4 h-4 text-gray-600' />
                </button>
                <button
                  onClick={() => setZoom(null)}
                  className='w-14 py-1 text-xs tabular-nums text-gray-600 hover:bg-gray-100 transition-colors'
                  title='Fit to width'
                >
                  {Math.round(scale * 100)}%
                </button>
                <button
                  onClick={() => handleZoom(1)}
                  disabled={scale >= ZOOM_STEPS[ZOOM_STEPS.length - 1] - 0.001}
                  className='p-2 rounded-r-lg hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:hover:bg-transparent'
                  title='Zoom in'
                >
                  <ZoomIn className='w-4 h-4 text-gray-600' />
                </button>
              </div>
            )}

            {/* Hidden on phones, where the modal already fills the screen and this would do nothing. */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className='hidden md:block p-2 hover:bg-gray-200 rounded-lg transition-colors'
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className='w-5 h-5 text-gray-600' /> : <Maximize2 className='w-5 h-5 text-gray-600' />}
            </button>
            <button
              onClick={props.onClose}
              className='p-2 hover:bg-gray-200 rounded-lg transition-colors'
              title='Close'
            >
              <X className='w-5 h-5 text-gray-600' />
            </button>
          </div>
        </div>

        {/* Resume Body */}
        {/* Grey canvas behind the page, the way Docs frames a document. overflow-x has to stay
            reachable - zooming past the fit scale makes the page wider than the modal. */}
        <div className='flex-1 w-full overflow-auto bg-[#f1f3f4] rounded-b-none md:rounded-b-lg'>
          {status === "loading" && (
            <div className='flex h-full w-full items-center justify-center gap-3 text-gray-500'>
              <div className='w-6 h-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-400' />
              <span>Loading resume...</span>
            </div>
          )}

          {status === "ready" && resumeDocument && (
            <ResumeDocument
              document={resumeDocument}
              onContactRequest={handleContactRequest}
              zoom={zoom}
              onScaleChange={setScale}
            />
          )}

          {/* If the export can't be fetched, fall back to Google's own viewer. Contact details are
              visible in that case, so it stays a last resort rather than the default path. */}
          {status === "error" && (
            <iframe
              src={`https://docs.google.com/document/d/${props.documentId}/preview`}
              className='w-full h-full border-0'
              title='Resume Preview'
              allow='fullscreen'
              style={{
                WebkitOverflowScrolling: "touch",
                touchAction: "manipulation",
                transform: "translateZ(0)",
                minHeight: "100%",
                WebkitTransform: "translate3d(0,0,0)",
                backfaceVisibility: "hidden",
                perspective: "1000px",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
