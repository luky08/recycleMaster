import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  waste: 0,
  readyWaste: 0,
  money: 5000,
  plastic: 0,
  glass: 0,
  paper: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    buyWaste(state) {
      if (state.money >= 10) {
        state.money -= 10;
        state.waste += 8;
      }
    },
    transportWaste(state) {
      if (state.waste >= 8) {
        state.waste -= 8;
        state.readyWaste += 8;
      }
    },
    sortingWaste(state, action) {
      const [s1, s2] = action.payload ?? [];
      if (state.readyWaste >= 8) {
        state.readyWaste -= 8;
        state.plastic += s1;
        state.glass += s2 - s1;
        state.paper += 8 - s2;

        console.log(s1);
        console.log(s2);
      }
    },
  },
});

export const { buyWaste, transportWaste, sortingWaste } = gameSlice.actions;
export default gameSlice.reducer;
