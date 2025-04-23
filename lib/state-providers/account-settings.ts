import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

export const accountSettingsSlice = createSlice({
  name: "accountSettings",
  initialState,
  reducers: {
    toggleDropdown: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleDropdown } = accountSettingsSlice.actions;
export default accountSettingsSlice.reducer; 
