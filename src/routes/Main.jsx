import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/authentication/page/Login";
import PrivateRoute from "../routes/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    storeToken,
    storeuser,
} from "../components/authentication/features/LoginSlice";
const Main = () => {
    const { token } = useSelector((state) => state.loginInfo);
    const dispatch = useDispatch();
    // let token = "12345";
    // console.log(token);
    useEffect(() => {
        if (localStorage.getItem("auth")) {
            const local = JSON.parse(localStorage.getItem("auth"));
            // console.log(local);
            if (local) {
                dispatch(storeToken(local?.token));
                dispatch(storeuser(local));
            }
        }
    }, []);
    return (
        <Routes>
            {token ? (
                <>
                    <Route path='/*' element={<PrivateRoute />} />
                    <Route index element={<Navigate to='/dashboard' />} />
                </>
            ) : (
                <>
                    <Route path='/login' element={<Login />} />
                    <Route path='*' element={<Navigate to='/login' />} />
                </>
            )}
        </Routes>
    );
};

export default Main;
