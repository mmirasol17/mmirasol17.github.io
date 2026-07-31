import { forwardRef, useEffect, ReactNode, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";
import { useMountTransition } from "../../hooks/useMountTransition";
import { useOverflowFade } from "../../hooks/useOverflowFade";
import { useMediaQuery } from "../../hooks/useMediaQuery";

/** Tailwind's `sm`, the breakpoint this component switches presentation at. */
const DESKTOP_QUERY = "(min-width: 640px)";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;

  // Modal-specific props
  title?: string | ReactNode;
  showDoneButton?: boolean;
  doneButtonText?: string;

  /**
   * How the menu presents itself on desktop. "dropdown" anchors a panel under
   * the trigger; "modal" opens a centered dialog over the page, which suits
   * menus with enough content that an anchored panel would cover the results
   * it is filtering. Mobile is a bottom sheet either way.
   */
  desktopVariant?: "dropdown" | "modal";

  // Dropdown-specific props
  dropdownWidth?: string;
  dropdownMaxHeight?: string;
  alignment?: "left" | "right" | "center";

  // Desktop-modal-specific props
  modalWidth?: string;

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
    desktopVariant = "dropdown",
    dropdownWidth = "w-[28rem] lg:w-[32rem]",
    dropdownMaxHeight = "max-h-[32rem]",
    alignment = "left",
    modalWidth = "max-w-2xl",
    dropdownClassName = "",
    modalClassName = "",
    backdropClassName = "",
  },
  ref
) {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const isDropdown = isDesktop && desktopVariant === "dropdown";

  // Stay mounted long enough for the closing animation to play.
  const isMounted = useMountTransition(isOpen, 280);

  const setFadeRef = useOverflowFade<HTMLDivElement>();

  // The dropdown is both the scroll container and the element the parent needs
  // a ref to (for click-outside), so both refs have to land on the same node.
  const setDropdownRef = useCallback(
    (node: HTMLDivElement | null) => {
      setFadeRef(node);
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref, setFadeRef]
  );

  // Prevent body scroll behind a modal (either the mobile sheet or the desktop dialog)
  useEffect(() => {
    if (!isDropdown && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDropdown, isOpen]);

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

  if (isDropdown) {
    return (
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
    );
  }

  const overlay = (
    <div className={cn("fixed inset-0 z-50 flex", isDesktop ? "items-center justify-center p-4" : "items-end")}>
      {/* Backdrop - owns the click-to-dismiss, since it is what the pointer
          actually lands on anywhere outside the panel. */}
      <button
        type='button'
        aria-label='Close'
        tabIndex={-1}
        onClick={onClose}
        className={cn("absolute inset-0 w-full h-full bg-black/50 cursor-default", isOpen ? "animate-backdrop-in" : "animate-backdrop-out", backdropClassName)}
      />

      {/* Panel */}
      <div
        ref={ref}
        role='dialog'
        aria-modal='true'
        className={cn(
          // overflow-hidden so the scrolling body is clipped to the panel's radius
          "relative w-full bg-gray-800 shadow-xl flex flex-col overflow-hidden",
          isDesktop
            ? cn("rounded-2xl border border-gray-700 max-h-[85svh]", modalWidth, isOpen ? "animate-modal-in" : "animate-modal-out")
            : cn("rounded-t-2xl border-t border-gray-700 max-h-[90svh]", isOpen ? "animate-sheet-up" : "animate-sheet-down"),
          modalClassName
        )}
      >
        {/* Header - only show if title provided or done button enabled */}
        {(title || showDoneButton) && (
          <div className='flex-shrink-0 bg-transparent border-b border-gray-700 p-4 flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-white'>{title || ""}</h2>
            <button
              onClick={onClose}
              className='p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors'
              aria-label='Close'
            >
              <X className='w-5 h-5' />
            </button>
          </div>
        )}

        {/* Content - This is where the scroll happens */}
        <div
          ref={setFadeRef}
          className='flex-1 overflow-y-auto dropdown-scrollbar scroll-fade-y'
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
  );

  // A centered dialog has to escape the section's scroll-reveal transform,
  // which would otherwise become the containing block for `fixed`. The mobile
  // sheet stays inline so it keeps inheriting its trigger's visibility.
  return isDesktop ? createPortal(overlay, document.body) : overlay;
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
