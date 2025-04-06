//TODO: change name for this slice and file may be board status will we a relevent name and handle some more information in this
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Move, Piece, Square } from "chess.js";
import { BoardType } from "../../utils/types";

export interface PlayGameState {
  value: {
    candidates: Move[];
    activePiece: { square: Square | ""; piece: Piece | "" };
    promotion?:
      | { file: number; rank: number; from: Square; to: Square }
      | undefined;
    gameEnd: "w" | "b" | "draw" | "";
    board: BoardType;
    history: Move[];
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
        activePiece: { square: Square | ""; piece: Piece | "" };
        promotion?:
          | { file: number; rank: number; from: Square; to: Square }
          | undefined;
        gameEnd: "w" | "b" | "draw" | "";
        board: BoardType;
        history: Move[];
      }>
    ) => {
      state.value = action.payload;
    },
    setActivePiece: (
      state,
      action: PayloadAction<{
        activePiece: { square: Square | ""; piece: Piece | "" };
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
          activePiece: { square: "", piece: "" },
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
    promotionUpdate: (
      state,
      action: PayloadAction<{
        file: number;
        rank: number;
        from: Square;
        to: Square;
      }>
    ) => {
      if (state.value)
        state.value = { ...state.value, promotion: action.payload };
    },
    promotionAction: (state) => {
      if (state.value) {
        state.value = { ...state.value, promotion: undefined };
      }
    },
    updateBoard: (state, action: PayloadAction<BoardType>) => {
      if (state.value) {
        state.value = { ...state.value, board: action.payload };
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
  },
});

// Action creators are generated for each case reducer function
export const {
  newPlayGame,
  generateCandidates,
  clearCandidates,
  promotionAction,
  promotionUpdate,
  setActivePiece,
  clearActivePiece,
  updateBoard,
  addMoveToHistory,
} = playGameSlice.actions;

export default playGameSlice.reducer;
