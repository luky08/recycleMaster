import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  waste: 0,
  readyWaste: 0,
  money: 50,
  plastic: 0,
  glass: 0,
  paper: 0,
  alert: {
    active: true,
    source: "",
  },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    buyWaste(state) {
      if (state.money >= 10) {
        state.money -= 10;
        state.waste += 8;
      } else {
      }
    },
    transportWaste(state) {
      if (state.waste >= 8) {
        state.waste -= 8;
        state.readyWaste += 8;
        state.alert = {
          active: true,
        };
      } else {
        state.alert = {
          active: true,
          source: "transport",
        };
      }
    },
    sortingWaste(state, action) {
      const [s1, s2] = action.payload ?? [];
      if (state.readyWaste >= 8) {
        state.readyWaste -= 8;
        state.plastic += s1;
        state.glass += s2 - s1;
        state.paper += 8 - s2;
        state.alert = {
          active: true,
        };
      } else {
        state.alert = {
          active: true,
          source: "sorting",
        };
      }
    },
  },
});

export const { buyWaste, transportWaste, sortingWaste } = gameSlice.actions;
export default gameSlice.reducer;
