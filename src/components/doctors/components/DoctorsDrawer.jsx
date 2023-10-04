import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    Input,
    InputLabel,
    Radio,
    RadioGroup,
    Stack,
    Typography,
    selectClasses,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SimpleInput from "../../../app/components/SimpleInput";
import MkAutoComplete from "../../../app/components/MkAutoComplete";
import { useDispatch, useSelector } from "react-redux";
import { addDoctor, getDoctorsList, updateDoctor } from "../features/DoctorApi";
import { useEffect } from "react";
import { resetDoctor } from "../features/DoctorSlice";
import { ToastContainer } from "react-toastify";
import {
    errorAlert,
    successAlert,
} from "../../../app/components/Alert/ToastAlertBox";
import AddIcon from "@mui/icons-material/Add";

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
const DoctorsDrawer = ({ open, setOpen, type }) => {
    console.log(type);
    const theme = useTheme();
    const { selectDoctor, addStatus, updateStatus, pagination } = useSelector(
        (state) => state.DoctorSlice
    );
    const { specialistDropdown } = useSelector(
        (state) => state.SpecialistSlice
    );
    // console.log(pagination);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");
    const [exp, setExp] = useState("");
    const [option, setOption] = useState(null);
    const [specialist, setSpecialist] = useState(null);
    const [gender, setGender] = useState("MALE");
    const [imageData, setImageData] = useState("#");
    const [imageFile, setImageFile] = useState(null);
    const [info, setInfo] = useState("");
    const dispatch = useDispatch();
    // console.log(selectDoctor);
    const optionData = ["INHOUSE", "COOPERATE"];

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const imageInputChange = (e) => {
        let reader = new FileReader();
        // console.log(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImageFile(reader.result);
        };
        // setImageFile(e.target.files[0]);
        // const [file] = e.target.files;
        // console.log(file);
        // if (file) {
        // setImageChange(true);
        setImageData(URL.createObjectURL(e.target.files[0]));
        // }
    };

    useEffect(() => {
        if (selectDoctor) {
            setFirstName(selectDoctor.firstName);
            setLastName(selectDoctor.lastName);
            setEmail(selectDoctor.email);
            setPhone(selectDoctor.phone);
            setDate(selectDoctor.dob);
            setExp(selectDoctor.experience);
            setOption(selectDoctor.option);
            setSpecialist(selectDoctor.specialist);
            setImageData(selectDoctor.profile);
            setGender(selectDoctor.gender);
            setInfo(selectDoctor.info);
        }
    }, [selectDoctor]);
    const handleDrawerClose = () => {
        setOpen(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setDate("");
        setExp("");
        setOption(null);
        setGender("MALE");
        setSpecialist(null);
        setImageFile(null);
        setImageData("#");
        setInfo("");
        dispatch(resetDoctor());
    };
    const addDoctorHandler = () => {
        // console.log(specialist);
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: "kttguest",
            dob: date,
            experience: Number(exp),
            gender: gender,
            type,
            profile: imageFile ?? selectDoctor?.profile,
            info: info,
            specialist: {
                _id: specialist?._id,
                name: specialist?.name,
                image: specialist?.image,
                myName: specialist?.myName,
            },
        };
        console.log(data);
        if (
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            phone === "" ||
            date === "" ||
            exp === "" ||
            specialist === null ||
            info === ""
        ) {
            errorAlert("Something Field is required!");
        } else {
            if (selectDoctor) {
                dispatch(updateDoctor({ data: data, id: selectDoctor._id }))
                    .unwrap()
                    .then((result) => {
                        if (!result.error) {
                            handleDrawerClose();
                            successAlert(result.message);
                        } else {
                            errorAlert(result.message);
                        }
                    });
            } else {
                console.log("no input");
                dispatch(addDoctor({ data }))
                    .unwrap()
                    .then((result) => {
                        if (!result.error) {
                            handleDrawerClose();
                            successAlert(result.message);
                        } else {
                            errorAlert(result.message);
                        }
                    });
            }
        }
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
                        <Typography variant="h3">
                            {selectDoctor ? "Update Doctor" : "Add Doctor"}
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
                        <Stack width={"95%"} spacing={1}>
                            <Box sx={{ margin: "0 auto" }}>
                                <label htmlFor="contained-button-file">
                                    <Input
                                        // accept="image/*"
                                        inputProps={{
                                            accept: "image/*",
                                        }}
                                        id="contained-button-file"
                                        type="file"
                                        name="profile"
                                        required
                                        sx={{
                                            display: "none",
                                        }}
                                        onChange={imageInputChange}
                                    />

                                    <Avatar
                                        sx={{
                                            width: 90,
                                            height: 80,
                                            cursor: "pointer",
                                        }}
                                        variant="rounded"
                                        src={imageData}
                                    />
                                </label>
                            </Box>
                            <Stack direction={"row"} spacing={2}>
                                <Box width={"100%"}>
                                    <InputLabel sx={{ mb: 1 }}>
                                        First Name
                                    </InputLabel>
                                    <SimpleInput
                                        value={firstName}
                                        fullwidth
                                        placeholder="First Name"
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                </Box>
                                <Box width={"100%"}>
                                    <InputLabel sx={{ mb: 1 }}>
                                        Last Name
                                    </InputLabel>
                                    <SimpleInput
                                        value={lastName}
                                        fullwidth
                                        placeholder="Last Name"
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                    />
                                </Box>
                            </Stack>
                            <Box>
                                <InputLabel sx={{ mb: 1 }}>Email</InputLabel>
                                <SimpleInput
                                    value={email}
                                    fullwidth
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <InputLabel sx={{ mb: 1 }}>Phone</InputLabel>
                                <SimpleInput
                                    value={phone}
                                    fullwidth
                                    type="phone"
                                    placeholder="Phone Number"
                                    onChange={(e) => setPhone(e.target.value)}
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                            errorAlert(
                                                "Please Type English number Only."
                                            );
                                        }
                                    }}
                                />
                            </Box>
                            <Stack direction={"row"} spacing={2}>
                                <Box width={"100%"}>
                                    <InputLabel sx={{ mb: 1 }}>
                                        Date of Birth
                                    </InputLabel>
                                    <SimpleInput
                                        value={date}
                                        fullwidth
                                        type="date"
                                        placeholder="Choose Date of Birth"
                                        onChange={
                                            (e) => {
                                                setDate(e.target.value);
                                            }
                                            // setDate(e.target.value)
                                        }
                                    />
                                </Box>
                                <Box width={"100%"}>
                                    <InputLabel sx={{ mb: 1 }}>
                                        Experience
                                    </InputLabel>
                                    <SimpleInput
                                        value={exp}
                                        fullwidth
                                        placeholder="Experience"
                                        onChange={(e) => setExp(e.target.value)}
                                        onKeyPress={(event) => {
                                            if (!/[0-9.]/.test(event.key)) {
                                                event.preventDefault();
                                                errorAlert(
                                                    "Please Type English number Only."
                                                );
                                            }
                                        }}
                                    />
                                </Box>
                            </Stack>
                            <Box>
                                <InputLabel sx={{ mb: 1 }}>
                                    Specialist
                                </InputLabel>
                                <MkAutoComplete
                                    label="Specialist"
                                    name="specialist"
                                    placeholder="Choose Specialist"
                                    fullWidth
                                    options={specialistDropdown}
                                    getOptionLabel={(option) => option.name}
                                    isOptionEqualToValue={(option, value) =>
                                        option?._id === value?._id
                                    }
                                    onChange={(event, newValue) => {
                                        setSpecialist(newValue);
                                    }}
                                    value={specialist}
                                />
                            </Box>
                            <Box>
                                <InputLabel sx={{ mb: 1 }}>Info</InputLabel>
                                <SimpleInput
                                    placeholder="Write your Info"
                                    fullwidth
                                    value={info}
                                    multiline={true}
                                    rows={2}
                                    onChange={(e) => setInfo(e.target.value)}
                                />
                            </Box>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">
                                    Gender
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <FormControlLabel
                                        value="MALE"
                                        control={
                                            <Radio
                                                checked={gender === "MALE"}
                                            />
                                        }
                                        label="Male"
                                    />
                                    <FormControlLabel
                                        value="FEMALE"
                                        control={
                                            <Radio
                                                checked={gender === "FEMALE"}
                                            />
                                        }
                                        label="Female"
                                    />
                                </RadioGroup>
                            </FormControl>
                            {selectDoctor ? (
                                <></>
                            ) : (
                                <Typography color={"red"}>
                                    *Doctor default password is "kttguest"
                                </Typography>
                            )}

                            <Box>
                                {addStatus === "pending" ||
                                updateStatus === "pending" ? (
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        disabled
                                        onClick={addDoctorHandler}
                                    >
                                        Loading
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={addDoctorHandler}
                                    >
                                        {selectDoctor ? "Update" : "Add"}
                                    </Button>
                                )}
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
            </Drawer>
        </>
    );
};

export default DoctorsDrawer;
