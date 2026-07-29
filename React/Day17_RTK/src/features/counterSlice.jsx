import {  createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name:"counter",
    initialState:{
        count:0,
    },
    reducers:{
        increment:(state)=>{
           state.count++
        },
        decrement:(state)=>{
           state.count--
        },
        reset:(state)=>{
           state.count = 0
        },
        incrementByInput:(state,action)=>{
            state.count += action.payload

        }
    }
})

export const {increment,decrement,reset,  incrementByInput} =counterSlice.actions 
export default counterSlice.reducer
