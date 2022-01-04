import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Post} from '../../types';

const initialState = {
  user: {},
  token: {},
  mobileNumber: '',
  authorisedBrands: [],
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      console.log('User Set:', action.payload);
    },
    setToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
      console.log('Token Set:', action.payload);
    },
    setAuthorisedBrands: (state, action: PayloadAction<any>) => {
      state.authorisedBrands = action.payload;
      console.log('Authorised Brands Set:', action.payload);
    },
    setMobileNumber: (state, action: PayloadAction<any>) => {
      state.mobileNumber = action.payload;
      console.log('Mobile Number Set:', action.payload);
    },
  },
});

export const {setUser, setToken, setMobileNumber, setAuthorisedBrands} =
  userSlice.actions;

export default userSlice.reducer;
