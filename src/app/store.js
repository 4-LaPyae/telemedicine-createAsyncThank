import { configureStore } from "@reduxjs/toolkit";
import { loginInfo } from "../components/authentication/features/LoginSlice";
import { DoctorSlice } from "../components/doctors/features/DoctorSlice";
import { SpecialistSlice } from "../components/specialize/features/SpecialistSlice";
import { SystemAdminSlice } from "../components/admins/features/SystemAdminSlice";
import { AppointmentSlice } from "../components/appointment/features/AppointmentSlice";
import { patientSlice } from "../components/patients/features/PatientSlice";
import { dashboardSlice } from "../components/dashboard/features/DashboardSlice";
import { dashboardAppointmentSlice } from "../components/dashboard/features/DashboardAppointmentSlice";
const store = configureStore({
    reducer: {
        loginInfo,
        DoctorSlice,
        SystemAdminSlice,
        SpecialistSlice,
        patientSlice,
        AppointmentSlice,
        dashboardSlice,
        dashboardAppointmentSlice,
    },
});

export default store;
