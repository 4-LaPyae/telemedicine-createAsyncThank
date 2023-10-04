import React, { useEffect, useState } from "react";
import {
    Box,
    CircularProgress,
    InputAdornment,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Alert,
    Avatar,
    Chip,
} from "@mui/material";
import TableToolbar from "../../../app/components/Table/TableToolbar";
import { useDispatch, useSelector } from "react-redux";
import { homeProcessListAppointment } from "../features/DashboardApi";
import TableFooterPagination from "../../../app/components/Table/TableFooterPagination";
import moment from "moment";
import { Brightness1 } from "@mui/icons-material";

const AppointmentListTableItem = () => {
    const { appointments, astatus } = useSelector(
        (state) => state.dashboardAppointmentSlice
    );
    console.log(appointments);
    const [apage, setAPage] = useState(0);
    const [arowsPerPage, setARowsPerPage] = useState(10);
    const dispatch = useDispatch();
    const emptyRows =
        apage > 0
            ? arowsPerPage - appointments?.data?.length
            : arowsPerPage - appointments?.data?.length;
    const handleChangeAppointmentPage = (event, newPage) => {
        setAPage(newPage);
    };

    const handleChangeAppointmentRowsPerPage = (event) => {
        setARowsPerPage(parseInt(event.target.value, 10));
        setAPage(0);
    };

    useEffect(() => {
        dispatch(
            homeProcessListAppointment({
                pPage: apage + 1,
                pLimit: arowsPerPage,
            })
        );
    }, [apage, arowsPerPage]);
    return (
        <Box
            component={Paper}
            sx={{
                padding: "10px 5px",
                width: "50%",
                borderRadius: "10px",
            }}
        >
            <TableToolbar>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems={"center"}
                >
                    <Box>
                        <Stack
                            direction={"row"}
                            spacing={5}
                            alignItems={"center"}
                        >
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: "bold",
                                    color: "#068EA9",
                                }}
                            >
                                Appointment List
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>
            </TableToolbar>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {tableHeaders.map((th) => (
                                <TableCell align="center">
                                    <Typography
                                        variant="h4"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {th.label}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    {astatus ? (
                        <TableRow>
                            <TableCell colSpan={8} rowSpan={3} align="center">
                                <CircularProgress />
                            </TableCell>
                        </TableRow>
                    ) : (
                        <>
                            {appointments?.data?.length > 0 ? (
                                <>
                                    <TableBody>
                                        {appointments?.data?.map(
                                            (row, index) => (
                                                <TableRow key={row._id}>
                                                    <TableCell align="center">
                                                        {row.token}
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        height="61px"
                                                    >
                                                        <Stack
                                                            direction={"row"}
                                                            alignItems={
                                                                "center"
                                                            }
                                                            spacing={1}
                                                        >
                                                            <Brightness1
                                                                style={{
                                                                    fontSize: 16,
                                                                }}
                                                                color={
                                                                    row.patient
                                                                        .onlineStatus ===
                                                                    1
                                                                        ? "success"
                                                                        : "grey"
                                                                }
                                                            />
                                                            <Box>
                                                                {
                                                                    row.patient
                                                                        .firstName
                                                                }{" "}
                                                                {
                                                                    row.patient
                                                                        .lastName
                                                                }
                                                            </Box>
                                                        </Stack>
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        <Stack
                                                            direction={"row"}
                                                            alignItems={
                                                                "center"
                                                            }
                                                            spacing={1}
                                                        >
                                                            <Brightness1
                                                                style={{
                                                                    fontSize: 16,
                                                                }}
                                                                color={
                                                                    row.doctor
                                                                        ?.onlineStatus ===
                                                                    1
                                                                        ? "success"
                                                                        : "grey"
                                                                }
                                                            />
                                                            <Box>
                                                                {row.doctorId !=
                                                                null
                                                                    ? row.doctor
                                                                          .firstName +
                                                                      " " +
                                                                      row.doctor
                                                                          .lastName
                                                                    : "N/A"}
                                                            </Box>
                                                        </Stack>
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        <Chip
                                                            label={
                                                                row.status ===
                                                                "ACCEPT"
                                                                    ? "EXAMINING"
                                                                    : row.status
                                                            }
                                                            color={
                                                                row.status ===
                                                                "COMPLETE"
                                                                    ? "success"
                                                                    : row.status ===
                                                                      "PENDING"
                                                                    ? "warning"
                                                                    : "info"
                                                            }
                                                        />
                                                    </TableCell>
                                                    {/* <TableCell align="center">
                                                        {moment(
                                                            row.consultantTime
                                                        ).format(
                                                            'yyyy-MM-DD hh:mm a'
                                                        )}
                                                    </TableCell> */}
                                                </TableRow>
                                            )
                                        )}
                                        {emptyRows > 0 && (
                                            <TableRow
                                                style={{
                                                    height: 61 * emptyRows,
                                                }}
                                            >
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>

                                    <TableFooterPagination
                                        rowsPerPageOptions={[10, 20, 30, 100]}
                                        tableList={appointments?.total}
                                        rowsPerPage={arowsPerPage}
                                        page={apage}
                                        handleChangePage={
                                            handleChangeAppointmentPage
                                        }
                                        handleChangeRowsPerPage={
                                            handleChangeAppointmentRowsPerPage
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <Alert severity="error">
                                                There is
                                                <strong> no </strong>
                                                Appointment for today.
                                            </Alert>
                                        </TableCell>
                                    </TableRow>
                                </>
                            )}
                        </>
                    )}
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AppointmentListTableItem;

const tableHeaders = [
    { id: 3, label: "TokenNo." },
    { id: 1, label: "PatientName" },
    { id: 2, label: "DoctorName" },
    { id: 4, label: "Status" },
    // {id: 5, label: 'Time'},
];
