import { PieceType } from "chess.js";

export type BoardTilesProps = {
  turn: "w" | "b";
};

export type ChessBoardProps = {
  turn: "w" | "b";
};

export type PiecesProps = {
  turn: "w" | "b";
};

export enum Color {
  "w",
  "b",
}

export enum GameStatus {
  "pending",
  "running",
  "finished",
  "unfinished",
}

export type MoveType = {
  from: string;
  to: string;
  promotion?: Exclude<PieceType, "p" | "k"> | undefined;
};
