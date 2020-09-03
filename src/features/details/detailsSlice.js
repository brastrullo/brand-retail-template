import { createSlice } from '@reduxjs/toolkit';

export const detailsSlice = createSlice({
  name: 'details',
  initialState: {
    obj: {}
  },
  reducers: {
    updateDetailsObj: (state, action) => {
      state.obj = action.payload
    },
    clearDetailsObj: (state) => {
      state.obj = {};
    }
  },
});

export const {
  updateDetailsObj,
  clearDetailsObj
} = detailsSlice.actions;

export const selectDetailsObj = state => state.details.obj;

export default detailsSlice.reducer;
