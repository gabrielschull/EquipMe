import { createSlice } from "@reduxjs/toolkit";
import { Rental } from "../types/rental.type";

const initialState: Rental[] = []

export const AllRentalSlice = createSlice({
    name: 'rental',
    initialState,
    reducers: {
      deleteRental: (state, action) => {
        const result =  state.filter((rental) => rental.id !== action.payload);
        return result
      },
    },
  });

  export const {
    deleteRental
  } = AllRentalSlice.actions;

  export default AllRentalSlice.reducer;