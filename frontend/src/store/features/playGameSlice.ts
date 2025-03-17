import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Move, Square } from "chess.js";
import { BoardType } from "../../utils/types";

export interface PlayGameState {
  value: {
    candidates: Move[];
    activePiece: string;
    promotion?:
      | { file: number; rank: number; from: Square; to: Square }
      | undefined;
    gameEnd: "w" | "b" | "draw" | "";
    board: BoardType;
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
        activePiece: string;
        promotion?:
          | { file: number; rank: number; from: Square; to: Square }
          | undefined;
        gameEnd: "w" | "b" | "draw" | "";
        board: BoardType;
      }>
    ) => {
      state.value = action.payload;
    },
    setActivePiece: (state, action: PayloadAction<{ activePiece: string }>) => {
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
          activePiece: "",
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
} = playGameSlice.actions;

export default playGameSlice.reducer;
