import { createSlice } from "@reduxjs/toolkit";
import {
    addSpecialist,
    deleteSpecialist,
    getSpecialist,
    getSpecialistDropdown,
    updateSpecialist,
} from "./SpecialistApi";

const initialData = {
    getStatus: null,
    specialist: null,
    addStatus: null,
    deleteStatus: null,
    pagination: {},
    selectSpecialize: null,
    specialistDropdown: null,
    updateStatus: null,
    paginationData: {
        page: 1,
        limit: 10,
    },
};

export const AllSpecialist = createSlice({
    name: "allSpecialist",
    initialState: {
        ...initialData,
    },
    reducers: {
        changePaginationData: (state, { payload }) => {
            state.paginationData = payload;
        },
        handleSpecialist: (state, payload) => {
            // console.log(payload);
            const { specialists, ...rest } = payload;
            state.specialist = specialists;
            state.pagination = rest;
        },
        selectSpecialize: (state, { payload }) => {
            state.selectSpecialize = payload;
        },
        resetSpecialize: (state) => {
            state.selectSpecialize = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSpecialist.pending, (state, { payload }) => {
                state.getStatus = "pending";
            })
            .addCase(getSpecialist.fulfilled, (state, { payload }) => {
                state.getStatus = "success";
                AllSpecialist.caseReducers.handleSpecialist(
                    state,
                    payload.data
                );
            })
            .addCase(getSpecialistDropdown.fulfilled, (state, { payload }) => {
                // console.log(payload);
                state.specialistDropdown = payload.data;
            })
            .addCase(addSpecialist.pending, (state, { payload }) => {
                state.addStatus = "pending";
            })
            .addCase(addSpecialist.fulfilled, (state, { payload }) => {
                state.specialist = [
                    payload.data.specialist,
                    ...state.specialist,
                ];
                state.addStatus = "success";
            })
            .addCase(updateSpecialist.pending, (state, { payload }) => {
                state.updateStatus = "pending";
            })
            .addCase(updateSpecialist.fulfilled, (state, { payload }) => {
                state.updateStatus = "success";
                if (payload.data) {
                    const exitSpecialList = state.specialist.findIndex(
                        (s) => s._id === payload.data._id
                    );
                    state.specialist[exitSpecialList] = payload.data;
                }
            })
            .addCase(deleteSpecialist.pending, (state, { payload }) => {
                state.deleteStatus = "pending";
            })
            .addCase(deleteSpecialist.fulfilled, (state, { payload }) => {
                const { _id } = payload.data;
                state.specialist = state.specialist.filter(
                    (s) => s._id !== _id
                );
                state.deleteStatus = "success";
            });
    },
});

export const SpecialistSlice = AllSpecialist.reducer;
export const { changePaginationData, selectSpecialize, resetSpecialize } =
    AllSpecialist.actions;
