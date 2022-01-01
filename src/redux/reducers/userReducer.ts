import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Post} from '../../types';

const initialState = {
  user: {},
  token: {},
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
  },
});

export const {setUser, setToken, setAuthorisedBrands} = userSlice.actions;

export default userSlice.reducer;
