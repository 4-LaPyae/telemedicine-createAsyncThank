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
import { addInAppointment } from "../features/AppointmentApi";
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

const InAppointmentDrawer = ({ open, setOpen }) => {
    const [patientOption, setPatientOption] = useState(null);
    const [inputVal, setInputVal] = useState("");
    const [actualPhone, setActualPhone] = useState("");
    const [currentMedications, setCurrentMediactions] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientReason, SetPatientReason] = useState(null);
    const { patients } = useSelector((state) => state.patientSlice);

    const dispatch = useDispatch();
    const theme = useTheme();
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const patientAddHandler = (e) => {
        e.preventDefault();
        console.log("Patient Add Click");
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

    const data = {
        patientId: selectedPatient?._id,
        currentMedications,
        patientReason,
    };

    const addHandler = (e) => {
        e.preventDefault();

        dispatch(addInAppointment(data))
            .unwrap()
            .then((result) => {
                if (!result.error) {
                    handleDrawerClose();
                }
            });
    };

    return (
        <div>
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
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                    },
                }}
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
            >
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
                                isOptionEqualToValue={(option, value) =>
                                    option._id === value._id
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
                                    setSelectedPatient(newValue);
                                }}
                            />
                        </Box>
                        <Box>
                            <InputLabel sx={{ mb: 1 }}>
                                Current Medications
                            </InputLabel>
                            <SimpleInput
                                placeholder="Write your current medications"
                                fullwidth
                                value={currentMedications}
                                multiline={true}
                                rows={3}
                                onChange={(e) =>
                                    setCurrentMediactions(e.target.value)
                                }
                            />
                        </Box>
                        <Box>
                            <InputLabel sx={{ mb: 1 }}>Reason</InputLabel>
                            <SimpleInput
                                placeholder="Write your current medications"
                                fullwidth
                                value={patientReason}
                                multiline={true}
                                rows={3}
                                onChange={(e) =>
                                    SetPatientReason(e.target.value)
                                }
                            />
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={addHandler}
                            >
                                Add
                            </Button>
                        </Box>
                    </Stack>
                </Stack>
            </Drawer>
        </div>
    );
};

export default InAppointmentDrawer;
