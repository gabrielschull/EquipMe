import { configureStore } from "@reduxjs/toolkit";
 import GearReducer from "./GearSlice";
import UserReducer from "./UserSlice";

export const store = configureStore({
  reducer: {
    Gear: GearReducer,
    User: UserReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
