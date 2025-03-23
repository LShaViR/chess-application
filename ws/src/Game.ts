import { Chess } from "chess.js";
import { GameStatus } from "./types";
import { User } from "./SocketManager";

export class Game {
  player1: string;
  player2: string;
  turn: "wb" | "bw";
  viewer: User[];
  gameStatus: GameStatus;
  currentPosition: string;
  prevPosition: string;
  lastMove: string;
  chess: Chess;
  constructor(player1: string, player2: string) {
    this.player1 = player1;
    this.player2 = player2;
    this.viewer = [];
    this.gameStatus = GameStatus.running;
    this.currentPosition = new Chess().fen();
    this.prevPosition = "";
    this.lastMove = "";
    this.chess = new Chess();
    this.turn = Math.floor(Math.random() * 100) % 2 == 0 ? "wb" : "bw";
  }
}
