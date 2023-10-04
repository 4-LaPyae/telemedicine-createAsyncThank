import React, { useState } from "react";
import { useTheme, createTheme } from "@mui/material/styles";
import MkButton from "../../../app/assets/theme/MkButton";
import { useDispatch, useSelector } from "react-redux";
import {
    Avatar,
    Box,
    Button,
    Grid,
    Input,
    InputLabel,
    Paper,
    Stack,
} from "@mui/material";
import SimpleInput from "../../../app/components/SimpleInput";
import { updateAdmin } from "../../admins/features/SystemAdminApi";
import { storeuser } from "../../../components/authentication/features/LoginSlice";
import { setUpdateFlag } from "../../admins/features/SystemAdminSlice";
import { useNavigate } from "react-router-dom";

const AdminProfileInputs = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.loginInfo);
    const { adminList, updateLoading } = useSelector(
        (state) => state.SystemAdminSlice
    );
    console.log({ user, adminList });

    const profileAdmin = adminList?.filter((admin) => admin._id == user._id);
    console.log({ profileAdmin });

    const [phone, setPhone] = useState(profileAdmin[0]?.phone ?? "");
    const [firstName, setFirstName] = useState(
        profileAdmin[0]?.firstName ?? ""
    );
    const [lastName, setLastName] = useState(profileAdmin[0]?.lastName ?? "");
    const [email, setEmail] = useState(profileAdmin[0]?.email ?? "");
    const [imageData, setImageData] = useState("#");
    const [imageChange, setImageChange] = useState(false);
    const [imageFile, setImageFile] = useState(
        profileAdmin[0]?.profile ?? null
    );
    const [adminId, setAdminId] = useState(profileAdmin[0]?._id ?? "");

    const imageInputChange = (e) => {
        console.log(e.target.files[0]);
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImageFile(reader.result);
        };
        const [file] = e.target.files;
        if (file) {
            setImageChange(true);
            setImageData(URL.createObjectURL(file));
        }
    };

    const data = {
        firstName,
        lastName,
        email,
        phone,
        profile: imageFile,
    };

    const updateHandler = (event) => {
        event.preventDefault();
        const updateData = {
            ...data,
            password: "guest",
        };

        const storeData = {
            ...data,
            _id: user?._id,
            token: user?.token,
            status: user?.status,
        };
        console.log({ updateData });
        console.log({ storeData });
        dispatch(updateAdmin({ data: updateData, admin_id: adminId }))
            .unwrap()
            .then((result) => {
                console.log({ result });
                if (!result.error) {
                    dispatch(storeuser(storeData));

                    setTimeout(() => {
                        navigate("/");
                    }, 500);
                }
            });
    };
    return (
        <>
            <Box onSubmit={updateHandler} component='form'>
                <Box component={Paper} sx={{ padding: "25px", mt: 5 }}>
                    <Stack
                        direction='row'
                        spacing={1}
                        justifyContent='space-between'
                    >
                        User Information
                        <Box>
                            <label htmlFor='contained-button-file'>
                                <Input
                                    inputProps={{ accept: "image/*" }}
                                    id='contained-button-file'
                                    type='file'
                                    name='profile'
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
                                    variant='rounded'
                                    src={
                                        profileAdmin[0]?.profile
                                            ? imageChange
                                                ? imageData
                                                : `${profileAdmin[0]?.profile}`
                                            : imageData
                                    }
                                />
                            </label>
                        </Box>
                    </Stack>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 12 }}
                    >
                        <Grid item xs={12} md={6}>
                            <Box>
                                <InputLabel sx={{ mb: 1 }}>
                                    First Name
                                </InputLabel>
                                <SimpleInput
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.currentTarget.value)
                                    }
                                    label='Phone'
                                    name='phone'
                                    placeholder='Enter Your Phone'
                                    focus={true}
                                    required
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <InputLabel sx={{ mb: 1 }}>
                                    Last Name
                                </InputLabel>
                                <SimpleInput
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.currentTarget.value)
                                    }
                                    label='Name'
                                    name='name'
                                    placeholder='Enter Your Name'
                                    required
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <InputLabel sx={{ mb: 1 }}>Email</InputLabel>
                                <SimpleInput
                                    value={email}
                                    disabled
                                    label='Email'
                                    name='email'
                                    required
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <InputLabel sx={{ mb: 1 }}>Phone</InputLabel>
                                <SimpleInput
                                    value={phone}
                                    disabled
                                    label='Phone'
                                    name='phone'
                                    required
                                />
                            </Box>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                marginTop: "15px",
                            }}
                        >
                            <Button
                                variant='contained'
                                size='lg'
                                disabled={updateLoading ? true : false}
                                type='submit'
                            >
                                {updateLoading ? "Updating" : "Update"}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default AdminProfileInputs;
