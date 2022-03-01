import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Post} from '../../types';

const initialState = {
  user: {},
  token: {},
  mobileNumber: '',
  authorisedBrands: [],
  shippingPolicy: '',
  returnPolicy: '',
  brandContactName: '',
  brandContactNumber: '',
  brandEmail: '',
  brandOrderInfo: '',
  creatorGuidelines: '',
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
    setShippingPolicy: (state, action: PayloadAction<any>) => {
      state.shippingPolicy = action.payload;
      console.log('Shipping Policy Set:', action.payload);
    },
    setReturnPolicy: (state, action: PayloadAction<any>) => {
      state.returnPolicy = action.payload;
      console.log('Return Policy Set:', action.payload);
    },
    setBrandContactName: (state, action: PayloadAction<any>) => {
      state.brandContactName = action.payload;
      console.log('Brand Contact Name Set:', action.payload);
    },
    setBrandContactNumber: (state, action: PayloadAction<any>) => {
      state.brandContactNumber = action.payload;
      console.log('Brand Contact Number Set:', action.payload);
    },
    setBrandEmail: (state, action: PayloadAction<any>) => {
      state.brandEmail = action.payload;
      console.log('Brand Contact Email Set:', action.payload);
    },
    setBrandOrderInfo: (state, action: PayloadAction<any>) => {
      state.brandOrderInfo = action.payload;
      console.log('Brand Order Info Set:', action.payload);
    },
    setCreatorGuidelines: (state, action: PayloadAction<any>) => {
      state.creatorGuidelines = action.payload;
      console.log('Creator Guidelines Set:', action.payload);
    },
  },
});

export const {
  setUser,
  setShippingPolicy,
  setCreatorGuidelines,
  setReturnPolicy,
  setBrandOrderInfo,
  setToken,
  setBrandEmail,
  setMobileNumber,
  setBrandContactName,
  setBrandContactNumber,
  setAuthorisedBrands,
} = userSlice.actions;

export default userSlice.reducer;
