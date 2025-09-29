import { createSlice } from "@reduxjs/toolkit";
import { getRandomNumberForSorting } from "./randomNumberForSorting";

const tshirtKey = "tshirt";
const windowKey = "window";
const bottleKey = "bottle";
const notebookKey = "notebook";

const initialState = {
  errorsStore: {}, //přejmenovat na něco lepšího
  errorsProcess: {},
  waste: 0,
  readyWaste: 50,
  money: 500,
  plastic: 50,
  glass: 50,
  paper: 0,

  tshirt: 20,
  bottle: 20,
  notebook: 0,
  window: 0,

  levels: {},

  errorDuringTransport: false,
  errorDuringSorting: false,
  errorDuringOperation: false,

  alert: {
    active: false,
    source: "",
    message: null,
    name: null,
  },
  alertMessage: null,
  productLevels: {},
  levelTransport: 0,
  levelSort: 0,
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
    transport(state, action) {
      const { weight } = action.payload;
      if (weight <= 0) return;

      const canTransport = state.waste >= weight;

      if (canTransport) {
        state.waste -= weight;
        state.errorDuringTransport = false;
      } else {
        /*
        state.alert = {
          active: true,
          source: "transport",
        };*/
        state.errorDuringTransport = true;
      }
    },
    finishTransport(state, action) {
      const { weight } = action.payload;

      if (!state.errorDuringTransport) {
        state.readyWaste += weight;
      }
      state.errorDuringTransport = false;
    },

    sorting(state, action) {
      const { weight } = action.payload;
      if (state.readyWaste >= weight) {
        state.readyWaste -= weight;
        state.errorDuringSorting = false;
      } else {
        /*state.alert = {
          active: true,
          source: "sorting",
        };*/
        state.errorDuringSorting = false;
      }
    },
    finishSorting(state, action) {
      const { weight } = action.payload;
      const numbers = getRandomNumberForSorting(weight);
      if (!state.errorDuringSorting) {
        updateWasteState();
      }

      function updateWasteState() {
        state.plastic += numbers.lowNumber;
        state.glass += numbers.highNumber - numbers.lowNumber;
        state.paper += weight - numbers.highNumber;
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

        if (!state.errorDuringOperation && stateMaterial >= weight) {
          stateMaterial -= weight;
        } else {
          state.alert = {
            active: true,
            message: "You dont have " + trashNameFirst + trashNameSecond,
            name: name,
          };
          state.errorDuringOperation = true;
        }
        return stateMaterial;
      }
    },

    finishCrafting(state, action) {
      const { name } = action.payload;

      if (!state.errorDuringOperation) {
        increaseNumber();
      }
      state.errorDuringOperation = false;

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

    upgrade(state, action) {
      const { id, cost, nextLevelIndex } = action.payload;
      state.levels[id] = nextLevelIndex;
      state.money -= cost;
    },

    sellProduct(state, action) {
      const { quantityName, price, operation } = action.payload;
      //Input validation
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
      const { name, type } = action.payload || {};
      const e = "errors" + type;
      if (name) {
        delete state.errors + type[name];
        console.log(state.e[name]);
        console.log(type);
      } else {
        state.errorsStore = {};
      }
    },
    cleanAlert(state) {
      state.alert = {
        active: false,
        message: null,
        name: null,
      };
    },
  },
});

export const {
  buyWaste,
  transport,
  sorting,
  finishSorting,
  craft,
  finishCrafting,
  upgrade,
  upgradeTransport,
  upgradeSort,
  finishTransport,
  sellProduct,
  clearError,
  cleanAlert,
} = gameSlice.actions;
export default gameSlice.reducer;
