import { createSlice, current } from "@reduxjs/toolkit";

const INITIAL_STATE = {items:[],item:{},createModal:false,editModal:false};


const CRUD_OperationsSlice = createSlice({
  name: "crud operations slice",
  initialState: INITIAL_STATE,
  reducers: {
    showCreateModalReducer: (state=INITIAL_STATE, action) => {
      state = {...state,createModal:action.payload}
      return state
    },
    showEditModalReducer: (state=INITIAL_STATE, action) => {
      state = {...state,editModal:action.payload}
      return state
    },
    addModelToItemsListReducer:(state=INITIAL_STATE,action)=>{
      state.items = action.payload
    },
    addModelToItemReducer:(state=INITIAL_STATE,action)=>{
      state.item = action.payload
    },
    removeModelsFromItemsListReducer:(state=INITIAL_STATE,action)=>{
      state.items=[]
    },
    removeModelFromItemReducer:(state=INITIAL_STATE,action)=>{
      state.item={}
    }
  },
});

export const { removeModelFromItemReducer,showCreateModalReducer,showEditModalReducer,addModelToItemsListReducer ,addModelToItemReducer,removeModelsFromItemsListReducer} = CRUD_OperationsSlice.actions;
export default CRUD_OperationsSlice.reducer;
