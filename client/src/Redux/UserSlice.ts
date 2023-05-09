import { createSlice } from "@reduxjs/toolkit";
const initialState = ""
export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action) => {
      return action.payload;
    },
  },
});
export const { setUser } =UserSlice.actions;
export default UserSlice.reducer;