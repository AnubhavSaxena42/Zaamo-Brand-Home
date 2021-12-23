import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  brands: [],
};

export const brandsSlice = createSlice({
  name: 'Brands',
  initialState,
  reducers: {
    setBrands: (state, action: PayloadAction<any>) => {
      state.brands = action.payload;
      console.log('Brands Set:', action.payload);
    },
  },
});

export const {setBrands} = brandsSlice.actions;

export default brandsSlice.reducer;
