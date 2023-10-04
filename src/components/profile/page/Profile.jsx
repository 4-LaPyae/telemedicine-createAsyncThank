import {
    Alert,
    AlertTitle,
    Avatar,
    Box,
    Collapse,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AdminProfileLinkTab from "../components/AdminProfileLinkTab";
import AdminProfileTabView from "../components/AdminProfileTabView";
import CloseIcon from "@mui/icons-material/Close";

const Profile = () => {
    const { adminList, updateFlag } = useSelector(
        (state) => state.SystemAdminSlice
    );
    const [tabIndex, setTabIndex] = useState(0);

    const { user } = useSelector((state) => state.loginInfo);
    const [flag, setFlag] = useState(false);

    const profileAdmin = adminList?.filter((admin) => admin?._id === user?._id);
    console.log({ profileAdmin });

    useEffect(() => {
        if (updateFlag) {
            setFlag(true);
        }
    }, [updateFlag]);

    return (
        <Box>
            <Box sx={{ padding: "25px 25px 0px 25px" }} component={Paper}>
                <Box>
                    <Stack direction='row' justifyContent='space-between'>
                        <Stack direction='row' spacing={3} alignItems='center'>
                            <Avatar
                                sx={{
                                    borderRadius: 2.5,
                                    width: 74,
                                    height: 74,
                                    objectFit: "cover",
                                }}
                                src={`${profileAdmin[0]?.profile}`}
                                alt='profile'
                            >
                                {profileAdmin[0]?.fistName}
                            </Avatar>
                            <Box>
                                <Typography
                                    component='div'
                                    variant='h3'
                                    sx={{ fontWeight: "bold" }}
                                >
                                    {profileAdmin[0]?.firstName}{" "}
                                    {profileAdmin[0]?.lastName}
                                </Typography>
                                <Stack spacing={3} direction='row'>
                                    <Typography variant='body2' component='div'>
                                        {profileAdmin[0]?.phone}
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>
                        <Stack direction='row' spacing={2} alignItems='center'>
                            <Collapse in={flag}>
                                <Alert
                                    action={
                                        <IconButton
                                            aria-label='close'
                                            color='inherit'
                                            size='small'
                                            onClick={() => {
                                                setFlag(false);
                                            }}
                                        >
                                            <CloseIcon fontSize='inherit' />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                    severity='success'
                                >
                                    <AlertTitle>Success</AlertTitle>
                                    Profile Update{" "}
                                    <strong>Successfully!</strong>
                                </Alert>
                            </Collapse>
                        </Stack>
                    </Stack>
                </Box>
                <AdminProfileLinkTab
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                />
            </Box>
            <Box>
                <AdminProfileTabView
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                />
            </Box>
        </Box>
    );
};

export default Profile;
