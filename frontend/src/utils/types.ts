import {
  Move,
  Piece,
  PieceColor,
  PieceType,
  ShortMove,
  Square,
} from "chess.js";

export type ChessBoardProps = {
  orientation: "w" | "b";
};

export type PiecesProps = {
  disable: boolean;
  orientation: "w" | "b";
  onActive: (active: ActivePiece) => void;
  active: ActivePiece;
  makeMove: (move: { from: Square; to: Square; piece: Piece }) => void;
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

export type ShortMoveType = {
  from: string;
  to: string;
  promotion?: Exclude<PieceType, "p" | "k"> | undefined;
};

export type BoardType = ({
  type: PieceType;
  color: PieceColor;
  square: Square;
} | null)[][];

export type ActivePiece = {
  square: Square;
  piece: Piece; //TODO: make piece type in house
} | null;

export interface MoveType extends Move {
  timeSpent: number;
}
