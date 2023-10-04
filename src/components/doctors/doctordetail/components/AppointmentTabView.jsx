import {
  Alert,
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

import TableFooterPagination from "../../../../app/components/Table/TableFooterPagination";
import { changePaginationData } from "../../features/DoctorSlice";
import { getDoctorDetail } from "../../features/DoctorApi";
import AppointmentTabViewItem from "./AppointmentTabViewItem";

const AppointmentTabView = ({ id }) => {
  const { doctorsDetail, inPagination } = useSelector(
    (state) => state.DoctorSlice
  );

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
  }, [page, rowsPerPage]);

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
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {t.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {doctorsDetail?.appointments?.length > 0 ? (
            <>
              <TableBody>
                {doctorsDetail?.appointments?.map((row, index) => (
                  <AppointmentTabViewItem item={row} key={index} />
                ))}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 47 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={5} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooterPagination
                rowsPerPageOptions={[10, 20, 30]}
                tableList={doctorsDetail?.total}
                rowsPerPage={rowsPerPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={5} rowSpan={3} align="center">
                <Alert severity="error">
                  There is
                  <strong> no </strong>
                  Appointment.
                </Alert>
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
