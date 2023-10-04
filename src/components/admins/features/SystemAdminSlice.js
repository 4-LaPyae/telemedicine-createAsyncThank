import { createSlice } from "@reduxjs/toolkit";
import {
    addAdmin,
    deleteAdmin,
    getAdminList,
    updateAdmin,
} from "./SystemAdminApi";

const initialState = {
    adminList: [],
    loading: false,
    updateLoading: false,
    deleteLoading: false,
    forUpdateAdmin: null,
    updateFlag: false,
    profile: [],
};

export const AllAdmins = createSlice({
    name: "all admins",
    initialState,
    reducers: {
        setUpdateAdmin: (state, { payload }) => {
            state.forUpdateAdmin = payload;
        },
        setUpdateAdminDefault: (state) => {
            state.forUpdateAdmin = null;
        },
        setUpdateFlag: (state) => {
            state.updateFlag = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAdminList.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAdminList.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.adminList = payload.data;
        });
        builder.addCase(updateAdmin.pending, (state) => {
            state.updateLoading = true;
            state.updateFlag = true;
        });
        builder.addCase(updateAdmin.fulfilled, (state) => {
            state.updateLoading = false;
            state.updateFlag = false;
        });
        builder.addCase(deleteAdmin.pending, (state) => {
            state.deleteLoading = true;
        });
        builder.addCase(deleteAdmin.fulfilled, (state) => {
            state.deleteLoading = false;
        });
    },
});

export const SystemAdminSlice = AllAdmins.reducer;
export const { setUpdateAdmin, setUpdateFlag, setUpdateAdminDefault } =
    AllAdmins.actions;
