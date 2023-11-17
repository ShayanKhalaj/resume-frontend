import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {items:[]}

const adminSlice = createSlice({
    name:'admin-slice',
    initialState:INITIAL_STATE,
    reducers:{
        addToItemsReducer:(state,action)=>{
            state.items = action.payload
        },
        removeFromItemsReducer:(state,action)=>{
            state.items = []
        },
    }
})

export const {addToItemsReducer,removeFromItemsReducer} = adminSlice.actions
export default adminSlice.reducer