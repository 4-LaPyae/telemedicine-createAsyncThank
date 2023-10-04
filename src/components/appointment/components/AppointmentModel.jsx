import * as React from "react";
import Modal from "@mui/material/Modal";
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
    TextareaAutosize,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SimpleInput from "../../../app/components/SimpleInput";
import FormControl from "@mui/material/FormControl";
import MkAutoComplete from "../../../app/assets/theme/MkAutoComplete";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPatient } from "../../patients/features/PatientApi";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    alignItems: "center",
    padding: "10px 25px 20px 25px",
};

export default function AppointmentModel({
    model,
    setModel,
    newPatientHandler,
}) {
    const theme = useTheme();
    const handleClose = () => setModel(false);
    const [gender, setGender] = useState("MALE");
    const [password, setPassword] = useState("guest");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [profile, setProfile] = useState(null);
    const [alert, setAlert] = useState(false);
    const [bloodType, setBloodType] = useState("");
    const [allergies, setAllergies] = useState(null);
    const [successAlert, setSuccessAlert] = useState(false);
    const BloodTypeOptionDatas = ["O", "A", "B", "AB", "Unknown"];
    const dispatch = useDispatch();
    const { addStatus } = useSelector((state) => state.patientSlice);
    const firstNameHandlar = (e) => setFirstName(e.target.value);
    const lastNameHandlar = (e) => setLastName(e.target.value);
    const phoneHandlar = (e) => setPhone(e.target.value);
    const emailHandlar = (e) => setEmail(e.target.value);
    const dobHandlar = (e) => setDob(e.target.value);
    const genderHandlar = (e) => setGender(e.target.value);
    const bloodTypeHandler = (e, v) => setBloodType(v);
    const allergiesHandler = (e) => setAllergies(e.target.value);
    const removeInputValue = () => {
        setFirstName("");
        setLastName("");
        setPhone("");
        setEmail("");
        setDob("");
        setGender("MALE");
        setBloodType("");
        setAllergies("");
    };
    const valid =
        Boolean(firstName) &&
        Boolean(lastName) &&
        Boolean(phone) &&
        Boolean(email) &&
        Boolean(dob) &&
        Boolean(bloodType) &&
        Boolean(allergies);
    const createSubmitHandlar = (e) => {
        e.preventDefault();
        let patient = {
            firstName,
            lastName,
            phone,
            profile,
            password,
            email,
            dob,
            gender,
            bloodType,
            allergies,
        };
        if (!valid) {
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 1500);
        } else {
            console.log(patient);
            dispatch(addPatient(patient))
                .unwrap()
                .then((res) => {
                    if (!res.error) {
                        removeInputValue();
                        newPatientHandler(res.data);
                        setSuccessAlert(true);
                        setTimeout(() => {
                            setModel(false);
                            setSuccessAlert(false);
                        }, 1500);
                    }
                });
        }
    };
    const handleModelClose = () => {
        removeInputValue();
        setModel(false);
    };
    return (
        <div>
            <Modal
                open={model}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        direction={"row"}
                        sx={{ padding: "10px 0px" }}
                    >
                        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                            Add Patient
                        </Typography>
                        <IconButton onClick={handleModelClose}>
                            {theme.direction === "rtl" ? (
                                <CloseIcon />
                            ) : (
                                <CloseIcon />
                            )}
                        </IconButton>{" "}
                    </Stack>
                    <Divider sx={{ margin: "5px 0px 10px 0px" }} />
                    <Stack>
                        <form onSubmit={createSubmitHandlar}>
                            <Stack
                                spacing={3}
                                justifyContent={"center"}
                                alignItems={"center"}
                                sx={{ mt: 1 }}
                            >
                                <Stack width={"100%"} spacing={2}>
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
                                                                gender ===
                                                                "MALE"
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
                                                                gender ===
                                                                "FEMALE"
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
                                    <Stack
                                        justifyContent={"space-between"}
                                        direction={"row"}
                                        alignItems={"center"}
                                        height={"60px"}
                                    >
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            size="large"
                                            color="primary"
                                            disabled={
                                                addStatus === "loading"
                                                    ? true
                                                    : false
                                            }
                                        >
                                            Add
                                        </Button>
                                        {alert && (
                                            <Alert
                                                variant="outlined"
                                                severity="error"
                                            >
                                                Something field is required!
                                            </Alert>
                                        )}
                                        {successAlert && (
                                            <Alert
                                                variant="outlined"
                                                severity="success"
                                            >
                                                Patient created successful
                                            </Alert>
                                        )}
                                    </Stack>
                                </Stack>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}
