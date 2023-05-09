import { createSlice } from "@reduxjs/toolkit";

export const initialState:any  =   {session: null,
profile: null}

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (_, action) => {
      return action.payload;
    },
  },
});
export const { setUserInfo} = UserSlice.actions;
export default UserSlice.reducer;