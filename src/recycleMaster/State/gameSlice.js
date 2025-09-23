import { createSlice } from "@reduxjs/toolkit";

const tshirtKey = "tshirt";
const windowKey = "window";
const bottleKey = "bottle";
const notebookKey = "notebook";
let errorDuringOperation = false;

const initialState = {
  waste: 0,
  readyWaste: 0,
  money: 50,
  plastic: 50,
  glass: 50,
  paper: 0,
  alert: {
    active: true,
    source: "",
    message: null,
    name: null,
  },
  alertMessage: null,

  tshirt: 0,
  bottle: 0,
  notebook: 0,
  window: 0,
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
    finishCrafting(state, action) {
      const { name, trashName1, weight1, trashName2, weight2 } = action.payload;

      if (!errorDuringOperation) {
        increaseNumber();
      }
      errorDuringOperation = false;

      function increaseNumber() {
        switch (name) {
          case tshirtKey:
            state.tshirt++;
            break;
          case bottleKey:
            state.bottle++;
            break;
          case windowKey:
            state.window++;
            break;
          case notebookKey:
            state.notebook++;
            break;
          default:
            break;
        }
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
        state.alertMessage;
      } else {
        state.alert = {
          active: true,
          source: "sorting",
        };
      }
    },
    craft(state, action) {
      const { name, trashName1, weight1, trashName2, weight2 } = action.payload;

      console.log("Crafting:", name);
      console.log("Using:", trashName1, weight1);
      console.log("And:", trashName2, weight2);

      chooseMaterial(trashName1, 1);
      chooseMaterial(trashName2, 2);

      function chooseMaterial(trashName, trashNumber) {
        switch (trashName) {
          case "plastic":
            state.plastic = editStateMaterial(state.plastic, trashNumber);
            localStorage.setItem("plastic", state.plastic);
            break;
          case "glass":
            state.glass = editStateMaterial(state.glass, trashNumber);
            break;
          case "paper":
            state.paper = editStateMaterial(state.paper, trashNumber);
            break;
          default:
            break;
        }
      }

      function editStateMaterial(stateMaterial, weightNumber) {
        let weight = null;
        if (weightNumber == 1) {
          weight = weight1;
        } else {
          weight = weight2;
        }

        if (!errorDuringOperation && stateMaterial >= weight) {
          stateMaterial -= weight;
        } else {
          state.alert = {
            message: "Nemáš " + trashName1,
            name: name,
          };
          errorDuringOperation = true;
        }
        return stateMaterial;
      }
    },
  },
});

export const { buyWaste, transportWaste, sortingWaste, craft, finishCrafting } =
  gameSlice.actions;
export default gameSlice.reducer;
