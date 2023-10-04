import { useState } from "react";
import { Outlet } from "react-router-dom";

import {
    Box,
    CssBaseline,
    Divider,
    IconButton,
    List,
    Drawer,
    ListItem,
    ListItemButton,
    Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Menu, MenuOpen } from "@mui/icons-material";
import { Routes } from "./Data";
import NavItem from "./Navitem";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import logo from "../../assets/images/Logo.png";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSpecialistDropdown } from "../../../components/specialize/features/SpecialistApi";
import { getAdminList } from "../../../components/admins/features/SystemAdminApi";
import { getPatientList } from "../../../components/patients/features/PatientApi";
import { getDoctorsList } from "../../../components/doctors/features/DoctorApi";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

// const DrawerHeader = styled("div", {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   height: "65px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...(!open && { justifyContent: "center" }),
// }));

const Main = styled("div", {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    // display: "flex",
    // flexDirection: "column",
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    padding: "0 40px",
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const SideNav = styled(Drawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function Layout() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(getAdminList());
        dispatch(
            getDoctorsList({
                page: 1,
                limit: 10,
                filterName: "",
            })
        );
        dispatch(
            getPatientList({
                page: 1,
                limit: 10,
                filterName: "",
                // filterPhone: "",
            })
        );
    }, []);
    // const [group, setGroup] = useState(false);
    // const handleGroup = () => {
    //   if (open) {
    //     setGroup(!group);
    //   }
    // };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <SideNav
                variant='permanent'
                open={open}
                sx={{
                    "& .MuiDrawer-paper": {
                        bgcolor: "#fff",
                    },
                }}
            >
                <List open={open}>
                    <ListItem disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                            sx={{
                                transitionProperty: "justifyContent",
                                transitionDuration: "3s",
                                minHeight: 48,
                                justifyContent: open
                                    ? "space-between"
                                    : "center",
                                px: 2.5,
                            }}
                        >
                            <Avatar
                                sx={{
                                    transitionProperty: "display",
                                    transitionDuration: "3s",
                                    display: open ? "block" : "none",
                                    minWidth: 0,
                                    width: 50,
                                    height: 50,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                }}
                                src={logo}
                                alt='Logo'
                            />
                            {open ? (
                                <IconButton
                                    aria-label='close drawer'
                                    onClick={handleDrawerClose}
                                >
                                    <MenuOpen style={{ color: "#000000" }} />
                                </IconButton>
                            ) : (
                                <IconButton
                                    aria-label='open drawer'
                                    onClick={handleDrawerOpen}
                                >
                                    <Menu style={{ color: "#000000" }} />
                                </IconButton>
                            )}
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {Routes.map((item) => (
                        <NavItem item={item} key={item.text} open={open} />
                    ))}
                </List>
            </SideNav>

            <Main open={open}>
                <Box
                    component='header'
                    sx={{
                        borderRadius: "7px",
                        height: "65px",
                        padding: "0 1.5rem",
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <LeftNav />
                    <RightNav />
                </Box>
                <Box mb={7}>
                    <Outlet />
                </Box>
            </Main>
        </Box>
    );
}
