import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from './slices/wishlistSlice';
import taxonomyReducer from './slices/taxonomySlice';
import modelRedducer from "./slices/modelSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    taxonomy:taxonomyReducer,
    modal:modelRedducer,
  },
});


