import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const store = configureStore({
    reducer: authSlice
})
export default store;
export type DispatchType = typeof store.dispatch