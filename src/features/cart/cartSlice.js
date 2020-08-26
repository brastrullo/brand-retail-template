import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    // *** mock item array --->: [
    // ***  { id: '1b3462v', quantity: 1, size: '5.5', specID: 0 }
    // *** ]
    items: [
      { refId: "0", quantity: 1, size: '7.5', specID: "2", price: 120.00 },
      { refId: "2", quantity: 1, size: '10.5', specID: "3", price: 35.00 },
      { refId: "1", quantity: 1, size: 'L', specID: "1", price: 25.00 }
    ],
    count: 3,
    subtotal: 180.00,
  },
  reducers: {
    updateCount: (state) => {
      let count = 0;
      state.items.forEach(item => {
        count+= item.quantity;
      })
      state.count = count;
    },
    updateSubtotal: (state) => {
      let sub = 0
      state.items.forEach(item => {
        sub += Number(item.quantity) * Number(item.price);
      })
      state.subtotal = Number(sub).toFixed(2);
    },
    addItem: (state, action) => {
      const { obj } = action.payload;
      state.items.push(obj);
      state.subtotal += obj.price;
    },
    removeItem: (state, action) => {
      const refId = action.payload;
      const arrIndex = state.items.findIndex(obj => obj.refId.toString() === refId.toString());
      state.items.splice(arrIndex, 1);
    },
    updateItemQuantity: (state, action) => {
      const { refId, quantity } = action.payload;
      const arrIndex = state.items.findIndex(obj => obj.refId.toString() === refId.toString())
      const itemObj = state.items[arrIndex]
      state.items[arrIndex] = { ...itemObj, quantity: Number(quantity)}
    },
    updateItemSize: (state, action) => {
      const {refId, size } = action.payload;
      const arrIndex = state.items.findIndex(obj => obj.refId.toString() === refId.toString())
      const itemObj = state.items[arrIndex]
      state.items[arrIndex] = { ...itemObj, size}
    },
    updateItemSpec: (state, action) => {
      const { refId, specID } = action.payload;
      const arrIndex = state.items.findIndex(obj => obj.refId.toString() === refId.toString())
      const itemObj = state.items[arrIndex]
      state.items[arrIndex] = { ...itemObj, specID}
    },
  },
});

export const {
  addItem,
  removeItem,
  updateCount,
  updateSubtotal,
  updateItemQuantity,
  updateItemSize,
  updateItemSpec
} = cartSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// ****************
export const addItemAndUpdateCount = obj => dispatch => {
  dispatch(addItem(obj))
  dispatch(updateCount())
  dispatch(updateSubtotal())
};
export const removeItemAndUpdateCount = refId => dispatch => {
  dispatch(removeItem(refId))
  dispatch(updateCount())
  dispatch(updateSubtotal())
};
export const updateItemQuantityAndCount = obj => dispatch => {
  dispatch(updateItemQuantity(obj))
  dispatch(updateCount())
  dispatch(updateSubtotal())
};

export const selectItemArray = state => state.cart.items;
export const selectCartCount = state => state.cart.count;
export const selectSubtotal = state => Number(state.cart.subtotal).toFixed(2);

export default cartSlice.reducer;
