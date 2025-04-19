import { Chess, ChessInstance, Move, ShortMove } from "chess.js";
import {
  GAME_OVER,
  INIT_GAME,
  JOIN_AGAIN,
  MOVE,
  OPPONENT_DISCONNECTED,
  OPPONENT_RECONNECTED,
} from "./messages";
import { newGame, updateGame } from "../store/features/gameSlice";
import { newPlayGame } from "../store/features/playGameSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { GameStatus } from "../types/game";

export const initMessageHandler = (
  chessI: ChessInstance,
  dispatch: Dispatch<UnknownAction>,
  makeMove: (
    move: ShortMove | Move,
    chess: ChessInstance,
    turn: "w" | "b"
  ) => void
) => {
  return (data: string) => {
    // console.log(data);

    //TODO: type fixing have to be done
    try {
      const message = JSON.parse(data);
      const payload = message.payload;
      console.log(message);

      switch (message.type) {
        case INIT_GAME:
          dispatch(
            newGame({
              player1: payload.player1.name,
              player2: payload.player2.name,
              turn: payload.turn,
              gameStatus: GameStatus.RUNNING,
              gameId: payload.gameId,
              chess: chessI,
            })
          );
          dispatch(
            newPlayGame({
              candidates: [],
              activePiece: null,
              gameEnd: "",
              boardFEN: chessI.fen(),
              history: chessI.history({ verbose: true }),
            })
          );

          break;
        case JOIN_AGAIN:
          console.log("joingame");

          const chess = new Chess();
          chess.load_pgn(payload.pgn);

          dispatch(
            newGame({
              player1: payload.player1.name,
              player2: payload.player2.name,
              turn: payload.turn,
              gameStatus: GameStatus.RUNNING,
              gameId: payload.gameId,
              chess: chess,
            })
          );
          dispatch(
            newPlayGame({
              candidates: [],
              activePiece: null,
              gameEnd: "",
              boardFEN: chess.fen(),
              history: chess.history({ verbose: true }),
            })
          );
          break;
        case OPPONENT_DISCONNECTED: //TODO: to be implemented
          break;
        case OPPONENT_RECONNECTED: //TODO: to be implemented
          break;
        case MOVE:
          makeMove(payload.move, chessI, payload.turn);
          break;
        case GAME_OVER:
          dispatch(updateGame({ gameStatus: payload.result }));
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };
};
