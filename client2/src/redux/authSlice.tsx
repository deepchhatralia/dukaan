import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie, removeCookie } from "../utils/cookie";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

type authState = {
    user: object | null,
    token: string | null
}

type LoginObjType = {
    email: string,
    password: string
}

type SignupObjType = {
    fname: string, lname: string, email: string, password: string, cpassword: string, role: number
}

type ChangePasswordType = {
    oldPassword: string,
    newPassword: string,
    newCpassword: string,
    email: string
}

const initialState: authState = {
    user: getCookie('authModule')?.user || null,
    token: getCookie('authModule').token || null
}

export const loginThunk = createAsyncThunk("auth/userLogin", async (obj: LoginObjType) => {
    const resp = await axios.post(`${BACKEND_URL}/auth/login`, obj)
    const data = await resp.data

    return data;
})

export const signupThunk = createAsyncThunk("auth/userSignup", async (obj: SignupObjType) => {
    const resp = await axios.post(`${BACKEND_URL}/auth/signup`, obj)
    const data = await resp.data

    return data;
})

export const changePasswordThunk = createAsyncThunk('auth/changePassword', async (obj: ChangePasswordType) => {
    const resp = await axios.post(`${BACKEND_URL}/auth/changePassword`, {
        email: obj.email,
        oldPassword: obj.oldPassword,
        password: obj.newPassword,
        cpassword: obj.newCpassword
    }, {
        headers: {
            'Authorization': getCookie('authModule').token
        }
    })
    const data = resp.data
    return data
})

export const verifyResetTokenThunk = createAsyncThunk('auth/verifyResetToken', async (token: string) => {
    const resp = await axios.post(`${BACKEND_URL}/auth/verifyResetToken`, { token: token })
    const data = await resp.data
    return data
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutUser: (state) => {
            removeCookie('authModule');
            state.user = null;
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.pending, (state) => {
            state.user = null
            state.token = null
        }).addCase(loginThunk.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        }).addCase(loginThunk.rejected, (state, action) => {
            console.log(action.error)
        })

        builder.addCase(signupThunk.pending, (state) => {
            state.user = null
            state.token = null
        }).addCase(signupThunk.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        }).addCase(signupThunk.rejected, (state, action) => {
            console.log(action.error)
        })

        builder.addCase(changePasswordThunk.pending, (state) => {
            state.user = null
            state.token = null
        }).addCase(changePasswordThunk.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        }).addCase(changePasswordThunk.rejected, (state, action) => {
            console.log(action.error)
        })
    }
})

export default authSlice
export const { logoutUser } = authSlice.actions