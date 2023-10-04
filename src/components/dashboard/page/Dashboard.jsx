import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { successAlert } from "../../../app/components/Alert/ToastAlertBox";
import { deleteMessage } from "../../authentication/features/LoginSlice";
import React, { useEffect, useMemo, useState } from "react";
import SnackbarAlert from "../../../app/components/Alert/SnackBarAlert";
import {
    homeProcessList,
    homeProcessListAppointment,
    homeProcessListDoctor,
} from "../features/DashboardApi";
import { DoctorListCard } from "../components/DoctorListCard";
import AppointmentListCard from "../components/AppointmentListCard";
import { Stack } from "@mui/material";
import DoctorListTableItem from "../components/DoctorListTableItem";
import AppointmentListTableItem from "../components/AppointmentListTableItem";
import WebSocketListener from "../websocket/websocketListener";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            // position: "right",
            text: "Earning From Appointment ($0)",
        },
    },
    scales: {
        x: {
            grid: {
                display: false, // Remove the x-axis grid lines
            },
            maxBarThickness: 50, // Adjust the maximum width of the bars (columns)
            ticks: {
                maxRotation: 0, // Disable label rotation
                autoSkipPadding: 10, // Add padding to prevent labels from overlapping
                maxTextLength: 3, // Set the maximum length of the labels
            },
        },
        y: {
            grid: {
                display: false, // Remove the y-axis grid lines
            },
        },
    },
    indexAxis: "x", // Horizontal bar chart
    elements: {
        bar: {
            borderWidth: 0, // Remove the borders around the bars
        },
    },
};

const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug0",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const data = {
    labels,
    datasets: [
        {
            label: "Money",
            data: labels.map(() =>
                faker.datatype.number({ min: 0.0, max: 2.0 })
            ),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};

function Dashboard() {
    const { message } = useSelector((state) => state.loginInfo);
    const { doctors } = useSelector((state) => state.dashboardSlice);
    const { appointments } = useSelector(
        (state) => state.dashboardAppointmentSlice
    );
    const { user } = useSelector((state) => state.loginInfo);
    const dispatch = useDispatch();
    //for alert
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [smessage, setMessage] = useState("");
    const [type, setType] = useState("");
    //end
    const showAlert = (msg, typeAlert) => {
        setOpenSnackBar(true);
        setMessage(msg);
        setType(typeAlert);
    };

    //!Websocket listener
    // useEffect(() => {
    //     if (doctors || appointments) {
    //         const socket = WebSocketListener(
    //             dispatch,
    //             user._id,
    //             doctors,
    //             appointments
    //         );

    //         return () => {
    //             socket.off('ForAPOnlineStatus');
    //             socket.disconnect();
    //         };
    //     }
    // }, [dispatch, user._id]);

    useEffect(() => {
        if (message) {
            console.log(message);
            showAlert(message, "success");
            dispatch(deleteMessage());
        }
    }, []);

    return (
        <>
            <SnackbarAlert
                openSnackBar={openSnackBar}
                setOpenSnackBar={setOpenSnackBar}
                message={smessage}
                type={type}
            />
            <Stack direction="row" alignItems={"center"} spacing={4}>
                <DoctorListCard doctors={doctors} />
                <AppointmentListCard appointments={appointments} />
            </Stack>
            <Stack
                alignItems="start"
                marginTop={3}
                direction={"row"}
                spacing={4}
            >
                <DoctorListTableItem />
                <AppointmentListTableItem />
            </Stack>
        </>
    );
}

export default Dashboard;
