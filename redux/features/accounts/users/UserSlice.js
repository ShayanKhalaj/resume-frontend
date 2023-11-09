import Cookies from "js-cookie";
const { createSlice } = require("@reduxjs/toolkit");

const INITIAL_STATE = { token: ""};

const userSlice = createSlice({
  name: "user slice",
  initialState: INITIAL_STATE,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = "";
    },
    setCookie:(state,action)=>{
      Cookies.set('token',action.payload,{
        expires:10,
        path:'/admin'
      })
    }
  },
});

export const { setToken, removeToken,setCookie} = userSlice.actions;
export default userSlice.reducer;
