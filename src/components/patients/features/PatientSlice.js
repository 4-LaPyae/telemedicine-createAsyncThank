import { createSlice } from "@reduxjs/toolkit";
import {
    addPatient,
    deletePatient,
    getPatientList,
    updatePatientApi,
} from "./PatientApi";
const initialState = {
    patients: [],
    status: "idle",
    updatePatient: null,
    addStatus: null,
    updatePatientStatus: null,
    createModelPatient: null,
    pagination: {},
    paginationData: {
        page: 1,
        limit: 10,
    },
};
const PatientSlice = createSlice({
    name: "allPatients",
    initialState: { ...initialState },
    reducers: {
        patinetHandalar: (state, payload) => {
            const { patients, ...rest } = payload;
            state.patients = patients;
            state.pagination = rest;
        },

        updatePatinetHandalar: (state, { payload }) => {
            //console.log(payload);
            state.updatePatient = payload;
        },
        removeUpdatePatientHandlar: (state, { payload }) => {
            state.updatePatient = null;
        },
        changePaginationData: (state, { payload }) => {
            state.paginationData = payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getPatientList.pending, (state, { payload }) => {
                state.status = "loading";
            })
            .addCase(getPatientList.fulfilled, (state, { payload }) => {
                state.status = "success";
                PatientSlice.caseReducers.patinetHandalar(state, payload.data);
            })
            .addCase(updatePatientApi.pending, (state, { payload }) => {
                state.updatePatientStatus = "loading";
            })
            .addCase(updatePatientApi.fulfilled, (state, { payload }) => {
                state.updatePatientStatus = "success";
                console.log(payload);
                const exitPatient = state.patients.findIndex(
                    (p) => p._id === payload.data._id
                );
                state.patients[exitPatient] = payload.data;
            })
            .addCase(addPatient.pending, (state, { payload }) => {
                state.addStatus = "loading";
            })
            .addCase(addPatient.fulfilled, (state, { payload }) => {
                state.addStatus = "success";
                state.patients = [payload.data, ...state.patients];
            })
            .addCase(deletePatient.fulfilled, (state, { payload }) => {
                state.patients = state.patients.filter(
                    (p) => p._id !== payload.data._id
                );
            });
    },
});
export const {
    updatePatinetHandalar,
    removeUpdatePatientHandlar,
    changePaginationData,
} = PatientSlice.actions;
export const patientSlice = PatientSlice.reducer;
