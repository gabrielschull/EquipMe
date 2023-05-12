import { createSlice } from "@reduxjs/toolkit";
import { Gear } from "../types/gear.type";

const initialState: Gear[] = []
export const AllGearSlice = createSlice({
  name: 'gear',
  initialState,
  reducers: {
    setAllGear: (_, action) => {
      return action.payload;
    },
    addGear: (state, action) => {
      const newState = [...state, action.payload];
      return newState;
    },
    deleteGear: (state, action) => {
      return state.filter((gear) => gear.id !== action.payload);
    },
    setUnavailableDates: (state, action) => {
      const indexToUpd = state.findIndex(
        (gear) => gear.id === action.payload.id
      );
      // const unavailableDates = action.payload;
      console.log('GearSlice >>> unavailableDates=', action.payload);
      state[indexToUpd].unavailableDates = [
        action.payload.rentalStartDate,
        action.payload.rentalEndDate,
      ];
      console.log('GearSlice >>> state[indexToUpd]=', state[indexToUpd]);
    },
    updateGear: (state, action) => {
      const indexToUpd = state.findIndex(
        (gear) => gear.id === action.payload.id
      );
      state[indexToUpd].description = action.payload.description;
      state[indexToUpd].price_hr = action.payload.price_hr;
      state[indexToUpd].price_day = action.payload.price_day;
      state[indexToUpd].deposit = action.payload.deposit;
    },
  },
});
export const {
  setAllGear,
  setUnavailableDates,
  deleteGear,
  addGear,
  updateGear,
} = AllGearSlice.actions;
export default AllGearSlice.reducer;