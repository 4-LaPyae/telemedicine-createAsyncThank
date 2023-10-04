import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TableToolbar from "../../../../app/components/Table/TableToolbar";
import MkAutoComplete from "../../../../app/assets/theme/MkAutoComplete";
import AppointmentTableItem from "../tableitem/AppointmentTableItem";
import TableFooterPagination from "../../../../app/components/Table/TableFooterPagination";
import AppointmentDrawer from "../AppointmentDrawer";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentList } from "../../features/AppointmentApi";
import AddIcon from "@mui/icons-material/Add";
import { ro } from "@faker-js/faker";
import SimpleInput from "../../../../app/components/SimpleInput";
import SearchIcon from "@mui/icons-material/Search";

const AppointmentCoTabPanel = () => {
  const { patients } = useSelector((state) => state.patientSlice);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [patientOption, setPatientOption] = useState(null);
  const [doctorOption, setDoctorOption] = useState(null);
  const [open, setOpen] = useState(false);
  const { appointmentList, loading, pagination } = useSelector(
    (state) => state.AppointmentSlice
  );
  const { doctors } = useSelector((state) => state.DoctorSlice);
  const [ptInputVal, setPtInputVal] = useState("");
  const [ptName, setPtName] = useState("");
  const [docInputVal, setDocInputVal] = useState("");
  const [docName, setDocName] = useState("");

  const emptyRows =
    page > 0
      ? rowsPerPage - appointmentList?.length
      : rowsPerPage - appointmentList?.length;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const timeoutInput = setTimeout(() => {
      setPtName(ptInputVal);
    }, 400);
    return () => clearInterval(timeoutInput);
  }, [ptInputVal]);

  useEffect(() => {
    const timeoutInput = setTimeout(() => {
      setDocName(docInputVal);
    }, 400);
    return () => clearInterval(timeoutInput);
  }, [docInputVal]);

  useEffect(() => {
    dispatch(
      getAppointmentList({
        page: page + 1,
        limit: rowsPerPage,
        doctorName: docName,
        patientName: ptName,
      })
    );
  }, [page, rowsPerPage, docName, ptName]);

  console.log({ docName, ptName });

  return (
    <Box component={Paper} sx={{ padding: "25px 0px" }}>
      <TableToolbar>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems={"center"}
          sx={{
            flex: "1 1 100%",
            margin: "0px 0 30px 0",
          }}
        >
          <Stack
            spacing={2}
            direction="row"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Appointment Lists
              </Typography>
            </Box>
            <Box>
              <SimpleInput
                placeholder="Patient Name"
                onChange={(e) => setPtInputVal(e.target.value)}
                startAdornment={
                  <InputAdornment>
                    <IconButton disabled>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Box>
            <Box>
              <SimpleInput
                placeholder="Doctor Name"
                onChange={(e) => setDocInputVal(e.target.value)}
                startAdornment={
                  <InputAdornment>
                    <IconButton disabled>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Box>

            {/* <Button
              variant="contained"
              color="secondary"
              onClick={appointmentSearchHandler}
            >
              Search
            </Button> */}
          </Stack>
          <Stack>
            {/* <AppointmentDrawer open={open} setOpen={setOpen} /> */}
          </Stack>
        </Stack>
      </TableToolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {titles.map((title) => (
                <TableCell align={title.position} key={title.id}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {title.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {loading ? (
            <TableRow key="loading">
              <TableCell colSpan={6} rowSpan={3} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            <>
              {appointmentList?.length > 0 ? (
                <>
                  <TableBody>
                    {appointmentList?.map((row, index) => (
                      <AppointmentTableItem key={row._id} item={row} />
                    ))}
                    {emptyRows > 0 && (
                      <TableRow
                        key="emptyRows"
                        style={{
                          height: 53.3 * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooterPagination
                    rowsPerPageOptions={[10, 20, 30]}
                    tableList={pagination?.total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </>
              ) : (
                <>
                  <TableRow key="emptyRows">
                    <TableCell colSpan={6}>
                      <Alert severity="error">
                        There is
                        <strong> no </strong>
                        Appointment.
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

export default AppointmentCoTabPanel;

const titles = [
  { id: "token", label: "Token No.", position: "center" },
  { id: "patient full name", label: "Patient Name", position: "left" },
  { id: "doc full name", label: "Doctor Name", position: "left" },
  { id: "token status", label: "Status", position: "center" },
  { id: "appointment time", label: "Appointment Time", position: "center" },
  // { id: "appointment action", label: "Action", position: "center" },
];
