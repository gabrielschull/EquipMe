import { createSlice } from '@reduxjs/toolkit';
import { Gear } from '../types/gear.type';

const initialState: Gear[] = [];
export const filteredGearSlice = createSlice({
  name: 'filteredGear',
  initialState,
  reducers: {
    setFilteredGear: (_, action) => {
      return action.payload;
    },
  },
});
export const { setFilteredGear } = filteredGearSlice.actions;

export default filteredGearSlice.reducer;
