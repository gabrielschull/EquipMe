import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState: any = {
  session: null,
  profile: null,
  activeRentals: [],
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.profile = action.payload.profile;
      state.session = action.payload.session;
    },
    setActiveRentals: (state, action) => {
      const activeRentals = action.payload;
      state.activeRentals = activeRentals;
    },
    addOneNewRental: (state, action) => {
      const newRental = action.payload;
      state.activeRentals = [...state.activeRentals, newRental];
    },
    deleteRental: (state, action) => {
      state.activeRentals =  state.activeRentals.filter((rental : any) => rental.id !== action.payload);
      console.log("STATE RENTALS",state.activeRentals)
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
  deleteRental,
  updateUser,
  addOneNewRental,
} = UserSlice.actions;
export default UserSlice.reducer;
