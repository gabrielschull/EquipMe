import { createSlice } from "@reduxjs/toolkit";
import { Gear } from "../types/gear.type";

const initialState: Gear[] = []
export const AllGearSlice = createSlice({
  name: "gear",
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

    // updateGear: (state, action) => {
    //     const indexToUpd = state.findIndex(
    //       (gear) => gear.id === action.payload.id
    //     );
    //     state[indexToUpd].bio = action.payload.bio
    //     state[indexToUpd].price = action.payload.price
    //   },

  },
});
export const { setAllGear, deleteGear, addGear} = AllGearSlice.actions;
export default AllGearSlice.reducer;