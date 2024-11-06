import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        user:"",
        email:"",
    },
    reducers:{
        addUser:(state,action)=>{
            return action.payload;
        },
        removeUser:(state,action)=>{
            return null;
        },
        setEmail:(state,action)=>{
            state.email=action.payload
        }
    }
})


export const {addUser,removeUser,setEmail}=userSlice.actions;
export default userSlice.reducer;