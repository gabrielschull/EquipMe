import { createSlice } from "@reduxjs/toolkit";
import { Rental } from "../types/rental.type";

const initialState: Rental[] = []

export const AllRentalSlice = createSlice({
    name: 'rental',
    initialState,
    reducers: {
      deleteRental: (state, action) => {
        console.log("ACTION PAYLOAD", action.payload)
        const returned =  state.filter((rental) => rental.id !== action.payload);
        console.log("RETURNED", returned)
        return returned
      },
    },
  });

  export const {
    deleteRental
  } = AllRentalSlice.actions;

  export default AllRentalSlice.reducer;