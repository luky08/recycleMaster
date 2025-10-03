import { createSlice } from "@reduxjs/toolkit";
import { getRandomNumberForSorting } from "./randomNumberForSorting";

const tshirtKey = "tshirt";
const windowKey = "window";
const bottleKey = "bottle";
const notebookKey = "notebook";

const initialState = {
  alertsStore: {},

  waste: 0,
  readyWaste: 0,
  money: 50,
  plastic: 50,
  glass: 0,
  paper: 0,

  tshirt: 0,
  bottle: 0,
  notebook: 0,
  window: 0,

  levels: {},
  endGameProgress: 0,

  errorDuringTransport: false,
  errorDuringSorting: false,
  errorDuringOperation: false,

  alert: {
    active: false,
    source: "",
    message: null,
    name: null,
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
    transport(state, action) {
      const { weight } = action.payload;
      if (weight <= 0) return;

      const canTransport = state.waste >= weight;

      if (canTransport) {
        state.waste -= weight;
        state.errorDuringTransport = false;
      } else {
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
      const { name, rePoint } = action.payload;

      if (!state.errorDuringOperation) {
        increaseNumber();
        state.endGameProgress += rePoint;
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
      const { name, price, actionSell } = action.payload;
      const currentQty = state[name];
      if (typeof currentQty !== "number") {
        state.alertsStore[name] = `Unknown inventory: ${name}`;
        return;
      }

      if (currentQty <= 0) {
        state.alertsStore[name] = "You have nothing for sale.";
        return;
      }

      const isOne = actionSell === "one";
      const isAll = actionSell === "all";
      if (!isOne && !isAll) {
        state.alertsStore[name] = `Unknown action: ${actionSell}`;
        return;
      }

      const unitsToSell = isOne ? 1 : currentQty;

      state[name] = currentQty - unitsToSell;
      state.money += price * unitsToSell;
    },

    clearAlertReStore(state, action) {
      const { name, type } = action.payload || {};
      const e = "errors" + type;
      if (name) {
        delete state.errors + type[name];
        console.log(state.e[name]);
        console.log(type);
      } else {
        state.alertsStore = {};
      }
    },

    setAlert(state, action) {
      const { message, name } = action.payload || {};
      state.alert = {
        active: true,
        message: message ?? null,
        name: name ?? null,
      };
    },

    cleanAlert(state) {
      state.alert = {
        active: false,
        message: null,
        name: null,
      };
    },
    startBlocking(state) {
      state.navBlockers += 1;
    },
    stopBlocking(state) {
      state.navBlockers = Math.max(0, state.navBlockers - 1);
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
  finishTransport,
  sellProduct,
  clearAlertReStore,
  cleanAlert,
  setAlert,
  startBlocking,
  stopBlocking,
} = gameSlice.actions;

export default gameSlice.reducer;

export const selectCanCraft = (state, payload) => {
  const {
    trashNameFirst,
    weightFirst = 0,
    trashNameSecond,
    weightSecond = 0,
  } = payload || {};

  const { plastic = 0, glass = 0, paper = 0 } = state.game;
  const required = { plastic: 0, glass: 0, paper: 0 };

  const addReq = (name, w) => {
    if (!name) return;
    const need = Number(w) || 0;
    if (need <= 0) return;
    if (name === "plastic" || name === "glass" || name === "paper") {
      required[name] += need;
    }
  };

  addReq(trashNameFirst, weightFirst);
  addReq(trashNameSecond, weightSecond);

  if (plastic < required.plastic) return false;
  if (glass < required.glass) return false;
  if (paper < required.paper) return false;

  return true;
};
