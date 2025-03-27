import { Move, PieceColor, PieceType, ShortMove, Square } from "chess.js";

export type BoardTilesProps = {
  orientation: "w" | "b";
  candidates: Move[];
};

export type ChessBoardProps = {
  orientation: "w" | "b";
};

export type PiecesProps = {
  disable: boolean;
  orientation: "w" | "b";
  setActive: (square: Square | "") => void;
  active: Square | "";
  makeMove: (move: ShortMove) => void;
  board: Array<
    Array<{
      type: PieceType;
      color: PieceColor;
      square: Square;
    } | null>
  >;
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
