import { createAsyncThunk } from "@reduxjs/toolkit";
import useFetch from "../../../app/hooks";

export const getAdminList = createAsyncThunk(
    "getAdminsList",
    async (_, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await useFetch({
            url: `sys-admin`,
            method: "GET",
            token: token,
        });
        return result;
    }
);

export const addAdmin = createAsyncThunk(
    "add Admin",
    async (data, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await useFetch({
            url: "sys-admin",
            method: "POST",
            data: data,
            token: token,
        });
        return result;
    }
);

export const deleteAdmin = createAsyncThunk(
    "delete Admin",
    async ({ admin_id }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await useFetch({
            url: `sys-admin/${admin_id}`,
            method: "DELETE",
            token: token,
        });
        return result;
    }
);

export const updateAdmin = createAsyncThunk(
    "add Admin",
    async ({ data, admin_id }, { getState }) => {
        const { token } = getState().loginInfo;
        console.log({ data, admin_id });
        const result = await useFetch({
            url: `sys-admin/${admin_id}`,
            method: "PUT",
            data: data,
            token: token,
        });
        console.log({ result });
        return result;
    }
);
