import { createAsyncThunk } from "@reduxjs/toolkit";
import useFetch, { api } from "../../../app/hooks";

export const homeProcessListDoctor = createAsyncThunk(
  "homeProcessListDoctor/homeProcessListDoctor",
  async ({ dPage, dLimit }, { getState }) => {
    const { token } = getState().loginInfo;
    const result = await useFetch({
      url: `sys-admin/home-progress?pPage=1&pLimit=5&dPage=${dPage}&dLimit=${dLimit}`,
      method: "GET",
      token: token,
    });
    return result;
  }
);

export const homeProcessListAppointment = createAsyncThunk(
  "homeProcessListAppointment/homeProcessListAppointment",
  async ({ pPage, pLimit }, { getState }) => {
    const { token } = getState().loginInfo;
    const result = await useFetch({
      url: `sys-admin/home-progress?pPage=${pPage}&pLimit=${pLimit}&dPage=1&dLimit=5`,
      method: "GET",
      token: token,
    });
    return result;
  }
);
