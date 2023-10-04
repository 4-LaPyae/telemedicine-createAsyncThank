import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    Input,
    InputLabel,
    Stack,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SimpleInput from "../../../app/components/SimpleInput";
import { useDispatch, useSelector } from "react-redux";
import { addSpecialist, updateSpecialist } from "../features/SpecialistApi";
import { useEffect } from "react";
import { resetSpecialize } from "../features/SpecialistSlice";
import {
    errorAlert,
    successAlert,
} from "../../../app/components/Alert/ToastAlertBox";
import AddIcon from "@mui/icons-material/Add";

import { ToastContainer } from "react-toastify";

const drawerWidth = 500;
const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    margin: "10px 10px 0px 10px",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
}));
const SpecializeDrawer = ({ open, setOpen }) => {
    const { addStatus, selectSpecialize, updateStatus } = useSelector(
        (state) => state.SpecialistSlice
    );

    const theme = useTheme();
    const [specialistName, setSpecialistName] = useState("");
    const [myanmarName, setMyanmarName] = useState("");
    const [imageData, setImageData] = useState("#");
    const [imageFile, setImageFile] = useState(null);
    const dispatch = useDispatch();
    // console.log(option);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
        setSpecialistName("");
        setImageData("#");
        setImageFile(null);
        setMyanmarName("");
        dispatch(resetSpecialize());
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

    const handleInputChange = (e) => {
        setMyanmarName(e.target.value);
    };
    const addSpecializeHandler = () => {
        console.log(imageFile);
        const data = {
            name: specialistName,
            image: imageFile ?? selectSpecialize?.image,
            myName: myanmarName === "" ? null : myanmarName,
            // image: imageFile
            //     ? imageFile
            //     : selectSpecialize?.image
            //     ? selectSpecialize?.image
            //     : null,
        };
        if (specialistName === "") {
            errorAlert("Something field are required!");
        } else {
            if (selectSpecialize) {
                dispatch(
                    updateSpecialist({
                        data: data,
                        id: selectSpecialize._id,
                    })
                )
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
                dispatch(addSpecialist({ data }))
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
    useEffect(() => {
        if (selectSpecialize) setSpecialistName(selectSpecialize?.name);
        setMyanmarName(selectSpecialize?.myName);
        setImageData(selectSpecialize?.image ? selectSpecialize?.image : "#");
    }, [selectSpecialize]);

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
                <Box role="presentation">
                    <DrawerHeader>
                        <Typography variant="h3">
                            {selectSpecialize ? (
                                <>Update Specialist</>
                            ) : (
                                <>Add Specialist</>
                            )}
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
                            <Box sx={{ margin: "0 auto" }}>
                                <label htmlFor="contained-button-file">
                                    <Input
                                        // accept="image/*"
                                        inputProps={{ accept: "image/*" }}
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
                                            width: 70,
                                            height: 70,
                                            cursor: "pointer",
                                        }}
                                        variant="rounded"
                                        src={imageData}
                                    />
                                </label>
                            </Box>
                            <Box>
                                <InputLabel sx={{ mb: 1 }}>
                                    Specialize Name
                                </InputLabel>
                                <SimpleInput
                                    value={specialistName}
                                    fullwidth
                                    placeholder="Specialize Name"
                                    onChange={(e) => {
                                        setSpecialistName(e.target.value);
                                    }}
                                />
                            </Box>
                            <Box>
                                <InputLabel sx={{ mb: 1 }}>
                                    Specialize Myanmar Name
                                </InputLabel>
                                <SimpleInput
                                    value={myanmarName}
                                    fullwidth
                                    placeholder="Specialize Name"
                                    onChange={handleInputChange}
                                />
                            </Box>
                            <Box>
                                {addStatus === "pending" ||
                                updateStatus === "pending" ? (
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={addSpecializeHandler}
                                        disabled
                                    >
                                        Loading
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={addSpecializeHandler}
                                    >
                                        {selectSpecialize ? "Update" : "Add"}
                                    </Button>
                                )}
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
            </Drawer>
        </div>
    );
};

export default SpecializeDrawer;
