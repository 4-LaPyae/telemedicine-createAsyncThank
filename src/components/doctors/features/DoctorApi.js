import { createAsyncThunk } from "@reduxjs/toolkit";
import useFetch, { api } from "../../../app/hooks";

export const getDoctorsList = createAsyncThunk(
  "getDoctorsList/getDoctorsList",
  async ({ page, limit, filterName }, { getState }) => {
    const { token } = getState().loginInfo;
    // console.log(token);
    const result = await useFetch({
      url: `sys-admin/doctors?page=${page}&limit=${limit}&filterName=${filterName}&type=1`,
      method: "GET",
      token: token,
    });
    return result;
  }
);

export const getInhouseDoctorsList = createAsyncThunk(
  "getInhoustList",
  async ({ page, limit, filterName }, { getState }) => {
    const { token } = getState().loginInfo;

    const result = await useFetch({
      url: `sys-admin/doctors?page=${page}&limit=${limit}&filterName=${filterName}&type=2`,
      method: "GET",
      token: token,
    });
    return result;
  }
);

export const getDoctorDetail = createAsyncThunk(
  "getDoctorDetail/getDoctorDetail",
  async ({ type, id, page, limit }, { getState }) => {
    const { token } = getState().loginInfo;
    // console.log(token);
    const result = await useFetch({
      url: `sys-admin/doctors/${id}/${type}?page=${page}&limit=${limit}`,
      method: "GET",
      token: token,
    });
    // console.log(result);
    return result;
  }
);

export const addDoctor = createAsyncThunk(
  "addDoctor/addDoctor",
  async ({ data }, { getState }) => {
    // console.log(data);
    const { token } = getState().loginInfo;
    const response = await fetch(`${api}/sys-admin/doctors/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Credentials": true,
        credentials: "include",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    return result;
  }
);
export const updateDoctor = createAsyncThunk(
  "updateDoctor/updateDoctor",
  async ({ data, id }, { getState }) => {
    // console.log(data);
    const { token } = getState().loginInfo;
    const response = await fetch(`${api}/sys-admin/doctors/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Credentials": true,
        credentials: "include",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    return result;
  }
);

export const deleteDoctor = createAsyncThunk(
  "deleteDoctor/deleteDoctor",
  async ({ id, type }, { getState }) => {
    const { token } = getState().loginInfo;
    const result = await useFetch({
      url: `sys-admin/doctors/${id}/${type}}`,
      method: "DELETE",
      token: token,
    });
    console.log(result);
    return result;
  }
);

export const addDoctorSession = createAsyncThunk(
  "addDoctorSession/addDoctorSession",
  async ({ id, data }, { getState }) => {
    // console.log(data);
    const { token } = getState().loginInfo;
    const response = await fetch(`${api}/sys-admin/doctor-sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Credentials": true,
        credentials: "include",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    return result;
  }
);

export const updateDoctorSession = createAsyncThunk(
  "updateDoctorSession/updateDoctorSession",
  async ({ data, id }, { getState }) => {
    // console.log(data);
    const { token } = getState().loginInfo;
    const response = await fetch(`${api}/sys-admin/doctor-sessions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Credentials": true,
        credentials: "include",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    return result;
  }
);
