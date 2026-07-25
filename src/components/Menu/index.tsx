import { forwardRef, useEffect, ReactNode, useState, useCallback, useMemo } from "react";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";
import { useMountTransition } from "../../hooks/useMountTransition";
import { useOverflowFade } from "../../hooks/useOverflowFade";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;

  // Modal-specific props
  title?: string | ReactNode;
  showDoneButton?: boolean;
  doneButtonText?: string;

  // Dropdown-specific props
  dropdownWidth?: string;
  dropdownMaxHeight?: string;
  alignment?: "left" | "right" | "center";

  // Styling overrides
  dropdownClassName?: string;
  modalClassName?: string;
  backdropClassName?: string;
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(function Menu(
  {
    isOpen,
    onClose,
    children,
    title,
    showDoneButton = true,
    doneButtonText = "Done",
    dropdownWidth = "w-[28rem] lg:w-[32rem]",
    dropdownMaxHeight = "max-h-[32rem]",
    alignment = "left",
    dropdownClassName = "",
    modalClassName = "",
    backdropClassName = "",
  },
  ref
) {
  const isMobile = useMemo(() => window.innerWidth < 640, []);

  // Stay mounted long enough for the closing animation to play.
  const isMounted = useMountTransition(isOpen, 280);

  const setDropdownFadeRef = useOverflowFade<HTMLDivElement>();
  const setModalFadeRef = useOverflowFade<HTMLDivElement>();

  // The dropdown is both the scroll container and the element the parent needs
  // a ref to (for click-outside), so both refs have to land on the same node.
  const setDropdownRef = useCallback(
    (node: HTMLDivElement | null) => {
      setDropdownFadeRef(node);
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref, setDropdownFadeRef]
  );

  // Prevent body scroll when modal is open on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, isOpen]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isMounted) return null;

  return (
    <>
      {/* Desktop: Dropdown */}
      <div className='hidden sm:block'>
        <div
          ref={setDropdownRef}
          className={cn(
            "absolute top-full",
            alignment === "left" && "left-0",
            alignment === "right" && "right-0",
            alignment === "center" && "left-1/2 transform -translate-x-1/2",
            dropdownWidth,
            "bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50",
            dropdownMaxHeight,
            "overflow-y-auto dropdown-scrollbar scroll-fade-y",
            isOpen ? "animate-dropdown-in menu-items-in" : "animate-dropdown-out",
            dropdownClassName
          )}
        >
          {children}
        </div>
      </div>

      {/* Mobile: Modal */}
      <div className='sm:hidden'>
        <div
          className='fixed inset-0 z-50 flex items-end'
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className={cn("absolute inset-0 bg-black/50", isOpen ? "animate-backdrop-in" : "animate-backdrop-out", backdropClassName)} />

          {/* Modal Content */}
          <div
            ref={ref}
            className={cn(
              "relative w-full bg-gray-800 rounded-t-2xl shadow-xl border-t border-gray-700 max-h-[90svh] flex flex-col",
              isOpen ? "animate-sheet-up" : "animate-sheet-down",
              modalClassName
            )}
          >
            {/* Header - only show if title provided or done button enabled */}
            {(title || showDoneButton) && (
              <div className='flex-shrink-0 bg-transparent border-b border-gray-700 p-4 flex items-center justify-between'>
                <h2 className='text-lg font-semibold text-white'>{title || ""}</h2>
                <button
                  onClick={onClose}
                  className='p-2 hover:bg-gray-700 rounded-lg transition-colors'
                  aria-label='Close'
                >
                  <X className='w-5 h-5 text-gray-400' />
                </button>
              </div>
            )}

            {/* Content - This is where the scroll happens */}
            <div
              ref={setModalFadeRef}
              className='flex-1 overflow-y-auto scroll-fade-y'
            >
              {children}
            </div>

            {/* Done Button - only show if enabled and no title (to avoid duplicate) */}
            {showDoneButton && !title && (
              <div className='flex-shrink-0 bg-gray-800 border-t border-gray-700 p-4'>
                <button
                  onClick={onClose}
                  className='w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200'
                >
                  {doneButtonText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

// Hook for managing modal state
export const useMenu = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  };
};
