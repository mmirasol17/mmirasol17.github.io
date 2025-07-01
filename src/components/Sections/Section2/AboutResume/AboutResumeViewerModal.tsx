import { useState, useEffect, useCallback } from "react";
import { X, Maximize2, Minimize2 } from "lucide-react";

interface AboutResumeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentId: string;
}

export function AboutResumeViewerModal(props: Readonly<AboutResumeViewerModalProps>) {
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      className='fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4'
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-lg shadow-2xl transition-all duration-300 flex flex-col ${isFullscreen ? "w-full h-full" : "w-full max-w-4xl h-5/6"}`}
        onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to backdrop
      >
        {/* Modal Header */}
        <div className='flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg flex-shrink-0'>
          <h3 className='text-sm md:text-lg font-semibold text-gray-900'>Marin Mirasol - Resume</h3>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className='p-2 hover:bg-gray-200 rounded-lg transition-colors'
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

        {/* Resume Iframe */}
        <div className='flex-1 w-full overflow-hidden'>
          <iframe
            src={`https://docs.google.com/document/d/${props.documentId}/preview`}
            className='w-full h-full border-0'
            title='Resume Preview'
            allow='fullscreen'
            style={{
              // Enable smooth scrolling on mobile
              WebkitOverflowScrolling: "touch",
              // Allow touch gestures for zoom/pan
              touchAction: "manipulation",
              // Improve rendering on mobile
              transform: "translateZ(0)",
              // Ensure proper scaling
              minHeight: "100%",
              // Mobile-specific optimizations
              WebkitTransform: "translate3d(0,0,0)",
              backfaceVisibility: "hidden",
              perspective: "1000px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
