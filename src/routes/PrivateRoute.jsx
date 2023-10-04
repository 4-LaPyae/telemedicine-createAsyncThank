import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../app/components/layout/Layout";
import Appointment from "../components/appointment/page/Appointment";
import Admin from "../components/admins/page/Admin";
import Profile from "../components/profile/page/Profile";
import Patients from "../components/patients/page/Patients";
import PatientDetail from "../components/patients/components/PatientDetail";
import Dashboard from "../components/dashboard/page/Dashboard";
import Doctors from "../components/doctors/page/Doctors";
import Specialize from "../components/specialize/page/Specialize";
import DoctorsDetail from "../components/doctors/doctordetail/page/DoctorsDetail";

const PrivateRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctors">
          <Route path=":name" element={<DoctorsDetail />} />
          <Route index element={<Doctors />} />
        </Route>
        <Route path="/patients">
          <Route path=":id" element={<PatientDetail />} />
          <Route index element={<Patients />} />
        </Route>
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/specialize" element={<Specialize />} />
        <Route path="/sys-admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default PrivateRoute;
