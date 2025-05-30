import { Orientation, ShortMoveType, Turn } from "./board";

export type GameBoardProps = {
  onMove: (move: ShortMoveType) => void;
  orientation: Orientation;
  turn: Turn;
  squareSize: number;
};

export enum GameStatus {
  RUNNING = "running",
  FINSHED = "finished",
  INCOMPLETE = "incomplete",
}

export type Player = {
  username: string;
  avatarUrl: string;
  rating: number;
};
