import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
    Box,
    Button,
    Divider,
    Drawer,
    Input,
    Avatar,
    IconButton,
    InputLabel,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SimpleInput from "../../../app/components/SimpleInput";
import AddIcon from "@mui/icons-material/Add";

import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { addPatient, updatePatientApi } from "../features/PatientApi";
import { removeUpdatePatientHandlar } from "../features/PatientSlice";
import MkAutoComplete from "../../../app/assets/theme/MkAutoComplete";
import { ToastContainer } from "react-toastify";
import {
    errorAlert,
    successAlert,
} from "../../../app/components/Alert/ToastAlertBox";
import SnackbarAlert, {
    errorSnackBarAlert,
} from "../../../app/components/Alert/SnackBarAlert";

const drawerWidth = 500;
const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
}));
const PatientDrawer = ({ openDrawer, setOpenDrawer }) => {
    const theme = useTheme();

    const [gender, setGender] = useState("MALE");
    const [password, setPassword] = useState("kttguest");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [id, setId] = useState(0);
    const [imageData, setImageData] = useState("#");
    const [profile, setProfile] = useState(null);
    const [bloodType, setBloodType] = useState("");
    const [allergies, setAllergies] = useState(null);
    //for alert
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    //end
    const BloodTypeOptionDatas = ["O", "A", "B", "AB", "Unknown"];
    const { updatePatient, updatePatientStatus, addStatus } = useSelector(
        (state) => state.patientSlice
    );
    const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };
    const firstNameHandlar = (e) => setFirstName(e.target.value);
    const lastNameHandlar = (e) => setLastName(e.target.value);
    const phoneHandlar = (e) => setPhone(e.target.value);
    const emailHandlar = (e) => setEmail(e.target.value);
    const dobHandlar = (e) => setDob(e.target.value);
    const genderHandlar = (e) => setGender(e.target.value);
    const bloodTypeHandler = (e, v) => setBloodType(v);
    const allergiesHandler = (e) => setAllergies(e.target.value);
    const showAlert = (msg, typeAlert) => {
        setOpenSnackBar(true);
        setMessage(msg);
        setType(typeAlert);
    };
    const phoneErrorHandler = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
            showAlert("Please Type English number Only.", "error");
        }
    };
    const removeInputValue = () => {
        setFirstName("");
        setLastName("");
        setPhone("");
        setEmail("");
        setDob("");
        setGender("MALE");
        setImageData("");
        setBloodType("");
        setAllergies("");
    };
    const handleDrawerClose = () => {
        dispatch(removeUpdatePatientHandlar());
        removeInputValue();
        setOpenDrawer(false);
    };
    useEffect(() => {
        if (updatePatient) {
            setId(updatePatient?._id);
            setFirstName(updatePatient?.firstName);
            setLastName(updatePatient?.lastName);
            setPhone(updatePatient?.phone);
            setEmail(updatePatient?.email);
            setDob(updatePatient?.dob);
            setGender(updatePatient?.gender);
            setImageData(updatePatient?.profile);
            setProfile(updatePatient?.profile);
            setBloodType(updatePatient?.bloodType);
            setAllergies(updatePatient?.allergies);
        }
    }, [updatePatient]);
    const valid =
        Boolean(firstName) &&
        Boolean(lastName) &&
        Boolean(phone) &&
        Boolean(email) &&
        Boolean(dob) &&
        Boolean(bloodType);
    const patient = {
        firstName,
        lastName,
        phone,
        email,
        gender,
        dob,
        profile,
        password,
        bloodType,
        allergies,
    };
    const createSubmitHandlar = (e) => {
        e.preventDefault();
        if (!valid) {
            showAlert("Something field is required!", "error");
        } else {
            //console.log(patient);
            dispatch(addPatient(patient))
                .unwrap()
                .then((res) => {
                    if (!res.error) {
                        removeInputValue();
                        setOpenDrawer(false);
                        showAlert(res.message, "success");
                    } else {
                        showAlert(res.message, "error");
                    }
                });
        }
    };

    const imageInputChange = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setProfile(reader.result);
        };
        setImageData(URL.createObjectURL(e.target.files[0]));
    };
    const updateSubmitHandlar = (e) => {
        e.preventDefault();
        if (!valid) {
            showAlert("Something field is required!", "error");
        } else {
            console.log(patient);
            dispatch(updatePatientApi({ id, patient }))
                .unwrap()
                .then((res) => {
                    if (!res.error) {
                        removeInputValue();
                        dispatch(removeUpdatePatientHandlar());
                        setOpenDrawer(false);
                        showAlert(res.message, "success");
                    } else {
                        showAlert(res.message, "error");
                    }
                });
        }
    };
    return (
        <>
            <SnackbarAlert
                openSnackBar={openSnackBar}
                setOpenSnackBar={setOpenSnackBar}
                message={message}
                type={type}
            />
            <Button
                variant="contained"
                onClick={handleDrawerOpen}
                endIcon={<AddIcon />}
            >
                Add
            </Button>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                    },
                }}
                anchor="right"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <Box role="presentation">
                    <DrawerHeader>
                        <Typography variant="h3">
                            {" "}
                            {!updatePatient
                                ? "Create Patient"
                                : "Update Patient"}{" "}
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
                    <form
                        onSubmit={
                            updatePatient
                                ? updateSubmitHandlar
                                : createSubmitHandlar
                        }
                    >
                        <Stack
                            spacing={3}
                            justifyContent={"center"}
                            alignItems={"center"}
                            sx={{ mt: 1 }}
                        >
                            <Stack width={"95%"} spacing={2}>
                                <Stack>
                                    <Box sx={{ margin: "0 auto" }}>
                                        <label htmlFor="contained-button-file">
                                            <Input
                                                accept="image/*"
                                                // inputProps={{ accept: "image/*" }}
                                                id="contained-button-file"
                                                type="file"
                                                name="profile"
                                                sx={{
                                                    display: "none",
                                                }}
                                                onChange={imageInputChange}
                                            />

                                            <Avatar
                                                sx={{
                                                    width: 100,
                                                    height: 100,
                                                    cursor: "pointer",
                                                }}
                                                variant="rounded"
                                                src={imageData}
                                            />
                                        </label>
                                    </Box>
                                </Stack>
                                <Stack direction={"row"} spacing={2}>
                                    <Box width={"100%"}>
                                        <InputLabel sx={{ mb: 1 }}>
                                            First Name
                                        </InputLabel>
                                        <SimpleInput
                                            //required
                                            fullwidth
                                            value={firstName}
                                            placeholder="First Name"
                                            onChange={firstNameHandlar}
                                        />
                                    </Box>
                                    <Box width={"100%"}>
                                        <InputLabel sx={{ mb: 1 }}>
                                            Last Name
                                        </InputLabel>
                                        <SimpleInput
                                            //required
                                            fullwidth
                                            value={lastName}
                                            placeholder="Last Name"
                                            onChange={lastNameHandlar}
                                        />
                                    </Box>
                                </Stack>
                                <Stack direction={"row"} spacing={2}>
                                    <Box width={"100%"}>
                                        <InputLabel sx={{ mb: 1 }}>
                                            Email
                                        </InputLabel>
                                        <SimpleInput
                                            //required
                                            fullwidth
                                            value={email}
                                            placeholder="Email"
                                            onChange={emailHandlar}
                                        />
                                    </Box>
                                    <Box width={"100%"}>
                                        <InputLabel sx={{ mb: 1 }}>
                                            Phone
                                        </InputLabel>
                                        <SimpleInput
                                            //required
                                            fullwidth
                                            value={phone}
                                            placeholder="Phone"
                                            onChange={phoneHandlar}
                                            onKeyPress={phoneErrorHandler}
                                        />
                                    </Box>
                                </Stack>
                                <Stack>
                                    <Box>
                                        <InputLabel sx={{ mb: 1 }}>
                                            Date of Birth
                                        </InputLabel>
                                        <SimpleInput
                                            fullwidth
                                            type="date"
                                            value={dob}
                                            placeholder="Choose Date of Birth"
                                            onChange={dobHandlar}
                                        />
                                    </Box>
                                </Stack>
                                <Stack>
                                    <Box>
                                        <InputLabel sx={{ mb: 1 }}>
                                            BloodType
                                        </InputLabel>
                                        <MkAutoComplete
                                            label="Option"
                                            name="option"
                                            placeholder="Choose BloodType"
                                            fullWidth
                                            options={BloodTypeOptionDatas}
                                            getOptionLabel={(bloodType) =>
                                                bloodType
                                            }
                                            isOptionEqualToValue={(
                                                bloodType,
                                                value
                                            ) => bloodType === value}
                                            onChange={bloodTypeHandler}
                                            value={bloodType}
                                        />
                                    </Box>
                                </Stack>
                                <Stack>
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">
                                            Gender
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            value={gender}
                                            onChange={genderHandlar}
                                        >
                                            <FormControlLabel
                                                value="MALE"
                                                control={
                                                    <Radio
                                                        checked={
                                                            gender === "MALE"
                                                        }
                                                    />
                                                }
                                                label="Male"
                                            />
                                            <FormControlLabel
                                                value="FEMALE"
                                                control={
                                                    <Radio
                                                        checked={
                                                            gender === "FEMALE"
                                                        }
                                                    />
                                                }
                                                label="Female"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Stack>
                                <Stack>
                                    <InputLabel sx={{ mb: 1 }}>
                                        Allergies
                                    </InputLabel>
                                    <SimpleInput
                                        placeholder="Write your Allergies"
                                        fullwidth
                                        value={allergies}
                                        multiline={true}
                                        rows={2}
                                        onChange={allergiesHandler}
                                    />
                                </Stack>
                                <Stack>
                                    <Box>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            type="submit"
                                            color="primary"
                                            disabled={
                                                updatePatientStatus ===
                                                    "loading" ||
                                                addStatus === "loading"
                                                    ? true
                                                    : false
                                            }
                                        >
                                            {!updatePatient
                                                ? "Create"
                                                : "Update"}
                                        </Button>
                                    </Box>
                                </Stack>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Drawer>
        </>
    );
};

export default PatientDrawer;
