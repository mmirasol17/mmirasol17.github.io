import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../utils/cn";

/** What a program uses to talk to the terminal. */
export interface TerminalApi {
  /** Append a line of output (empty string = blank line). */
  println(text?: string): void;
  /** Set the text shown before the input caret. */
  setPrompt(prompt: string): void;
  /** Wipe the scrollback. */
  clear(): void;
}

/** A tiny line-oriented program that drives the terminal. */
export interface TerminalProgram {
  /** Called once on mount: print the intro and the first prompt. */
  boot(api: TerminalApi): void;
  /** Called with each submitted line of input. */
  input(line: string, api: TerminalApi): void;
}

interface TerminalProps {
  /** Factory for the program instance (created once per mount). */
  makeProgram: () => TerminalProgram;
  /** Focus the input when this becomes true (e.g. the card flips to it). */
  active?: boolean;
  className?: string;
}

/**
 * A minimal interactive terminal: monospaced scrollback plus a single input
 * line. A `TerminalProgram` provides the behaviour, so the same shell hosts the
 * Tic-Tac-Toe game, the Car Database menu, etc.
 */
export function Terminal(props: Readonly<TerminalProps>) {
  const { makeProgram, active, className } = props;
  const program = useMemo(() => makeProgram(), [makeProgram]);

  const [lines, setLines] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");
  const [value, setValue] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const promptRef = useRef("");
  promptRef.current = prompt;

  // Run a program callback, batching its output into one state update.
  const run = useCallback((fn: (api: TerminalApi) => void) => {
    const pending: string[] = [];
    let nextPrompt = promptRef.current;
    let cleared = false;
    const api: TerminalApi = {
      println: (text = "") => pending.push(text),
      setPrompt: (p) => {
        nextPrompt = p;
      },
      clear: () => {
        cleared = true;
        pending.length = 0;
      },
    };
    fn(api);
    setLines((prev) => (cleared ? pending : [...prev, ...pending]));
    setPrompt(nextPrompt);
  }, []);

  useEffect(() => {
    run((api) => program.boot(api));
  }, [program, run]);

  // Keep the newest output in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, prompt]);

  useEffect(() => {
    if (active) inputRef.current?.focus();
  }, [active]);

  const submit = () => {
    const line = value;
    setValue("");
    setLines((prev) => [...prev, promptRef.current + line]); // echo
    run((api) => program.input(line, api));
  };

  return (
    <div
      className={cn("flex flex-col overflow-hidden bg-gray-950 font-mono text-[12.5px] leading-relaxed text-gray-100 sm:text-[13px]", className)}
      onClick={() => inputRef.current?.focus()}
      role='group'
      aria-label='Interactive terminal'
    >
      <div
        ref={scrollRef}
        className='flex-1 overflow-y-auto overflow-x-hidden px-3 py-2'
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className='whitespace-pre-wrap break-words'
          >
            {line === "" ? " " : line}
          </div>
        ))}
        <div className='flex whitespace-pre-wrap break-words'>
          <span className='shrink-0 text-emerald-400'>{prompt}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submit();
              }
            }}
            className='min-w-0 flex-1 border-none bg-transparent text-gray-100 caret-emerald-400 outline-none'
            spellCheck={false}
            autoCapitalize='off'
            autoComplete='off'
            autoCorrect='off'
            aria-label='Terminal input'
          />
        </div>
      </div>
    </div>
  );
}
