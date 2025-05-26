import { Orientation, ShortMoveType, Turn } from "./board";

export type GameBoardProps = {
  onMove: (move: ShortMoveType) => void;
  orientation: Orientation;
  turn: Turn;
};

export enum GameStatus {
  RUNNING = "running",
  FINSHED = "finished",
  INCOMPLETE = "incomplete",
}
