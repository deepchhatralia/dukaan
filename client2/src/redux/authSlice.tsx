import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BACKEND_URL = "http://localhost:3001/api"

export type authState = {
    user: object | null,
    token: string | null
}

export type LoginObjType = {
    email: string,
    password: string
}

export type SignupObjType = {
    fname: string, lname: string, email: string, password: string, cpassword: string
}

const initialState: authState = {
    user: null,
    token: null
}

export const loginThunk = createAsyncThunk("userLogin", async (obj: LoginObjType) => {
    const resp = await axios.post(`${BACKEND_URL}/login`, obj)
    const data = await resp.data

    return data;
})

export const signupThunk = createAsyncThunk("userSignup", async (userData: SignupObjType) => {
    const resp = await axios.post(`${BACKEND_URL}/signup`, userData)
    const data = await resp.data

    return data;
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutUser: (state) => {
            localStorage.removeItem("authModule");
            state.user = null;
            state.token = null;
        }
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
export const { logoutUser } = authSlice.actions