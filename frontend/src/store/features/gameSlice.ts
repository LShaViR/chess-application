import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ChessInstance } from "chess.js";
import { Turn } from "../../types/board";
import { GameStatus } from "../../types/game";

export interface GameState {
  value: {
    player1: string;
    player2: string;
    turn: Turn;
    gameStatus: GameStatus;
    gameId: string;
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
      }>
    ) => {
      state.value = action.payload;
    },
    updateGame: (
      state,
      action: PayloadAction<{
        gameStatus: GameStatus;
      }>
    ) => {
      if (state.value) {
        state.value = { ...state.value, gameStatus: action.payload.gameStatus };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { newGame, updateGame } = gameSlice.actions;

export default gameSlice.reducer;
