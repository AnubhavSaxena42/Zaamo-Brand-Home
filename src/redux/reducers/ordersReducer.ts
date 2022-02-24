import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Post} from '../../types';

const initialState = {
  allOrders: [],
  receivedOrders: [],
  inProcessOrders: [],
  shippedOrders: [],
  deliveredOrders: [],
  cancelledOrders: [],
  returnRequestedOrders: [],
  returnInitiatedOrders: [],
  returnCompletedOrders: [],
  fulfilledOrders: [],
};

export const ordersSlice = createSlice({
  name: 'Orders',
  initialState,
  reducers: {
    setAllOrders: (state, action: PayloadAction<any[]>) => {
      state.allOrders = action.payload;
      console.log('dispatch');
    },

    setReceivedOrders: (state, action: PayloadAction<any[]>) => {
      state.receivedOrders = action.payload;
      console.log('dispatch');
    },

    setInProcessOrders: (state, action: PayloadAction<any[]>) => {
      state.inProcessOrders = action.payload;
      console.log('dispatch');
    },

    setShippedOrders: (state, action: PayloadAction<any[]>) => {
      state.shippedOrders = action.payload;
      console.log('dispatch');
    },

    setDeliveredOrders: (state, action: PayloadAction<any[]>) => {
      state.deliveredOrders = action.payload;
      console.log('dispatch');
    },

    setCancelledOrders: (state, action: PayloadAction<any[]>) => {
      state.cancelledOrders = action.payload;
      console.log('dispatch');
    },

    setReturnRequestedOrders: (state, action: PayloadAction<any[]>) => {
      state.returnRequestedOrders = action.payload;
      console.log('dispatch');
    },
    setReturnInitiatedOrders: (state, action: PayloadAction<any[]>) => {
      state.returnInitiatedOrders = action.payload;
      console.log('dispatch');
    },

    setReturnCompletedOrders: (state, action: PayloadAction<any[]>) => {
      state.returnCompletedOrders = action.payload;
      console.log('dispatch');
    },
    setFulfilledOrders: (state, action: PayloadAction<any[]>) => {
      state.fulfilledOrders = action.payload;
      console.log('dispatch');
    },
  },
});

export const {
  setAllOrders,
  setReceivedOrders,
  setInProcessOrders,
  setDeliveredOrders,
  setCancelledOrders,
  setShippedOrders,
  setFulfilledOrders,
  setReturnCompletedOrders,
  setReturnInitiatedOrders,
  setReturnRequestedOrders,
} = ordersSlice.actions;

export default ordersSlice.reducer;
