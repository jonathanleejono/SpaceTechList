import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "state/spaceTech/spaceTechSlice";
import userSlice from "state/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    api: apiSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
