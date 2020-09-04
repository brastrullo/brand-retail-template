import { createSlice } from '@reduxjs/toolkit';
import data from '../../mockInventory.json';

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    inventory: {},
    new_arrivals: [],
    collections: {},
    detailsObj: {},
    countObj: {}
  },
  reducers: {
    clearDetailsObj: (state, action) => {
      const { id } = action.payload;
      delete state.detailsObj[id]
    },
    clearZeroCount: (state) => {
      Object.keys(state.countObj).forEach(id => {
        if (state.countObj[id] === 0) {
          delete state.countObj[id]
        }
      })
    },
    updateCountObj: (state, action) => {
      const { id, count } = action.payload;
      state.countObj = {
        ...state.countObj,
        [id]: count
      };
    },
    fetchDetailsObj: (state, action) => {
      const id = action.payload;
      const itemObj = state.inventory.find(obj => obj.id === id);
      state.detailsObj = itemObj;
    },
    fetchInventory: (state) => {
      state.inventory = data.inventory;
    },
    fetchNewArrivals: (state) => {
      state.new_arrivals = data.collections.new_arrivals.map(id =>
        state.inventory.find(obj => obj.id === id)
      )
    },
    fetchCollections: (state) => {
      Object.entries(data.collections).forEach(arr => {
        const collectionObj = arr[1].map(id =>
          state.inventory.find(obj => obj.id === id)
        )
        state.collections = { ...state.collections, [arr[0]]: collectionObj }
      })
    }
  },
});

// export const actionLog = () => dispatch => {
//   dispatch()
//   console.log()
// }

export const fetchAsync = () => dispatch => {
  dispatch(fetchInventory());
  dispatch(fetchNewArrivals());
  dispatch(fetchCollections());
};

export const {
  updateCountObj,
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
export const selectCountObj = state => state.data.countObj;

export default dataSlice.reducer;
