import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "You name",
  age: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser(state, action) {
      state.userName = action.payload.name;
      state.age = action.payload.age;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
