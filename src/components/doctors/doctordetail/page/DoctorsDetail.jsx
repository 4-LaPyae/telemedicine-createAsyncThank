import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import TabView from "../components/TabView";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorDetail } from "../../features/DoctorApi";
import DoctorLinkTab from "../components/DoctorLinkTab";

const DoctorsDetail = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [tabIndex, setTabIndex] = useState(0);
    const { doctorData, type } = location?.state.doctorData;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const year = doctorData?.dob.substring(0, 4);
    useEffect(() => {
        dispatch(
            getDoctorDetail({ id: doctorData?._id, type, page: 1, limit: 10 })
        );
    }, []);

    const renderCompanyDetail = (
        <Stack spacing={2}>
            <Avatar
                sx={{
                    borderRadius: 2.5,
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    margin: "auto",
                }}
                src={doctorData?.profile}
                alt="doctor"
                // variant="rounded"
            >
                {doctorData?.firstName?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography align="center" variant="h3">
                {doctorData?.firstName} {doctorData?.lastName}
            </Typography>
            <Typography align="center">Age : {currentYear - year}</Typography>
            <Typography align="center">
                {doctorData?.specialist?.name}
            </Typography>
        </Stack>
    );
    return (
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <Stack spacing={2}>
                    <Box
                        sx={{ padding: "25px 25px 25px 25px" }}
                        component={Paper}
                    >
                        {renderCompanyDetail}
                    </Box>
                    <Box
                        sx={{ padding: "25px 25px 25px 25px" }}
                        component={Paper}
                    >
                        <Stack spacing={2}>
                            <Typography variant="h2">Information :</Typography>
                            <Stack direction={"row"} spacing={1}>
                                <Typography variant="h4">Gender : </Typography>
                                <Typography>{doctorData?.gender}</Typography>
                            </Stack>
                            <Stack direction={"row"} spacing={1}>
                                <Typography variant="h4">Email : </Typography>
                                <Typography>{doctorData?.email}</Typography>
                            </Stack>
                            <Stack direction={"row"} spacing={1}>
                                <Typography variant="h4">Phone : </Typography>
                                <Typography>{doctorData?.phone}</Typography>
                            </Stack>
                            <Stack direction={"row"} spacing={1}>
                                <Typography variant="h4">
                                    Experience :{" "}
                                </Typography>
                                <Typography>
                                    {doctorData?.experience} years
                                </Typography>
                            </Stack>
                            <Stack direction={"row"} spacing={1}>
                                <Typography variant="h4">Type : </Typography>
                                <Typography>{doctorData?.type}</Typography>
                            </Stack>
                            {/* <Stack direction={"row"} spacing={3}>
                                <Typography variant="h4">
                                    Specialist :{" "}
                                </Typography>
                                <Typography>
                                    {doctorData?.specialist.name}
                                </Typography>
                            </Stack> */}
                            <Stack direction={"row"}>
                                <Typography variant="h4">Info : </Typography>
                                <Typography>{doctorData?.info}</Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs={9}>
                <Box sx={{ padding: "5px", marginBottom: 2 }} component={Paper}>
                    <DoctorLinkTab
                        type={type}
                        tabIndex={tabIndex}
                        setTabIndex={setTabIndex}
                    />
                </Box>
                <Box sx={{ padding: "5px" }} component={Paper}>
                    <TabView
                        type={type}
                        tabIndex={tabIndex}
                        setTabIndex={setTabIndex}
                        id={doctorData?._id}
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export default DoctorsDetail;
