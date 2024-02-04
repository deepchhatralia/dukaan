import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productSlice from "./productSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        product: productSlice.reducer
    }
})

export default store;

export type DispatchType = typeof store.dispatch

export type rootState = {
    auth: ReturnType<typeof authSlice.reducer>,
    product: ReturnType<typeof productSlice.reducer>
}