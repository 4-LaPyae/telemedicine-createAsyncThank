import { createSlice } from "@reduxjs/toolkit";
import {} from "./DoctorApi";
import {
  addDoctor,
  addDoctorSession,
  getInhouseDoctorsList,
  deleteDoctor,
  getDoctorDetail,
  getDoctorsList,
  updateDoctor,
  updateDoctorSession,
} from "./DoctorApi";

const initialState = {
  getStatus: null,
  getDetailStatus: null,
  addStatus: null,
  deleteStatus: null,
  updateStatus: null,
  addSessionStatus: null,
  doctors: null,
  inDoctors: null,
  inhouseStatus: false,
  doctorsDetail: null,
  selectDoctor: null,
  pagination: {},
  paginationData: {
    page: 1,
    limit: 10,
  },
};

export const AllDoctors = createSlice({
  name: "alldoctors",
  initialState,
  reducers: {
    changePaginationData: (state, { payload }) => {
      state.paginationData = payload;
    },
    handleDoctor: (state, payload) => {
      const { doctors, ...rest } = payload;
      state.doctors = doctors;
      state.pagination = rest;
    },
    selectDoctor: (state, { payload }) => {
      state.selectDoctor = payload;
    },
    resetDoctor: (state, { payload }) => {
      state.selectDoctor = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDoctorsList.pending, (state, { payload }) => {
        state.getStatus = "pending";
      })
      .addCase(getDoctorsList.fulfilled, (state, { payload }) => {
        state.getStatus = "success";
        AllDoctors.caseReducers.handleDoctor(state, payload.data);
      })
      .addCase(getInhouseDoctorsList.pending, (state) => {
        state.inhouseStatus = true;
      })
      .addCase(getInhouseDoctorsList.fulfilled, (state, { payload }) => {
        state.inhouseStatus = false;
        state.inDoctors = payload.data;
      })
      .addCase(getDoctorDetail.pending, (state, { payload }) => {
        state.getDetailStatus = "pending";
      })
      .addCase(getDoctorDetail.fulfilled, (state, { payload }) => {
        state.getDetailStatus = "success";
        state.doctorsDetail = payload.data;
      })
      .addCase(addDoctor.pending, (state, { payload }) => {
        state.addStatus = "pending";
      })
      .addCase(addDoctor.fulfilled, (state, { payload }) => {
        state.addStatus = "success";

        if (payload.data.type === "INHOUSE") {
          state.inDoctors.doctors = [payload.data, ...state.inDoctors.doctors];
        } else {
          state.doctors = [payload.data, ...state.doctors];
        }
      })
      .addCase(updateDoctor.pending, (state, { payload }) => {
        state.updateStatus = "pending";
      })
      .addCase(updateDoctor.fulfilled, (state, { payload }) => {
        if (payload.data) {
          if (payload.data.type === "INHOUSE") {
            const existDoctor = state.inDoctors.doctors.findIndex(
              (d) => d._id === payload.data._id
            );
            state.inDoctors.doctors[existDoctor] = payload.data;
          } else {
            const existDoctor = state.doctors.findIndex(
              (d) => d._id === payload.data._id
            );
            state.doctors[existDoctor] = payload.data;
          }
        }
        state.updateStatus = "success";
      })
      .addCase(deleteDoctor.pending, (state, { payload }) => {
        state.deleteStatus = "pending";
      })
      .addCase(deleteDoctor.fulfilled, (state, { payload }) => {
        state.deleteStatus = "success";

        if (payload.data.type === "INHOUSE") {
          state.inDoctors.doctors = state.inDoctors.doctors.filter(
            (d) => d._id !== payload.data._id
          );
        } else {
          state.doctors = state.doctors.filter(
            (d) => d._id !== payload.data._id
          );
        }
      })
      .addCase(addDoctorSession.pending, (state, { payload }) => {
        state.addSessionStatus = "pending";
      })
      .addCase(addDoctorSession.fulfilled, (state, { payload }) => {
        state.addSessionStatus = "success";
        console.log(payload);
      })
      .addCase(updateDoctorSession.fulfilled, (state, { payload }) => {
        console.log(payload);
      });
  },
});

export const DoctorSlice = AllDoctors.reducer;
export const { changePaginationData, selectDoctor, resetDoctor } =
  AllDoctors.actions;
