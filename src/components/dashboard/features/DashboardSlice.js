import {createSlice, current} from '@reduxjs/toolkit';
import {homeProcessListDoctor} from './DashboardApi';

const initialState = {
    doctors: [],
    dstatus: false,
};
const DashboardSlice = createSlice({
    name: 'homeProcess',
    initialState,
    reducers: {
        handleDashboard: (state, {payload}) => {
            state.doctors = payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(
                homeProcessListDoctor.pending,
                (state, {payload}) => {
                    state.dstatus = true;
                }
            )
            .addCase(
                homeProcessListDoctor.fulfilled,
                (state, {payload}) => {
                    state.dstatus = false;

                    if (payload.data) {
                        state.doctors = payload.data.doctors;
                    }
                }
            );
    },
});

export const {handleDashboard} = DashboardSlice.actions;
export const dashboardSlice = DashboardSlice.reducer;
