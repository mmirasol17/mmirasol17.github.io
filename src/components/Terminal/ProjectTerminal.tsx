import { useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { ProjectPreviewFrame } from "../ProjectPreview";
import { Terminal, TerminalProgram } from "./Terminal";
import { createTicTacToe } from "./programs/ticTacToe";

/** Interactive CLI reimplementations that a project card can flip to. */
export type TerminalAppId = "tic-tac-toe";

const PROGRAMS: Record<TerminalAppId, () => TerminalProgram> = {
  "tic-tac-toe": createTicTacToe,
};

interface ProjectTerminalProps {
  app: TerminalAppId;
  title: string;
  url?: string;
  /** Flip the card back to the details face. */
  onClose: () => void;
  /** Whether this (back) face is currently shown. */
  active: boolean;
}

/**
 * The card's back face for CLI projects: a live terminal running an in-browser
 * reimplementation of the tool, in the shared browser-chrome frame, with the
 * same "Back to details" exit as the screenshot carousel.
 */
export function ProjectTerminal(props: Readonly<ProjectTerminalProps>) {
  const makeProgram = useMemo(() => PROGRAMS[props.app], [props.app]);

  return (
    <div
      className='relative'
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          props.onClose();
        }
      }}
    >
      <ProjectPreviewFrame
        title={props.title}
        url={props.url}
      >
        <Terminal
          makeProgram={makeProgram}
          active={props.active}
          className='h-[340px] sm:h-[400px]'
        />
      </ProjectPreviewFrame>

      <div className='mt-3 flex items-center justify-between gap-3'>
        <button
          type='button'
          onClick={props.onClose}
          className='inline-flex items-center gap-2 rounded-lg bg-gray-700 px-3 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:bg-gray-600'
        >
          <ArrowLeft className='h-4 w-4' />
          Back to details
        </button>
        <span className='hidden text-[11px] text-gray-300 sm:block'>Reimplemented in the browser - the real one is a C++ CLI</span>
      </div>
    </div>
  );
}
