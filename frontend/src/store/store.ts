import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import gameReducer from "./features/gameSlice";
import playGameReducer from "./features/playGameSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    game: gameReducer,
    playGame: playGameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables the warning completely
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
