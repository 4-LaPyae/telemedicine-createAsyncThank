import { createAsyncThunk } from "@reduxjs/toolkit";
import useFetch from "../../../app/hooks";

export const getAppointmentList = createAsyncThunk(
  "get Appointment list",
  async ({ doctorName, patientName, page, limit }, { getState }) => {
    const { token } = getState().loginInfo;
    const result = await useFetch({
      url: `sys-admin/appointments?doctorName=${doctorName}&patientName=${patientName}&limit=${limit}&page=${page}`,
      method: "GET",
      token: token,
    });
    return result;
  }
);

export const getInAppointmentList = createAsyncThunk(
  "get inAppointment list",
  async ({ page, limit, docName, ptName }, { getState }) => {
    const { token } = getState().loginInfo;
    const result = await useFetch({
      url: `sys-admin/consultant-appointment?page=${page}&limit=${limit}&doctorName=${docName}&patientName=${ptName}`,
      method: "GET",
      token: token,
    });
    return result;
  }
);

export const addInAppointment = createAsyncThunk(
  "add Inappointment",
  async (data, { getState }) => {
    const { token } = getState().loginInfo;
    const result = await useFetch({
      url: "sys-admin/consultant-appointment",
      method: "POST",
      data,
      token,
    });
    return result;
  }
);
