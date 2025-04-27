import { Chess, ChessInstance, Move } from "chess.js";
import { GameStatus, MoveType } from "./types";
import { User } from "./User";
import { DRAW, WHITE_WINS } from "./utils/constant";
import { ShortMove } from "chess.js";

//TODO: make variable private and create methods to update them

export class Game {
  player1: string;
  player2: string;
  viewer: User[];
  gameStatus: GameStatus;
  chess: ChessInstance;
  history: MoveType[];
  constructor(playerA: string, playerB: string) {
    const random = Math.floor(Math.random() * 100) % 2 == 0;
    this.player1 = random ? playerA : playerB;
    this.player2 = random ? playerB : playerA;
    this.viewer = [];
    this.gameStatus = GameStatus.running;
    this.chess = new Chess();
    this.history = [];
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
  move(move: ShortMove) {
    const detailedMove: Move | null = this.chess.move(move);
    if (detailedMove) {
      const newMove: MoveType = { ...detailedMove, timeSpent: 0 };
      this.history.push(newMove);
    } else {
      throw { message: "invalid move" };
    }
  }
}
