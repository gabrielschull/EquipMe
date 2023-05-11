import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState: any = {
  session: null,
  profile: null,
  activeRentals: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (_, action) => {
      return action.payload;
    },
    setActiveRentals: (state, action) => {
      const activeRentals = action.payload;
      state.activeRentals = activeRentals;
    },
    updateUser: (state, action) => {
      const { firstname, lastname, email, phone, bio } = action.payload.profile;
      state.profile = {
        ...state.profile,
        firstname,
        lastname,
        email,
        phone,
        bio,
      };
    },
    updateLocation: (state, action) => {
      state.profile.location = action.payload;
    },
    toggleIsOwner: (state) => {
      if (state.profile.is_owner) {
        state.profile.is_owner = false;
      } else {
        state.profile.is_owner = true;
      }
    },
    toggleIsRenter: (state) => {
      if (state.profile.is_renter) {
        state.profile.is_renter = false;
      } else {
        state.profile.is_renter = true;
      }
    },
  },
});
export const {
  setUserInfo,
  setActiveRentals,
  toggleIsOwner,
  toggleIsRenter,
  updateLocation,
  updateUser,
} = UserSlice.actions;
export default UserSlice.reducer;
