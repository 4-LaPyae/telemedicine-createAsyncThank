import React, { useEffect, useRef, useState } from "react";
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
import TableFooterPagination from "../../../app/components/Table/TableFooterPagination";
import { useDispatch, useSelector } from "react-redux";
import { homeProcessListDoctor } from "../features/DashboardApi";
import Brightness1Icon from "@mui/icons-material/Brightness1";
const DoctorListTableItem = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { doctors, dstatus } = useSelector((state) => state.dashboardSlice);
  const dispatch = useDispatch();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(
      homeProcessListDoctor({
        dPage: page + 1,
        dLimit: rowsPerPage,
      })
    );
  }, [page, rowsPerPage]);
  const emptyRows =
    page > 0
      ? rowsPerPage - doctors?.data?.length
      : rowsPerPage - doctors?.data?.length;

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
            <Stack direction={"row"} spacing={5} alignItems={"center"}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: "#068EA9",
                }}
              >
                Active Doctors
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
                <TableCell align={th.position}>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {th.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {dstatus ? (
            <TableRow>
              <TableCell colSpan={8} rowSpan={3} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            <>
              {doctors?.data?.length > 0 ? (
                <>
                  <TableBody>
                    {doctors?.data?.map((row, index) => (
                      <TableRow key={row._id}>
                        <TableCell align="center">
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              //margin: "0 auto",
                              // cursor: "pointer",
                            }}
                            variant="rounded"
                            src={row.profile}
                            alt="doctor"
                            // onClick={patientDetailHandlar}
                          >
                            {row.firstName.charAt(0).toUpperCase()}
                          </Avatar>
                        </TableCell>
                        <TableCell align="left">
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            spacing={1}
                          >
                            <Brightness1Icon
                              style={{
                                fontSize: 16,
                              }}
                              color={
                                row.onlineStatus === "Online"
                                  ? "success"
                                  : "grey"
                              }
                            />
                            <Box>
                              {row.firstName} {row.lastName}
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell align="center">{row.phone}</TableCell>
                        <TableCell align="center">{row.gender}</TableCell>
                      </TableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 61 * emptyRows,
                        }}
                      >
                        <TableCell colSpan={5} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooterPagination
                    rowsPerPageOptions={[5, 10]}
                    tableList={doctors?.total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </>
              ) : (
                <>
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Alert severity="error">
                        There is
                        <strong> no </strong>
                        doctors.
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

export default DoctorListTableItem;

const tableHeaders = [
  { id: "profile", label: "Profile", position: "left" },
  { id: "fullname", label: "FullName", position: "left" },
  { id: "phone", label: "Phone", position: "center" },
  { id: "gender", label: "Gender", position: "center" },
];
