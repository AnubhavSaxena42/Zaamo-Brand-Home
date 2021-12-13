import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Post} from '../../types';
export interface ProductState {
  products: any;
  pageInfo: any;
  collections: any;
}

const initialState: ProductState = {
  products: [],
  collections: [],
  pageInfo: {},
};

export const postSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<any>) => {
      state.products = action.payload;
      console.log(action.payload);
      console.log('Products Set');
    },
    appendProducts: (state, action: PayloadAction<any>) => {
      const newProducts = [...state.products, ...action.payload];
      console.log(newProducts);
      console.log(state.products);
      console.log('Products Appended');
    },
    setPageInfo: (state, action: PayloadAction<any>) => {
      state.pageInfo = action.payload;
      console.log(action.payload);
      console.log('PageInfo Updated');
    },
    setCollections: (state, action: PayloadAction<any>) => {
      state.collections = action.payload;
      console.log(action.payload);
      console.log('Collections set');
    },
  },
});

export const {setProducts, setCollections, appendProducts, setPageInfo} =
  postSlice.actions;

export default postSlice.reducer;
