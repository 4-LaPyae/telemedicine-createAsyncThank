import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import PatientAllergiesDialog from "./PatientAllergiesDialog";
const PatientDetail = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const { state } = location;
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
                src={state.data?.profile}
                alt="doctor"
                variant="rounded"
            >
                {state.data?.firstName?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography align="center" variant="h3">
                {state.data?.firstName} {state.data?.lastName}
            </Typography>
            <Typography align="center">Age : {state.data?.age}</Typography>
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
                            <Stack direction={"row"} spacing={1.5}>
                                <Typography variant="h4">Email : </Typography>
                                <Typography>
                                    {state.data?.email || "N/A"}
                                </Typography>
                            </Stack>
                            <Stack direction={"row"} spacing={1.5}>
                                <Typography variant="h4">Phone : </Typography>
                                <Typography>{state.data?.phone}</Typography>
                            </Stack>
                            <Stack direction={"row"} spacing={1.5}>
                                <Typography variant="h4">Gender :</Typography>
                                <Typography>{state.data?.gender}</Typography>
                            </Stack>
                            <Stack direction={"row"} spacing={1.5}>
                                <Typography variant="h4">
                                    Date Of Bith :
                                </Typography>
                                <Typography>{state.data?.dob}</Typography>
                            </Stack>
                            <Stack direction={"row"} spacing={1.5}>
                                <Typography variant="h4">
                                    BloodType :
                                </Typography>
                                <Typography>{state.data?.bloodType}</Typography>
                            </Stack>
                            <Stack
                                direction={"row"}
                                spacing={1.5}
                                alignItems={"center"}
                            >
                                <Typography variant="h4">
                                    Allergies :
                                </Typography>
                                <PatientAllergiesDialog
                                    open={open}
                                    setOpen={setOpen}
                                    allergies={state.data?.allergies}
                                />
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs={9}>
                <Box sx={{ padding: "25px 25px 25px 25px" }} component={Paper}>
                    Tab View...
                </Box>
            </Grid>
        </Grid>
    );
};

export default PatientDetail;
