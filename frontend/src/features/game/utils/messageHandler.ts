//TODO: make a new reducer which handle these message in one dispatch
import { Chess } from "chess.js"; //TODO: change this to local
import {
  GAME_OVER,
  INIT_GAME,
  JOIN_AGAIN,
  MOVE,
  OPPONENT_DISCONNECTED,
  OPPONENT_RECONNECTED,
} from "../../../utils/messages";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { newGame, updateGame } from "../../../store/features/gameSlice";
import { makeMove, newPlayGame } from "../../../store/features/playGameSlice";
import { GameStatus } from "../../../types/game";

export const messageHandler = (
  dispatch: Dispatch<UnknownAction>,
  data: string
) => {
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
          })
        );
        dispatch(
          newPlayGame({
            candidates: [],
            activePiece: null,
            gameEnd: "",
            boardFEN: new Chess().fen(),
            history: [],
            chess: new Chess(),
          })
        );

        break;
      case JOIN_AGAIN:
        console.log("joingame");

        const chess = new Chess();
        chess.load_pgn(payload.pgn);
        const movesHistory = payload.movesHistory;

        dispatch(
          newGame({
            player1: payload.player1.name,
            player2: payload.player2.name,
            turn: payload.turn,
            gameStatus: GameStatus.RUNNING,
            gameId: payload.gameId,
          })
        );
        dispatch(
          newPlayGame({
            candidates: [],
            activePiece: null,
            gameEnd: "",
            boardFEN: chess.fen(),
            history: movesHistory,
            chess: chess,
          })
        );
        break;
      case OPPONENT_DISCONNECTED: //TODO: to be implemented
        break;
      case OPPONENT_RECONNECTED: //TODO: to be implemented
        break;
      case MOVE:
        dispatch(makeMove({ move: payload.move }));
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
