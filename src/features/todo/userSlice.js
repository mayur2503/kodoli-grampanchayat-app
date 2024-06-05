import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      (state.token = action.payload.token), (state.isAuthenticated = true);
    },
    logoutUser: (state, action) => {
      state.user = null;
      (state.token = null), (state.isAuthenticated = false);
    },
  },
});
// this is for dispatch
export const { setUser, logoutUser } = userSlice.actions;

// this is for configureStore
export default userSlice.reducer;
