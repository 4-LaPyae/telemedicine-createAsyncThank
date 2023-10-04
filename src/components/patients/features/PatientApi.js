import { createAsyncThunk } from "@reduxjs/toolkit";
import useFetch from "../../../app/hooks";

export const getPatientList = createAsyncThunk(
    "getPatientList/getPatientList",
    async ({ page, limit, filterName }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await useFetch({
            url: `sys-admin/patients?page=${page}&limit=${limit}&filterName=${filterName}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);
export const addPatient = createAsyncThunk(
    "addPatient/addPatient",
    async (data, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await useFetch({
            url: `sys-admin/patients/store`,
            method: "POST",
            data: data,
            token: token,
        });
        return result;
    }
);

export const deletePatient = createAsyncThunk(
    "deletePatient/deletePatient",
    async (id, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await useFetch({
            url: `sys-admin/patients/${id}`,
            method: "DELETE",
            token: token,
        });
        return result;
    }
);

export const updatePatientApi = createAsyncThunk(
    "updatePatient/updatePatient",
    async ({ id, patient }, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await useFetch({
            url: `sys-admin/patients/${id}`,
            method: "PUT",
            data: patient,
            token: token,
        });
        return result;
    }
);

export const detailPatient = createAsyncThunk(
    "detailPatient/detailPatient",
    async (id, { getState }) => {
        const { token } = getState().loginInfo;
        const result = await useFetch({
            url: `sys-admin/patients/${id}`,
            method: "GET",
            token: token,
        });
        return result;
    }
);
