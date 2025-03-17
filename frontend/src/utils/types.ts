import { PieceColor, PieceType, Square } from "chess.js";

export type BoardTilesProps = {
  orientation: "w" | "b";
};

export type ChessBoardProps = {
  orientation: "w" | "b";
};

export type PiecesProps = {
  orientation: "w" | "b";
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

export type BoardType = ({
  type: PieceType;
  color: PieceColor;
  square: Square;
} | null)[][];
