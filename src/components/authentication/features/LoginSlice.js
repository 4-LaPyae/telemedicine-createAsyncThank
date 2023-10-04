import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "./LoginApi";

const initialLoginData = {
    status: null,
    message: null,
    admin: {},
    user: null,
    token: null,
    error: null,
};

const loginData = createSlice({
    name: "loginInfo",
    initialState: {
        ...initialLoginData,
    },
    reducers: {
        storeToken: (state, { payload }) => {
            // console.log(payload);
            state.token = payload;
        },
        storeuser: (state, { payload }) => {
            // console.log(payload);
            state.user = payload;
        },
        deleteToken: (state, { payload }) => {
            state.admin = {};
            state.user = null;
            state.token = null;
            localStorage.clear();
            // window.location.reload();
        },
        deleteMessage: (state, { payload }) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getToken.pending, (state, { payload }) => {
                state.status = "pending";
            })
            .addCase(getToken.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.status = "success";
                state.message = payload.message;
                state.user = payload.data;
                if (payload.data) {
                    state.admin = payload?.data;
                    state.token = payload?.data?.token;
                    localStorage.setItem("auth", JSON.stringify(payload?.data));
                }
            });
    },
});

export const loginInfo = loginData.reducer;
export const { storeToken, storeuser, deleteToken, deleteMessage } =
    loginData.actions;
