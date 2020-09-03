import { createSlice } from '@reduxjs/toolkit';
import data from '../../mockInventory.json';

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    inventory: {},
    new_arrivals: [],
    collections: {},
    detailsObj: {}
  },
  reducers: {
    clearDetailsObj: (state) => {
      state.detailsObj = {}
    },
    fetchDetailsObj: (state, action) => {
      const id = action.payload;
      const detailsObj = state.obj.find(obj => obj.id === id)
      state.detailsObj = detailsObj;
    },
    fetchInventory: (state) => {
      state.obj = data.inventory;
    },
    fetchNewArrivals: (state) => {
      state.new_arrivals = data.collections.new_arrivals.map(id =>
        state.obj.find(obj => obj.id === id)
      )
    },
    fetchCollections: (state) => {
      Object.entries(data.collections).forEach(arr => {
        const collectionObj = arr[1].map(id =>
          state.obj.find(obj => obj.id === id)
        )
        state.collections = { ...state.collections, [arr[0]]: collectionObj }
      })
    }
  },
});

export const fetchAsync = () => dispatch => {
  dispatch(fetchInventory());
  dispatch(fetchNewArrivals());
  dispatch(fetchCollections());
};

export const {
  fetchDetailsObj,
  clearDetailsObj,
  fetchInventory,
  fetchCollections,
  fetchNewArrivals
} = dataSlice.actions;

export const selectInventory = state => state.data.inventory;
export const selectCollections = state => state.data.collections;
export const selectNewArrivals = state => state.data.new_arrivals;
export const selectDetailsObj = state => state.data.detailsObj;

export default dataSlice.reducer;
