import { createSlice } from "@reduxjs/toolkit";
import { setDataInLocalStorage } from "../../hooks/useLocalStorage";
import { USER_KEY_NAME } from "../../config/constant";

const userSlice=createSlice({
    name:"user",
    initialState:{
        user_id:"",
        email:"",
    },
    reducers:{
        setUser:(state,action)=>{
            state.email=action.email;
            state.user_id=action.user_id;            
        },
        removeUser:(state,action)=>{
            return null;
        },
        setEmail:(state,action)=>{
            state.email=action.payload
        }
    }
})


export const {setUser,removeUser,setEmail}=userSlice.actions;
export default userSlice.reducer;