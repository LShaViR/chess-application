//TODO: change name for this slice and file may be board status will we a relevent name and handle some more information in this
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Move, Piece, Square } from "chess.js";
import { BoardType } from "../../utils/types";

export interface PlayGameState {
  value: {
    candidates: Move[];
    activePiece: { square: Square; piece: Piece } | null;
    gameEnd: "w" | "b" | "draw" | "";
    boardFEN: string; //TODO: make FEN type using zod
    history: Move[]; //TODO: Change type
  } | null;
}

const initialState: PlayGameState = {
  value: null,
};

export const playGameSlice = createSlice({
  name: "playGame",
  initialState,
  reducers: {
    newPlayGame: (
      state,
      action: PayloadAction<{
        candidates: Move[];
        activePiece: { square: Square; piece: Piece } | null;
        gameEnd: "w" | "b" | "draw" | "";
        boardFEN: string;
        history: Move[];
      }>
    ) => {
      state.value = action.payload;
    },
    setActivePiece: (
      state,
      action: PayloadAction<{
        activePiece: { square: Square; piece: Piece } | null;
      }>
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
        candidates: Move[];
      }>
    ) => {
      if (state.value) {
        state.value = { ...state.value, candidates: action.payload.candidates };
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
    addMoveToHistory: (state, action: PayloadAction<Move>) => {
      if (state.value) {
        state.value = {
          ...state.value,
          history: [...state.value.history, action.payload],
        };
      }
    },
    gameOver: (
      state,
      action: PayloadAction<{ gameEnd: "draw" | "w" | "b" }>
    ) => {
      if (state.value) {
        state.value = {
          ...state.value,
          gameEnd: action.payload.gameEnd,
        };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  newPlayGame,
  generateCandidates,
  clearCandidates,
  setActivePiece,
  clearActivePiece,
  updateBoard,
  addMoveToHistory,
} = playGameSlice.actions;

export default playGameSlice.reducer;
