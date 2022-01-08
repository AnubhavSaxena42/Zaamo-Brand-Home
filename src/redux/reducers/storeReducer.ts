import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  storeInfo: {},
  products: [],
  collections: [],
  vouchers: [],
  warehouse: '',
};

export const storeSlice = createSlice({
  name: 'Store',
  initialState,
  reducers: {
    setStoreProducts: (state, action: PayloadAction<any>) => {
      state.products = action.payload;
      console.log('Store Products set:', action.payload);
    },
    setStoreCollections: (state, action: PayloadAction<any>) => {
      state.collections = action.payload;
      console.log('Store Collections set:', action.payload);
    },
    setStoreVouchers: (state, action: PayloadAction<any>) => {
      state.vouchers = action.payload;
      console.log('Store Vouchers set:', action.payload);
    },
    setStoreInfo: (state, action: PayloadAction<any>) => {
      state.storeInfo = action.payload;
      console.log('Store Info Set:', action.payload);
    },
    setWarehouse: (state, action: PayloadAction<any>) => {
      state.warehouse = action.payload;
      console.log('Warehouse Id Set:', action.payload);
    },
  },
});

export const {
  setStoreProducts,
  setStoreCollections,
  setStoreInfo,
  setStoreVouchers,
  setWarehouse,
} = storeSlice.actions;

export default storeSlice.reducer;
