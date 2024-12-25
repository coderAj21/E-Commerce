import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from './slices/wishlistSlice';
import modalReducer from './slices/modalSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    modal: modalReducer,
  },
});


