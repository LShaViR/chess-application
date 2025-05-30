import {
  Move,
  Piece,
  PieceColor,
  PieceStr,
  PieceType,
  ShortMove,
  Square,
} from "./chess";

export type ChessBoardProps = {
  onMove: (move: ShortMove) => void;
  active: ActivePiece;
  onActive: (active: ActivePiece) => void;
  orientation: Orientation;
  turn: Turn;
  boardFEN: string; //TODO: check if it is valid fen or not
  disable: boolean;
  candidates: Move[]; //TODO: change move type
  squareSize: number;
};

export type PromotionProps = {
  file: number;
  piece: Piece; //TODO: change type
  makeMove: (option: Exclude<PieceType, "p" | "k">) => void;
};

export type BoardTilesProps = {
  orientation: "w" | "b";
  candidates: Move[]; //TODO: change type
};

export type PiecesProps = {
  disable: boolean;
  turn: Turn;
  orientation: Orientation;
  onActive: (active: ActivePiece) => void;
  active: ActivePiece;
  onMovePieces: (move: { from: Square; to: Square; piece: Piece }) => void;
  board: BoardType;
};

export type PieceProps = {
  orientation: Orientation;
  turn: Turn;
  piece: PieceStr;
  square: Square;
  onActive: (active: ActivePiece) => void; //TODO: change type
};

export enum Color {
  WHITE = "w",
  BLACK = "b",
}

export type BoardType = ({
  type: PieceType;
  color: PieceColor;
  square: Square;
} | null)[][];

export type ActivePiece = {
  square: Square;
  piece: Piece; //TODO: make piece type in house
} | null;

export type ShortMoveType = {
  from: Square;
  to: Square;
  promotion?: Exclude<PieceType, "p" | "k"> | undefined;
};

export interface MoveType extends Move {
  timeSpent: number;
}

export type Orientation = Color;
export type Turn = Color; //TODO: think about this if change to "w"|"b"|""
