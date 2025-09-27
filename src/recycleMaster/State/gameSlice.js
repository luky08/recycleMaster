import { createSlice } from "@reduxjs/toolkit";

const tshirtKey = "tshirt";
const windowKey = "window";
const bottleKey = "bottle";
const notebookKey = "notebook";
let errorDuringOperation = false;
let errorDuringTransport = false;

const initialState = {
  errorsStore: {},
  waste: 0,
  readyWaste: 50,
  money: 500,
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
  productLevels: {},
  levelTransport: 0,
  levelSort: 0,

  tshirt: 20,
  bottle: 20,
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
    transportWaste(state, action) {
      const { name, weightFirst } = action.payload;

      if (state.waste >= weightFirst) {
        state.waste -= weightFirst;
        state.alert = {
          active: true,
        };
      } else {
        state.alert = {
          active: true,
          source: "transport",
        };
      }
      console.log(errorDuringTransport);

      if (!errorDuringTransport && state.waste >= weightFirst) {
        state.waste - weightFirst;
      } else {
        state.alert = {
          message: "Nemáš Odpad",
          name: name,
        };
        errorDuringTransport = true;
      }
      console.log(errorDuringTransport);
    },
    finishTransport(state, action) {
      const { weightFirst } = action.payload;

      if (!errorDuringTransport) {
        console.log(state.readyWaste);
        state.readyWaste += weightFirst;
        console.log(state.readyWaste);
        console.log(weightFirst);
      }
      errorDuringTransport = false;
    },

    sortingWaste(state, action) {
      const [s1, s2] = action.payload ?? [];
      const { weightSort } = action.payload;
      console.log("tt" + weightSort);
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
      const {
        name,
        trashNameFirst,
        weightFirst,
        trashNameSecond,
        weightSecond,
      } = action.payload;

      console.log("Crafting:", name);
      console.log("Using:", trashNameFirst, weightFirst);
      console.log("And:", trashNameSecond, weightSecond);

      chooseMaterial(trashNameFirst, 1);
      chooseMaterial(trashNameSecond, 2);

      function chooseMaterial(trashName, trashNumber) {
        switch (trashName) {
          case "plastic":
            state.plastic = editStateMaterial(state.plastic, trashNumber);
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
          weight = weightFirst;
        } else {
          weight = weightSecond;
        }

        if (!errorDuringOperation && stateMaterial >= weight) {
          stateMaterial -= weight;
        } else {
          state.alert = {
            message: "Nemáš " + trashNameFirst,
            name: name,
          };
          errorDuringOperation = true;
        }
        return stateMaterial;
      }
    },

    finishCrafting(state, action) {
      const { name } = action.payload;

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
    upgradeProduct(state, action) {
      const { id, cost, nextLevelIndex } = action.payload;
      if (state.money < cost) {
        state.alert = { name: id, message: "Nedostatek peněz na upgrade." };
        return;
      }
      // posuň level (komponenta už ohlídala MAX)
      state.productLevels[id] = nextLevelIndex;
      state.money -= cost;
      state.alert = null;
    },
    upgradeTransport(state, action) {
      const { cost, nextLevelIndex } = action.payload;
      if (state.money < cost) {
        state.alert = { message: "Nedostatek peněz na upgrade." };
        return;
      }
      state.levelTransport = nextLevelIndex;
      console.log(nextLevelIndex);
      state.money -= cost;
      state.alert = null;
    },
    upgradeSort(state, action) {
      const { cost, nextLevelIndex } = action.payload;
      if (state.money < cost) {
        state.alert = { message: "Nedostatek peněz na upgrade." };
        return;
      }
      state.levelSort = nextLevelIndex;
      console.log(nextLevelIndex);
      state.money -= cost;
      state.alert = null;
    },

    sellProduct(state, action) {
      const { quantityName, price, operation } = action.payload;
      //Input validation
      if (!quantityName || typeof price !== "number") return;
      const currentQty = state[quantityName];
      if (typeof currentQty !== "number") {
        state.errorsStore[quantityName] = `Unknown inventory: ${quantityName}`;
        return;
      }

      if (currentQty <= 0) {
        state.errorsStore[quantityName] = "You have nothing for sale.";
        return;
      }

      const isOne = operation === "one";
      const isAll = operation === "all";
      if (!isOne && !isAll) {
        state.errorsStore[quantityName] = `Unknown operation: ${operation}`;
        return;
      }

      const unitsToSell = isOne ? 1 : currentQty;

      // Inventory and cash update
      state[quantityName] = currentQty - unitsToSell;
      state.money += price * unitsToSell;
    },
    clearError(state, action) {
      const { name } = action.payload || {};
      if (name) {
        delete state.errorsStore[name];
      } else {
        state.errorsStore = {};
      }
    },
  },
});

export const {
  buyWaste,
  transportWaste,
  sortingWaste,
  craft,
  finishCrafting,
  upgradeProduct,
  upgradeTransport,
  upgradeSort,
  finishTransport,
  sellProduct,
  clearError,
} = gameSlice.actions;
export default gameSlice.reducer;
