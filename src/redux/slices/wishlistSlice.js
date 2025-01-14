import { createSlice } from "@reduxjs/toolkit";
import { setDataInLocalStorage } from "../../hooks/useLocalStorage";



const wishlistSlice=createSlice({
    name:"wishlist",
    initialState:{
        data:[],
        map:{},
        total:0,
    },
    reducers:{
        addItemToWishlist:(state,action)=>{
            let obj=action.payload;
            if (!(obj.product_id in state.map)){
                state.data.push(obj);
                state.map[obj.product_id]=obj;
            }
            setDataInLocalStorage("wishlist",state.data);
            state.total=state.data.length;
        },
        removeItemToWishlist:(state,action)=>{
            let idx=action.payload;
            state.data=state.data.filter((val)=>{
                if(val.product_id===idx){
                    delete state.map[idx];
                }
                return val.product_id!==idx
            });
            setDataInLocalStorage("wishlist",state.data);
            state.total=state.data.length;
        },
        setWishlist:(state,action)=>{
            let arr=action.payload;
            arr.forEach((val)=>{
                state.map[val.product_id]=val;
            })
            state.data=arr;
            state.total=state.data.length;
        }
    }
})

export const{addItemToWishlist,removeItemToWishlist,setWishlist}=wishlistSlice.actions;
export default wishlistSlice.reducer;