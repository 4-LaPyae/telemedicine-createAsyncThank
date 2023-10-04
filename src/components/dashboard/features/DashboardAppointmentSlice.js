import {createSlice} from '@reduxjs/toolkit';
import {homeProcessListAppointment} from './DashboardApi';
const initialState = {
    appointments: [],
    astatus: false,
};
const DashboardAppointmentSlice = createSlice({
    name: 'homeProcessAppointment',
    initialState,
    reducers: {
        handleWebsocket: (state, {payload}) => {
            state.appointments = payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(
                homeProcessListAppointment.pending,
                (state, {payload}) => {
                    state.astatus = true;
                }
            )
            .addCase(
                homeProcessListAppointment.fulfilled,
                (state, {payload}) => {
                    state.astatus = false;
                    if (payload.data) {
                        state.appointments =
                            payload.data.appointments;
                    }
                }
            );
    },
});
export const dashboardAppointmentSlice =
    DashboardAppointmentSlice.reducer;
export const {handleWebsocket} = DashboardAppointmentSlice.actions;
