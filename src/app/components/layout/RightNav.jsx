import { useState } from "react";

import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Popover,
    Stack,
    Typography,
} from "@mui/material";
import { NotificationsRounded } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutAlert from "../Alert/LogoutAlert";

function RightNav() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    // console.log(admin);
    const { user } = useSelector((state) => state.loginInfo);
    const { adminList } = useSelector((state) => state.SystemAdminSlice);

    const profileAdmin = adminList?.filter((admin) => admin._id == user?._id);
    // console.log(profileAdmin);
    console.log({ profileAdmin });

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <>
            <Stack
                direction="row"
                spacing={2}
                divider={<Divider flexItem orientation="vertical" />}
            >
                <IconButton>
                    <NotificationsRounded />
                </IconButton>
                <Avatar
                    onClick={handleClick}
                    src={profileAdmin[0]?.profile}
                    alt="user logo"
                >
                    {profileAdmin[0]?.firstName?.charAt(0).toUpperCase()}
                </Avatar>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    sx={{
                        mt: "10px",
                        boxShadow: "0px 0px 50px 0px rgb(82 63 105 / 15%)",
                    }}
                >
                    <Stack
                        divider={<Divider flexItem orientation="horizontal" />}
                    >
                        <Box
                            sx={{
                                color: "#333",
                                padding: "0.75rem 3rem 0.75rem 1rem",
                            }}
                        >
                            <Typography sx={{ fontSize: "1rem" }}>
                                {profileAdmin[0]?.firstName}{" "}
                                {profileAdmin[0]?.lastName}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "0.75rem",
                                    color: "#333",
                                }}
                            >
                                {profileAdmin[0]?.email}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                padding: "1rem",
                            }}
                        >
                            <Link to="/profile" onClick={() => handleClose()}>
                                <Stack direction="row" spacing={1}>
                                    <AccountCircleIcon
                                        sx={{
                                            color: "#333",
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            color: "#333",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Profile
                                    </Typography>
                                </Stack>
                            </Link>
                        </Box>
                        <Box sx={{ padding: "1rem" }}>
                            <Typography
                                onClick={() => {
                                    setAnchorEl(null);
                                    //open logout alert
                                    setOpenAlert(true);
                                }}
                                sx={{
                                    color: "#333",
                                    fontSize: "1rem",
                                    cursor: "pointer",
                                }}
                            >
                                Logout
                            </Typography>
                        </Box>
                    </Stack>
                </Popover>
            </Stack>
            <LogoutAlert openAlert={openAlert} setOpenAlert={setOpenAlert} />
        </>
    );
}

export default RightNav;
