import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
import useReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    user: useReducer,
  },
});
