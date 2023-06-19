import { configureStore } from "@reduxjs/toolkit";
import { invoicesReducer, userReducer } from "./invoices";

export const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    user: userReducer,
  },
});
