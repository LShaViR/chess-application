import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MoveType, Turn } from "../../types/board";
import { GameStatus } from "../../types/game";
import { ChessInstance, Move } from "chess.js";
import { Square, Piece } from "react-chessboard/dist/chessboard/types";

export interface GameState {
  value: {
    player1: string;
    player2: string;
    turn: Turn;
    gameStatus: GameStatus;
    gameId: string;
    candidates: Move[];
    activePiece: { square: Square; piece: Piece } | null;
    boardFEN: string; //TODO: make FEN type using zod
    history: MoveType[]; //TODO: Change type
    chess: ChessInstance; //TODO: have to change this
  } | null;
}

const initialState: GameState = {
  value: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    newGame: (
      state,
      action: PayloadAction<{
        player1: string;
        player2: string;
        turn: Turn;
        gameStatus: GameStatus;
        gameId: string;
        candidates: Move[];
        activePiece: { square: Square; piece: Piece } | null;
        boardFEN: string;
        history: MoveType[];
        chess: ChessInstance;
      }>,
    ) => {
      console.log("Inside Init Game");
      state.value = action.payload;
      console.log(action.payload);
    },
    updateGame: (
      state,
      action: PayloadAction<{
        gameStatus: GameStatus;
      }>,
    ) => {
      if (state.value) {
        state.value = { ...state.value, gameStatus: action.payload.gameStatus };
      }
    },
    setActivePiece: (
      state,
      action: PayloadAction<{
        activePiece: { square: Square; piece: Piece } | null;
      }>,
    ) => {
      if (state.value) {
        state.value = {
          ...state.value,
          activePiece: action.payload.activePiece,
        };
      }
    },
    clearActivePiece: (state) => {
      if (state.value) {
        state.value = {
          ...state.value,
          activePiece: null,
        };
      }
    },
    generateCandidates: (
      state,
      action: PayloadAction<{
        square: Square;
      }>,
    ) => {
      if (state.value) {
        const candidates = state.value.chess.moves({
          verbose: true,
          square: action.payload.square,
        });
        state.value = { ...state.value, candidates: candidates };
      }
    },
    clearCandidates: (state) => {
      if (state.value) {
        state.value = { ...state.value, candidates: [] };
      }
    },

    updateBoard: (state, action: PayloadAction<string>) => {
      if (state.value) {
        state.value = { ...state.value, boardFEN: action.payload };
      }
    },
    addMoveToHistory: (state, action: PayloadAction<MoveType>) => {
      if (state.value) {
        state.value = {
          ...state.value,
          history: [...state.value.history, action.payload],
        };
      }
    },
    gameOver: (
      state,
      action: PayloadAction<{ gameEnd: "draw" | "w" | "b" }>,
    ) => {
      if (state.value) {
        state.value = {
          ...state.value,
          gameEnd: action.payload.gameEnd,
        };
      }
    },
    makeMove: (state, action: PayloadAction<{ move: MoveType }>) => {
      if (state.value) {
        state.value.chess.move(action.payload.move); //TODO: make move local function
        const boardFEN = state.value.chess.fen();
        state.value = {
          ...state.value,
          history: [...state.value.history, action.payload.move],
          boardFEN: boardFEN,
          candidates: [],
          activePiece: null,
        };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  newGame,
  updateGame,
  generateCandidates,
  clearCandidates,
  setActivePiece,
  clearActivePiece,
  updateBoard,
  addMoveToHistory,
  makeMove,
} = gameSlice.actions;

export default gameSlice.reducer;
