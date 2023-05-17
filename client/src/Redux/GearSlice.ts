import { createSlice } from '@reduxjs/toolkit';
import { Gear } from '../types/gear.type';

const initialState: Gear[] = [];
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
    setAvailableDates: (state, action) => {
      const indexToUpd = state.findIndex(
        (gear) => gear.id === action.payload.id
      );
      if (indexToUpd !== -1)
        state[indexToUpd].availableDates = action.payload.gearAvailability;
    },
    setUnavailableDates: (state, action) => {
      const indexToUpd = state.findIndex(
        (gear) => gear.id === action.payload.id
      );
      state[indexToUpd].unavailableDates = [
        action.payload.rentalStartDate,
        action.payload.rentalEndDate,
      ];
    },
    updateGear: (state, action) => {
      const updatedGear = state.map((gear) => {
        if (gear.id === action.payload.id) {
          return {
            ...gear,
            name: action.payload.name,
            description: action.payload.description,
            price_hr: action.payload.price_hr,
            price_day: action.payload.price_day,
            deposit: action.payload.deposit,
          };
        }
        return gear;
      });
      return updatedGear;
    },
  },
});

export const {
  setAllGear,
  setAvailableDates,
  setUnavailableDates,
  deleteGear,
  addGear,
  updateGear,
} = AllGearSlice.actions;
export default AllGearSlice.reducer;
