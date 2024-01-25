import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = "http://localhost:3001/api"

export const loginThunk = createAsyncThunk("userLogin", async ({ email, password }) => {
    const resp = await axios.post(`${BACKEND_URL}/login`, { email, password })
    const data = await resp.data

    return data;
})

export const signupThunk = createAsyncThunk("userSignup", async (userData) => {
    const resp = await axios.post(`${BACKEND_URL}/signup`, userData)
    const data = await resp.data

    return data;
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.pending, (state) => {
            state.user = null
            state.token = null
        }).addCase(loginThunk.fulfilled, (state, action) => {
            state.user = action.payload.data
            state.token = action.payload.token
        }).addCase(loginThunk.rejected, (state, action) => {
            console.log(action.error)
        })
    }
})

export default authSlice.reducer
export const { addUserInfo } = authSlice.actions