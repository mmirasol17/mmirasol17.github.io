import { forwardRef, useEffect, ReactNode, useState, useCallback } from "react";
import { X } from "lucide-react";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;

  // Modal-specific props
  title?: string;
  showDoneButton?: boolean;
  doneButtonText?: string;

  // Dropdown-specific props
  dropdownWidth?: string;
  dropdownMaxHeight?: string;

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
    dropdownClassName = "",
    modalClassName = "",
    backdropClassName = "",
  },
  ref
) {
  // Prevent body scroll when modal is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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

  if (!isOpen) return null;

  return (
    <>
      {/* Desktop: Dropdown */}
      <div className='hidden sm:block'>
        <div
          ref={ref}
          className={`absolute top-full left-0 ${dropdownWidth} bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50 ${dropdownMaxHeight} overflow-y-auto dropdown-scrollbar ${dropdownClassName}`}
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
          <div className={`absolute inset-0 bg-black/50 ${backdropClassName}`} />

          {/* Modal Content */}
          <div
            ref={ref}
            className={`relative w-full bg-gray-800 rounded-t-2xl shadow-xl border-t border-gray-700 max-h-[90vh] flex flex-col ${modalClassName}`}
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
            <div className='flex-1 overflow-y-auto'>{children}</div>

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
