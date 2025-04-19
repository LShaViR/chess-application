import { ChessInstance } from "chess.js";
import { Orientation, ShortMoveType, Turn } from "./board";

export type GameBoardProps = {
  onMove: (move: ShortMoveType) => void;
  orientation: Orientation;
  turn: Turn;
  chess?: ChessInstance; //TODO: change this
};

export enum GameStatus {
  RUNNING = "running",
  WHITE_WINS = "w",
  BLACK_WINS = "b",
  DRAW = "draw",
}
