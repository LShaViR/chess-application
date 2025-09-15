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

  getGameEndReason(): string {
    if (this.chess.in_checkmate()) {
      return "checkmate";
    } else if (this.chess.in_stalemate()) {
      return "stalemate";
    } else if (this.chess.in_threefold_repetition()) {
      return "repetition";
    } else if (this.chess.insufficient_material()) {
      return "insufficient_material";
    } else if (this.chess.in_draw()) {
      return "50_move_rule";
    }
    return "unknown";
  }

  checkGameEnd(): { isGameOver: boolean; result?: "white_wins" | "black_wins" | "draw"; reason?: string } {
    if (this.chess.game_over()) {
      const reason = this.getGameEndReason();
      let result: "white_wins" | "black_wins" | "draw";
      
      if (this.chess.in_checkmate()) {
        result = this.chess.turn() === "w" ? "black_wins" : "white_wins";
      } else {
        result = "draw";
      }
      
      return { isGameOver: true, result, reason };
    }
    return { isGameOver: false };
  }
  move(move: ShortMove) {
    const detailedMove: Move | null = this.chess.move(move);
    if (detailedMove) {
      const newMove: MoveType = { 
        from: detailedMove.from,
        to: detailedMove.to,
        promotion: detailedMove.promotion || "q",
        san: detailedMove.san,
        timeSpent: 0
      };
      this.history.push(newMove);
    } else {
      throw { message: "invalid move" };
    }
  }
}
