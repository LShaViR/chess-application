import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MoveType } from "../../utils/types";
import { ShortMove } from "chess.js";
import { useSelector } from "react-redux";

export interface PlayGameState {
  value: {
    candidates: MoveType[];
    activePiece: string;
    promotion?: { file: number; rank: number } | undefined;
    gameEnd: "w" | "b" | "draw" | "";
    timer: { player1: number; player2: number };
  } | null;
}

const initialState: PlayGameState = {
  value: null,
};
const game = useSelector;

export const playGameSlice = createSlice({
  name: "playGame",
  initialState,
  reducers: {
    newPlayGame: (
      state,
      action: PayloadAction<{
        candidates: MoveType[];
        activePiece: string;
        promotion?: { file: number; rank: number } | undefined;
        gameEnd: "w" | "b" | "draw" | "";
        timer: { player1: number; player2: number };
      }>
    ) => {
      state.value = action.payload;
    },
    generateCandidates: (
      state,
      action: PayloadAction<{
        candidates: MoveType[];
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
        from: string;
        to: string;
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
  },
});

// Action creators are generated for each case reducer function
export const {
  newPlayGame,
  generateCandidates,
  clearCandidates,
  promotionAction,
  promotionUpdate,
} = playGameSlice.actions;

export default playGameSlice.reducer;
