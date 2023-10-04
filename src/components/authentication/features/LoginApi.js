import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../app/hooks";

export const getToken = createAsyncThunk(
    "getToken/login",
    async ({ data }) => {
        const response = await fetch(`${api}/sys-admin/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log(result);
        return result;
    }
);
