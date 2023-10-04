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
    Input,
    Avatar,
} from "@mui/material";
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SimpleInput from "../../../app/components/SimpleInput";
import {
    addAdmin,
    getAdminList,
    updateAdmin,
} from "../features/SystemAdminApi";
import { useDispatch, useSelector } from "react-redux";
import {
    setUpdateAdmin,
    setUpdateAdminDefault,
} from "../features/SystemAdminSlice";
import { errorAlert } from "../../../app/components/Alert/ToastAlertBox";
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

const AdminAddDrawer = ({ isDrawerOpen, setIsDrawerOpen }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [imageData, setImageData] = useState("#");

    const [imageFile, setImageFile] = useState(null);
    const { loading, updateLoading, forUpdateAdmin } = useSelector(
        (state) => state.SystemAdminSlice
    );
    const [adminId, setAdminId] = useState("");
    const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setImageData("#");
        setImageFile(null);
        setPhone("");
        setIsDrawerOpen(false);
        dispatch(setUpdateAdminDefault());
    };

    useEffect(() => {
        setFirstName(forUpdateAdmin?.firstName);
        setLastName(forUpdateAdmin?.lastName);
        setEmail(forUpdateAdmin?.email);
        setPhone(forUpdateAdmin?.phone);
        setImageData(forUpdateAdmin?.profile);
        setAdminId(forUpdateAdmin?._id);
    }, [forUpdateAdmin]);

    const theme = useTheme();

    const firstNameHandler = (e) => {
        setFirstName(e.target.value);
    };
    const lastNameHandler = (e) => {
        setLastName(e.target.value);
    };
    const emailHandler = (e) => {
        setEmail(e.target.value);
    };
    const phoneHandler = (e) => {
        setPhone(e.target.value);
    };
    const phoneErrorHandler = (e) => {
        e.preventDefault();
        if (!/[0-9]/.test(e.key)) {
            errorAlert("Please Type English number Only.");
        }
    };

    const imageInputChange = (e) => {
        let reader = new FileReader();
        console.log(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImageFile(reader.result);
        };
        setImageData(URL.createObjectURL(e.target.files[0]));
    };
    const uiResetHandler = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setImageData("#");
        setIsDrawerOpen(false);
        dispatch(getAdminList());
    };

    const requiredData = {
        firstName,
        lastName,
        email,
        phone,
        password: "guest",
    };

    const valid =
        Boolean(firstName) &&
        Boolean(lastName) &&
        Boolean(email) &&
        Boolean(phone);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("submit clicked");
        if (forUpdateAdmin) {
            if (!valid) {
                errorAlert("Something field is required!");
            } else {
                const data = {
                    ...requiredData,
                    profile: imageFile ?? forUpdateAdmin?.profile,
                };
                console.log({ data });
                dispatch(updateAdmin({ data, admin_id: adminId }))
                    .unwrap()
                    .then((result) => {
                        console.log({ result });
                        if (!result.error) {
                            uiResetHandler();
                        }
                    });
            }
        } else {
            if (!valid) {
                errorAlert("Something field is required!");
            } else {
                const data = {
                    ...requiredData,
                    profile: imageFile,
                };
                console.log({ data });
                dispatch(addAdmin(data))
                    .unwrap()
                    .then((result) => {
                        console.log({ result });
                        if (!result.error) {
                            uiResetHandler();
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
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            >
                <Box role="presentation">
                    <Box>
                        <DrawerHeader>
                            <Box>
                                <Typography
                                    variant="h3"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    {forUpdateAdmin ? "Update" : "Create"} Admin
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === "rtl" ? (
                                        <CloseIcon />
                                    ) : (
                                        <CloseIcon />
                                    )}
                                </IconButton>
                            </Box>
                        </DrawerHeader>

                        <Divider />
                        <form onSubmit={submitHandler}>
                            <Stack
                                spacing={3}
                                justifyContent={"center"}
                                alignItems={"center"}
                                sx={{ mt: 2 }}
                            >
                                <Stack width={"90%"} spacing={2}>
                                    <Box sx={{ margin: "0 auto" }}>
                                        <label htmlFor="contained-button-file">
                                            <Input
                                                inputProps={{
                                                    accept: "image/*",
                                                }}
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
                                                    width: 70,
                                                    height: 70,
                                                    cursor: "pointer",
                                                }}
                                                variant="rounded"
                                                src={imageData}
                                            />
                                        </label>
                                    </Box>
                                    <Stack direction={"row"} spacing={2}>
                                        <Box>
                                            <InputLabel sx={{ mb: 1 }}>
                                                First Name *
                                            </InputLabel>
                                            <SimpleInput
                                                fullwidth
                                                placeholder="First Name"
                                                value={firstName}
                                                onChange={firstNameHandler}
                                            />
                                        </Box>
                                        <Box>
                                            <InputLabel sx={{ mb: 1 }}>
                                                Last Name *
                                            </InputLabel>
                                            <SimpleInput
                                                value={lastName}
                                                fullwidth
                                                placeholder="Last Name"
                                                onChange={lastNameHandler}
                                            />
                                        </Box>
                                    </Stack>
                                    <Stack direction={"row"} spacing={2}>
                                        <Box>
                                            <InputLabel sx={{ mb: 1 }}>
                                                Email *
                                            </InputLabel>
                                            <SimpleInput
                                                value={email}
                                                fullwidth
                                                type="email"
                                                disabled={
                                                    forUpdateAdmin
                                                        ? true
                                                        : false
                                                }
                                                placeholder="Email"
                                                onChange={emailHandler}
                                            />
                                        </Box>
                                        <Box>
                                            <InputLabel sx={{ mb: 1 }}>
                                                Phone *
                                            </InputLabel>
                                            <SimpleInput
                                                value={phone}
                                                fullwidth
                                                disabled={
                                                    forUpdateAdmin
                                                        ? true
                                                        : false
                                                }
                                                placeholder="Phone"
                                                onChange={phoneHandler}
                                                onKeyPress={phoneErrorHandler}
                                            />
                                        </Box>
                                    </Stack>
                                </Stack>

                                <Button
                                    variant="contained"
                                    disabled={updateLoading ? true : false}
                                    type="submit"
                                >
                                    {forUpdateAdmin ? "Update" : "Create"}
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default AdminAddDrawer;
