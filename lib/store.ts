import accountSettingsReducer from "@/lib/state-providers/account-settings";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    accountSettings: accountSettingsReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
