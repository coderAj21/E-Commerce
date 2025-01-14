import { createSlice } from "@reduxjs/toolkit";


const productSlice=createSlice({
    name:"product",
    initialState:{
        data:[],
        selected:-1,
        index:-1,
    },
    reducers:{
        addProduct:(state,action)=>{
            state.data=action.payload;
        },
        getAllProduct:(state)=>{
            return state.data;
        }
    }
});


export default productSlice.reducer;
export const{addProduct,getAllProduct,getProductByIndex}=productSlice.actions;