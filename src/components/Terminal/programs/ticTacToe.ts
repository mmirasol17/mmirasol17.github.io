import { TerminalApi, TerminalProgram } from "../Terminal";

/**
 * Faithful in-browser reimplementation of the Terminal-Tic-Tac-Toe C++ CLI:
 * two players, names entered up front (P1 = X, P2 = O), numpad 1-9 positions,
 * round-by-round board, and win/tie detection.
 */

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

const MARKS = ["X", "O"] as const;

export function createTicTacToe(): TerminalProgram {
  let stage: "name1" | "name2" | "play" | "gameover" = "name1";
  let names: [string, string] = ["Player 1", "Player 2"];
  let board: string[] = Array(9).fill(" ");
  let turn = 0; // 0 = X, 1 = O
  let round = 1;

  const boardLines = (cells: string[]): string[] => {
    const row = (r: number) => ` ${cells[r * 3]} | ${cells[r * 3 + 1]} | ${cells[r * 3 + 2]} `;
    return [row(0), "-----------", row(1), "-----------", row(2)];
  };

  const guideLines = (): string[] => boardLines(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);

  const winner = (): number[] | null => WIN_LINES.find((l) => board[l[0]] !== " " && board[l[0]] === board[l[1]] && board[l[1]] === board[l[2]]) ?? null;

  const isTie = (): boolean => board.every((c) => c !== " ");

  const startRound = (api: TerminalApi) => {
    api.println("");
    api.println(`ROUND #${round}  (${names[turn]}'s turn):`);
    api.println("");
    boardLines(board).forEach((l) => api.println(l));
    api.println("");
    api.println("Positions:");
    guideLines().forEach((l) => api.println(l));
    api.println("");
    api.setPrompt(`${names[turn]}, choose a spot to mark: `);
  };

  const reset = () => {
    board = Array(9).fill(" ");
    turn = 0;
    round = 1;
  };

  return {
    boot(api) {
      api.println("Welcome to Tic-Tac-Toe!");
      api.println("A 2-player game - grab a friend, or play both sides.");
      api.println("");
      api.setPrompt("Enter a name for player 1: ");
      stage = "name1";
    },

    input(line, api) {
      const text = line.trim();

      if (stage === "name1") {
        names[0] = text || "Player 1";
        api.setPrompt("Enter a name for player 2: ");
        stage = "name2";
        return;
      }

      if (stage === "name2") {
        names[1] = text || "Player 2";
        api.println("-----------------------------------------");
        api.println(`${names[0]} = X`);
        api.println(`${names[1]} = O`);
        api.println("-----------------------------------------");
        stage = "play";
        startRound(api);
        return;
      }

      if (stage === "play") {
        const choice = Number(text);
        if (!Number.isInteger(choice) || choice < 1 || choice > 9) {
          api.println("  ↳ Invalid input - pick a number from 1 to 9.");
          return;
        }
        if (board[choice - 1] !== " ") {
          api.println("  ↳ That spot is taken - choose an empty one.");
          return;
        }

        board[choice - 1] = MARKS[turn];

        if (winner()) {
          api.println("");
          api.println("TIC-TAC-TOE, GAME OVER!!!");
          api.println("");
          boardLines(board).forEach((l) => api.println(l));
          api.println("");
          api.println(`${names[turn]} wins! 🎉`);
          api.println("-----------------------------------------");
          stage = "gameover";
          api.setPrompt("Play again? (y/n): ");
          return;
        }

        if (isTie()) {
          api.println("");
          api.println("TIE, GAME OVER!!!");
          api.println("");
          boardLines(board).forEach((l) => api.println(l));
          api.println("");
          api.println(`Sorry ${names[0]} and ${names[1]}, no one wins!`);
          api.println("-----------------------------------------");
          stage = "gameover";
          api.setPrompt("Play again? (y/n): ");
          return;
        }

        turn = turn === 0 ? 1 : 0;
        round += 1;
        startRound(api);
        return;
      }

      // gameover
      if (text.toLowerCase().startsWith("y")) {
        reset();
        api.clear();
        api.println("New game!");
        stage = "play";
        startRound(api);
      } else {
        api.println("Thanks for playing! Type 'y' any time to start again.");
      }
    },
  };
}
