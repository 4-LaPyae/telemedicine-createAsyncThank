import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppointmentTabViewItem from "./AppointmentTabViewItem";
import TableFooterPagination from "../../../app/components/Table/TableFooterPagination";
import { changePaginationData } from "../../doctors/features/DoctorSlice";
import { getDoctorDetail } from "../../doctors/features/DoctorApi";

const AppointmentTabView = ({ id }) => {
    const { doctorsDetail, inPagination } = useSelector(
        (state) => state.DoctorSlice
    );
    console.log(id);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            getDoctorDetail({
                type: "INHOUSE",
                id,
                page: page + 1,
                limit: rowsPerPage,
            })
        );

        // mark to where page reach
        dispatch(
            changePaginationData({
                page: page + 1,
                limit: rowsPerPage,
            })
        );
    }, [page, rowsPerPage]);

    useEffect(() => {
        if (doctorsDetail?.appointments?.length === 0) {
            setRowsPerPage(10);
            setPage(0);
        }
    }, [inPagination]);
    const emptyRows =
        page > 0
            ? rowsPerPage - doctorsDetail?.appointments?.length
            : rowsPerPage - doctorsDetail?.appointments?.length;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {tableHeaderItems.map((t) => (
                                <TableCell align="center">
                                    <Typography
                                        variant="h4"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {t.label}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    {doctorsDetail?.appointments.length > 0 ? (
                        <>
                            <TableBody>
                                {doctorsDetail?.appointments?.map(
                                    (row, index) => (
                                        <AppointmentTabViewItem
                                            item={row}
                                            key={index}
                                        />
                                    )
                                )}
                            </TableBody>
                            <TableFooterPagination
                                rowsPerPageOptions={[10, 20, 30]}
                                tableList={inPagination?.total}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                handleChangePage={handleChangePage}
                                handleChangeRowsPerPage={
                                    handleChangeRowsPerPage
                                }
                            />
                        </>
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={15}
                                rowSpan={3}
                                align="center"
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                }}
                            >
                                There is no Appointment
                            </TableCell>
                        </TableRow>
                    )}
                </Table>
            </TableContainer>
        </>
    );
};

export default AppointmentTabView;

const tableHeaderItems = [
    {
        id: 1,
        label: "Token No.",
    },
    {
        id: 2,
        label: "Patient Name",
    },
    {
        id: 3,
        label: "Patient Phone",
    },
    {
        id: 4,
        label: "Status",
    },
    {
        id: 5,
        label: "Request Time",
    },
];
