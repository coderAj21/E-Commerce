import { createSlice } from "@reduxjs/toolkit";
import { setDataInLocalStorage } from "../../hooks/useLocalStorage";

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        data:[],
        total:0,
        map:{},
    },
    reducers:{
        addItemToCart:(state,action)=>{
            let obj=action.payload;
            if (!(obj.product_id in state.map)){
                state.data.push(obj);
                state.map[obj.product_id]=obj;
            }else{
                if(state.map[obj.product_id].quantity<5){
                    state.map[obj.product_id].quantity+=1;
                    state.data.forEach((val)=>{
                        if(val.product_id===obj.product_id){
                            val.quantity+=1;
                        }
                    })
                }
            }
            setDataInLocalStorage("cart",state.data);
            state.total=state.data.length;
        },
        removeItemToCart:(state,action)=>{
            let idx=action.payload;
            state.data=state.data.filter((val)=>{
                if(val.product_id===idx){
                    delete state.map[idx];
                }
                return val.product_id!==idx
            });
            setDataInLocalStorage("cart",state.data);
            state.total=state.data.length;
        },
        increaseItemQuantity:(state,action)=>{
            let product_id=action.payload;
            if(state.map[product_id].quantity<5){
                state.map[product_id].quantity+=1;
                state.data.forEach((val)=>{
                    if(val.product_id===product_id){
                        val.quantity+=1;
                    }
                })
            }
            setDataInLocalStorage("cart",state.data);
        },
        decreaseItemQuantity:(state,action)=>{
            let product_id=action.payload;
            if(state.map[product_id].quantity>1){
                state.map[product_id].quantity-=1;
                state.data.forEach((val)=>{
                    if(val.product_id===product_id){
                        val.quantity-=1;
                    }
                })
            }
            setDataInLocalStorage("cart",state.data);
        },
        setCartItem:(state,action)=>{
            let arr=action.payload;
            arr.forEach((val)=>{
                state.map[val.product_id]=val;
            })
            state.data=arr;
            state.total=state.data.length;
        }
    }
})

export const {addItemToCart,removeItemToCart,increaseItemQuantity,decreaseItemQuantity,setCartItem}=cartSlice.actions;
export default cartSlice.reducer;