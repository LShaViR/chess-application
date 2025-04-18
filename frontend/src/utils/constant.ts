export const ranks: number[] = new Array(8).fill(0).map((_rank, i) => i + 1);
export const files: number[] = new Array(8).fill(0).map((_file, i) => i + 1);
export const WHITE = "w";
export const BLACK = "b";
export const PENDING = "pending";
export const RUNNING = "running";
export const FINISHED = "finished";
export const UNFINISHED = "unfinished";
// export const ranksArr: number[] = new Array(8).fill(0).map((_rank, i) => i + 1);
export const filesArr: string[] = "abcdefgh".split("");

export const defaultBoardFEN: string = //TODO: change type to some strict type
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
