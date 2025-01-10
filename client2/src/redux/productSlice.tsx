import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export type ProductState = {
  product: object | [];
};

const initialState: ProductState = {
  product: [],
};

// getProducts route is defined in auth router file
export const productThunk = createAsyncThunk(
  "getProduct",
  async (token: string) => {
    const resp = await axios.get(`${BACKEND_URL}/auth/getProducts`, {
      headers: { authorization: token },
    });
    const data = await resp.data;
    return data;
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productThunk.fulfilled, (state, action) => {
      state.product = [...action.payload];
    });
    builder.addCase(productThunk.rejected, (state, action) => {
      console.log(action.error);
    });
  },
});

export default productSlice;
