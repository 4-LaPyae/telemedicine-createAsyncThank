import { createSlice } from "@reduxjs/toolkit";
import {
    getAppointmentList,
    getInAppointmentList,
    addInAppointment,
} from "./AppointmentApi";

const initialState = {
    appointmentList: null,
    loading: false,
    inAppointmentList: null,
    inLoading: false,
    pagination: {},
    paginationData: {
        page: 1,
        limit: 10,
    },
    inpagination: {},
    inpaginationData: {
        page: 1,
        limit: 10,
    },
};

export const AllAppointments = createSlice({
    name: "all appointments",
    initialState,
    reducers: {
        appointmentHandler: (state, payload) => {
            const { appointments, ...rest } = payload;
            state.appointmentList = appointments;
            state.pagination = rest;
        },
        inappointmentHandler: (state, payload) => {
            const { appointments, ...rest } = payload;
            state.inAppointmentList = appointments;
            state.inpagination = rest;
        },
        changePaginationData: (state, { payload }) => {
            state.paginationData = payload;
        },
        changeInPaginationData: (state, { payload }) => {
            state.inpaginationData = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAppointmentList.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAppointmentList.fulfilled, (state, { payload }) => {
            state.loading = false;
            AllAppointments.caseReducers.appointmentHandler(
                state,
                payload.data
            );
        });
        builder.addCase(getInAppointmentList.pending, (state, { payload }) => {
            state.inLoading = true;
        });
        builder.addCase(
            getInAppointmentList.fulfilled,
            (state, { payload }) => {
                state.inLoading = false;
                AllAppointments.caseReducers.inappointmentHandler(
                    state,
                    payload.data
                );
            }
        );
        builder.addCase(addInAppointment.fulfilled, (state, { payload }) => {
            console.log({ payload });
            const inappointments = payload.data;
            console.log({ inappointments });
            state.inAppointmentList = [
                inappointments,
                ...state.inAppointmentList,
            ];
        });
    },
});

export const {
    appointmentHandler,
    inappointmentHandler,
    changePaginationData,
    changeInPaginationData,
} = AllAppointments.actions;
export const AppointmentSlice = AllAppointments.reducer;
