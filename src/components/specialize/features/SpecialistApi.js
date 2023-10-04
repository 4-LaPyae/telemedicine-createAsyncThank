import { createAsyncThunk } from "@reduxjs/toolkit";
import useFetch, { api } from "../../../app/hooks";

export const getSpecialist = createAsyncThunk(
    "getDoctorsList/getDoctorsList",
    async ({ page, limit, filterName }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await useFetch({
            url: `sys-admin/specialists?page=${page}&limit=${limit}&filterName=${filterName}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);

export const getSpecialistDropdown = createAsyncThunk(
    "getSpecialistDropdown/getSpecialistDropdown",
    async (_, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await useFetch({
            url: `sys-admin/specialists/lists`,
            method: "GET",
            token: token,
        });
        return result;
    }
);
export const addSpecialist = createAsyncThunk(
    "addSpecialist/addSpecialist",
    async ({ data }, { getState }) => {
        const { token } = getState().loginInfo;
        console.log(data);
        const response = await fetch(
            `${api}/sys-admin/specialists/store`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Credentials": true,
                    credentials: "include",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        console.log(result);
        return result;
    }
);
export const updateSpecialist = createAsyncThunk(
    "updateSpecialist/updateSpecialist",
    async ({ data, id }, { getState }) => {
        console.log(data);
        console.log(id);
        const { token } = getState().loginInfo;
        const response = await fetch(
            `${api}/sys-admin/specialists/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Credentials": true,
                    credentials: "include",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        console.log(result);
        return result;
    }
);
export const deleteSpecialist = createAsyncThunk(
    "deleteSpecialist/deleteSpecialist",
    async ({ id }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await useFetch({
            url: `sys-admin/specialists/${id}`,
            method: "DELETE",
            token: token,
        });
        console.log(result);
        return result;
    }
);

export const detailSpecialist = createAsyncThunk(
    "detailSpecialist/detailSpecialist",
    async ({ id }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await useFetch({
            url: `sys-admin/specialists/${id}/doctors`,
            method: "GET",
            token: token,
        });
        console.log(result);
        return result;
    }
);
