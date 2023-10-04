import React, { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import {
    Box,
    Divider,
    Button,
    Drawer,
    IconButton,
    InputLabel,
    Stack,
    Typography,
    TextField,
    Autocomplete,
} from "@mui/material";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SimpleInput from "../../../app/components/SimpleInput";
import { useDispatch, useSelector } from "react-redux";
import MkAutoComplete from "../../../app/assets/theme/MkAutoComplete";
import { getPatientList } from "../../patients/features/PatientApi";
import {
    detailSpecialist,
    getSpecialistDropdown,
} from "../../specialize/features/SpecialistApi";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AppointmentModel from "./AppointmentModel";
import { ToastContainer } from "react-toastify";

const drawerWidth = 500;
const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    margin: "10px 10px 0px 10px",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
}));

const AppointmentDrawer = ({ open, setOpen }) => {
    const { patients } = useSelector((state) => state.patientSlice);
    const [patientOption, setPatientOption] = useState(null);
    const [inputVal, setInputVal] = useState("");
    const [actualPhone, setActualPhone] = useState("");
    const [option, setOption] = useState("");
    const [model, setModel] = useState(false);
    const [selectPatient, setSelectPatient] = useState([]);
    const [specialListOption, setSpecialListOption] = useState(null);
    const [specialListOptionDoctors, setSpecialListOptionDoctors] =
        useState(null);
    const [doctors, setDoctors] = useState(null);
    const [doctorId, setDoctorId] = useState(null);
    const { specialistDropdown } = useSelector(
        (state) => state.SpecialistSlice
    );
    const dispatch = useDispatch();
    const theme = useTheme();
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const patientAddHandler = (e) => {
        e.preventDefault();
        setModel(true);
        console.log("Patient Add Click");
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        const timeoutInput = setTimeout(() => {
            setActualPhone(inputVal);
        }, 400);
        return () => clearInterval(timeoutInput);
    }, [inputVal]);

    useEffect(() => {
        console.log("In actualPhone");
        dispatch(
            getPatientList({
                page: 1,
                limit: 10,
                filterName: actualPhone,
            })
        )
            .unwrap()
            .then((result) => {
                if (!result.error) {
                    setPatientOption(result.data.patients);
                }
            });
    }, [actualPhone]);

    useEffect(() => {
        if (specialListOption) {
            dispatch(detailSpecialist({ id: specialListOption._id }))
                .unwrap()
                .then((res) => {
                    if (!res.error) {
                        //console.log({ res });
                        setSpecialListOptionDoctors(res.data);
                    }
                });
        }

        if (specialListOptionDoctors) {
            const result = specialListOptionDoctors.filter(
                (s) => s.type === "COOPERATE"
            );
            setDoctors(result);
        }
    }, [specialListOption]);
    const newPatientHandler = (data) => {
        console.log(data);
    };
    return (
        <>
            <Button
                variant="contained"
                onClick={handleDrawerOpen}
                endIcon={<AddIcon />}
            >
                Add
            </Button>
            <ToastContainer />
            <Drawer
                sx={{
                    width: drawerWidth,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                    },
                }}
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box role="presentation">
                    <DrawerHeader>
                        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                            Add Appointment
                        </Typography>

                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === "rtl" ? (
                                <CloseIcon />
                            ) : (
                                <CloseIcon />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <form>
                        <Stack
                            spacing={3}
                            justifyContent={"center"}
                            alignItems={"center"}
                            sx={{ mt: 2 }}
                        >
                            <Stack width={"95%"} spacing={2}>
                                <Box>
                                    <Stack
                                        direction="row"
                                        justifyContent={"space-between"}
                                        alignItems={"center"}
                                    >
                                        <InputLabel sx={{ mb: 1 }}>
                                            Patient Name *
                                        </InputLabel>
                                        {patients.length > 0 ? (
                                            ""
                                        ) : (
                                            <Stack
                                                direction={"row"}
                                                alignItems={"center"}
                                            >
                                                <Typography>Create</Typography>
                                                <IconButton
                                                    onClick={patientAddHandler}
                                                    color="success"
                                                    aria-label="create"
                                                >
                                                    <AddCircleOutlineIcon />
                                                </IconButton>
                                            </Stack>
                                        )}
                                    </Stack>
                                    <Autocomplete
                                        sx={{
                                            border: "1px solid #d2d6da",
                                            borderRadius: "32px",
                                            width: "100%",
                                        }}
                                        fullWidth
                                        options={patientOption}
                                        getOptionLabel={(option) =>
                                            option?.firstName +
                                            " " +
                                            option?.lastName +
                                            "  (" +
                                            option?.phone +
                                            ")"
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                sx={{
                                                    borderRadius: "50%",
                                                }}
                                                {...params}
                                                onChange={(e) =>
                                                    setInputVal(e.target.value)
                                                }
                                                placeholder="Search Patient"
                                            />
                                        )}
                                        onChange={(event, newValue) => {
                                            setSelectPatient(newValue);
                                        }}
                                    />
                                </Box>

                                <Box>
                                    <InputLabel sx={{ mb: 1 }}>
                                        Select Specialist *
                                    </InputLabel>
                                    <MkAutoComplete
                                        required
                                        label="Specialist Option"
                                        placeholder="Choose Specialist Field"
                                        name="Specialist"
                                        options={specialistDropdown}
                                        getOptionLabel={(option) => option.name}
                                        isOptionEqualToValue={(option, value) =>
                                            option._id === value._id
                                        }
                                        onChange={(event, newValue) => {
                                            setSpecialListOption(newValue);
                                        }}
                                        value={specialListOption}
                                        fullWidth
                                    />
                                </Box>

                                <Box>
                                    <InputLabel sx={{ mb: 1 }}>
                                        Select Doctor *
                                    </InputLabel>
                                    <MkAutoComplete
                                        required
                                        placeholder="Choose your Doctor"
                                        label="Doctor Option"
                                        name="Doctor"
                                        disabled={!doctors?.length > 0 && true}
                                        options={doctors}
                                        getOptionLabel={(option) =>
                                            "Dr " +
                                            option.firstName +
                                            option.lastName
                                        }
                                        onChange={(event, newValue) => {
                                            setDoctorId(newValue);
                                        }}
                                        fullWidth
                                    />
                                </Box>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
                <AppointmentModel
                    model={model}
                    setModel={setModel}
                    newPatientHandler={newPatientHandler}
                />
            </Drawer>
        </>
    );
};

export default AppointmentDrawer;
