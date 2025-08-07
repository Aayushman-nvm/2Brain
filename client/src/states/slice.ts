import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  mode: "light",
  share:false,
  sideBar:false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setShare:(state)=>{
      state.share=!state.share;
    },
    toggleSidebar:(state)=>{
      state.sideBar=!state.sideBar;
    }
  },
});

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openPopup: (state) => {
      state.isOpen = true;
    },
    closePopup: (state) => {
      state.isOpen = false;
    },
    togglePopup: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

const appReducer = appSlice.reducer;
export default appReducer;

export const modalReducer = modalSlice.reducer;

export const { setUser, setToken, setMode, setShare, toggleSidebar } = appSlice.actions;
export const { openPopup, closePopup, togglePopup } = modalSlice.actions;
