import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [
      // { uid: "uniqueid", id: "mAAftZmgVEE", quantity: 2, size: '33', colour: "C01", price: 125.00}
    ],
    count: 0,
    subtotal: 0.00,
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
    combineItems: (state) => {

    },
    addItem: (state, action) => {
      const { id, size, colour, price, quantity } = action.payload;
      const duplicateItem = state.items.find(obj =>
        obj.id === id &&
        obj.size === size &&
        obj.colour === colour
      )
      if (duplicateItem) {
        const index = state.items.findIndex(obj => obj.id === duplicateItem.id)
        state.items[index].quantity += quantity
      } else {
        state.items.push(action.payload);
      }
      state.subtotal += price;
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const arrIndex = state.items.findIndex(obj => obj.id === id);
      state.items.splice(arrIndex, 1);
    },
    updateItemQuantity: (state, action) => {
      const { uid, quantity } = action.payload;
      const arrIndex = state.items.findIndex(obj => obj.uid === uid)
      const itemObj = state.items[arrIndex];
      state.items[arrIndex] = { ...itemObj, quantity: Number(quantity)}
    },
    updateItemSize: (state, action) => {
      const { uid, size } = action.payload;
      console.log(action.payload)
      const arrIndex = state.items.findIndex(obj => obj.uid === uid)
      const itemObj = state.items[arrIndex]
      state.items[arrIndex] = { ...itemObj, size}
    },
    updateItemSpec: (state, action) => {
      const { uid, colour } = action.payload;
      const arrIndex = state.items.findIndex(obj => obj.uid === uid)
      const itemObj = state.items[arrIndex]
      state.items[arrIndex] = { ...itemObj, colour}
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
export const removeItemAndUpdateCount = uid => dispatch => {
  dispatch(removeItem(uid))
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
