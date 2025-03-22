import { Chess } from "chess.js";
import { GameStatus } from "./types";
import { User } from "./SocketManager";

export class Game {
  player1: User | null;
  player2: User | null;
  viewer: User[];
  gameStatus: GameStatus;
  currentPosition: string;
  prevPosition: string;
  lastMove: string;
  constructor(player1: User, player2: User) {
    this.player1 = player1;
    this.player2 = player2;
    this.viewer = [];
    this.gameStatus = GameStatus.running;
    this.currentPosition = new Chess().fen();
    this.prevPosition = "";
    this.lastMove = "";
  }
}
