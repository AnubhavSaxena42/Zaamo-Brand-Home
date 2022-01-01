import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  loaderStatus: false,
};

export const appVariablesSlice = createSlice({
  name: 'appVariables',
  initialState,
  reducers: {
    setLoaderStatus: (state, action: PayloadAction<boolean>) => {
      state.loaderStatus = action.payload;
      console.log('loader Status updated to:', action.payload);
    },
  },
});

export const {setLoaderStatus} = appVariablesSlice.actions;

export default appVariablesSlice.reducer;
