import { configureStore } from '@reduxjs/toolkit';
import detailsReducer from '../features/details/detailsSlice';
import cartReducer from '../features/cart/cartSlice';
import dataReducer from '../features/api/dataSlice';

export default configureStore({
  reducer: {
    data: dataReducer,
    details: detailsReducer,
    cart: cartReducer,
  },
});
