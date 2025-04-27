import { Move } from "chess.js";

export enum GameStatus {
  "running",
  "white",
  "black",
  "draw",
  "unfinished",
}

export interface MoveType extends Move {
  timeSpent: number;
}
