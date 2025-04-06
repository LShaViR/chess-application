import { Chess } from "chess.js";
import { GameStatus } from "./types";
import { User } from "./User";
import { DRAW, WHITE_WINS } from "./utils/constant";

//TODO: make variable private and create methods to update them

export class Game {
  player1: string;
  player2: string;
  viewer: User[];
  gameStatus: GameStatus;
  chess: Chess;
  constructor(playerA: string, playerB: string) {
    const random = Math.floor(Math.random() * 100) % 2 == 0;
    this.player1 = random ? playerA : playerB;
    this.player2 = random ? playerB : playerA;
    this.viewer = [];
    this.gameStatus = GameStatus.running;
    this.chess = new Chess();
  }
  gameOver(result: "white_wins" | "black_wins" | "draw") {
    this.gameStatus =
      result == DRAW
        ? GameStatus.draw
        : result == WHITE_WINS
        ? GameStatus.white
        : GameStatus.black;
    //TODO: update DB
  }
}
