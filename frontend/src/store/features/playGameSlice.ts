import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MoveType } from "../../utils/types";

export interface PlayGameState {
  value: {
    candidates: MoveType[];
    activePiece: string;
    promotion?: { file: number; rank: number } | undefined;
    gameEnd: "w" | "b" | "draw" | "";
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
        candidates: MoveType[];
        activePiece: string;
        promotion?: { file: number; rank: number } | undefined;
        gameEnd: "w" | "b" | "draw" | "";
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
  setActivePiece,
  clearActivePiece,
} = playGameSlice.actions;

export default playGameSlice.reducer;
