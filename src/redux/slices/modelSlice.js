import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  view: null,
  customSize: "320px",
  size: "sm",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.view = action.payload.view || null;
      state.customSize = action.payload.customSize || "320px";
      state.size = action.payload.size || "sm";
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.view = null;
      state.customSize = "320px";
      state.size = "sm";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
