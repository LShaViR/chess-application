import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Square {
  color: string;
  square: string;
  type: string;
}

export interface BoardState {
  value: (Square | null)[][];
}

const initialState: BoardState = {
  value: Array.from({ length: 8 }, () => Array(8).fill(null)),
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    updateBoard: (state, action: PayloadAction<(Square | null)[][]>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateBoard } = boardSlice.actions;

export default boardSlice.reducer;
