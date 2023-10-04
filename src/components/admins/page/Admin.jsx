import {
    Box,
    Button,
    CircularProgress,
    Drawer,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import TableToolbar from "../../../app/components/Table/TableToolbar";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { getAdminList } from "../features/SystemAdminApi";
import AdminTableItem from "../components/AdminTableItem";
import AdminAddDrawer from "../components/AdminAddDrawer";

const Admin = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { user } = useSelector((state) => state.loginInfo);

    const { loading, addStatus, adminList } = useSelector(
        (state) => state.SystemAdminSlice
    );

    const filteredAdminList = adminList?.filter((li) => {
        return li._id !== user._id;
    });

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    return (
        <Box component={Paper} sx={{ padding: "0px 25px 25px 25px" }}>
            <TableToolbar>
                <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems={"center"}
                    sx={{ flex: "1 1 100%", margin: "30px 0 30px 0" }}
                >
                    <Box>
                        <Stack
                            direction={"row"}
                            spacing={5}
                            alignItems={"center"}
                        >
                            <Typography
                                variant='h3'
                                sx={{ fontWeight: "bold" }}
                            >
                                Admin Lists
                            </Typography>
                        </Stack>
                    </Box>
                    <Box>
                        <AdminAddDrawer
                            isDrawerOpen={isDrawerOpen}
                            setIsDrawerOpen={setIsDrawerOpen}
                        />
                    </Box>
                </Stack>
            </TableToolbar>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {titles.map((title) => (
                                <TableCell align='center' key={title.id}>
                                    <Typography
                                        variant='h4'
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {title.label}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={8} rowSpan={3} align='center'>
                                <CircularProgress />
                            </TableCell>
                        </TableRow>
                    ) : (
                        <TableBody>
                            {filteredAdminList?.map((row, index) => (
                                <AdminTableItem
                                    item={row}
                                    key={index}
                                    setIsDrawerOpen={setIsDrawerOpen}
                                />
                            ))}
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Admin;

const titles = [
    { id: "profile", label: "Profile" },
    { id: "fullname", label: "Full Name" },
    { id: "email", label: "Email" },
    { id: "status", label: "Status" },
    { id: "action", label: "Action" },
];
