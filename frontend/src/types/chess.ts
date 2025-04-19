import {
  Move,
  Piece,
  PieceColor,
  PieceType,
  ShortMove,
  Square,
} from "chess.js";

type PieceStr =
  | "wk"
  | "wq"
  | "wr"
  | "wb"
  | "wn"
  | "wp"
  | "bk"
  | "bq"
  | "br"
  | "bb"
  | "bn"
  | "bp";

export type { Move, Piece, PieceColor, PieceType, ShortMove, Square, PieceStr };
