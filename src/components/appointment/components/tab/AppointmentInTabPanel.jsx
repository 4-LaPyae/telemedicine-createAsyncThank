import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
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
import TableToolbar from "../../../../app/components/Table/TableToolbar";
import MkAutoComplete from "../../../../app/assets/theme/MkAutoComplete";
import AppointmentIndoorTableItem from "../tableitem/AppointmentIndoorTableItem";
import TableFooterPagination from "../../../../app/components/Table/TableFooterPagination";
import InAppointmentDrawer from "../InAppointmentDrawer";
import { useDispatch, useSelector } from "react-redux";
import { getInAppointmentList } from "../../features/AppointmentApi";
import AddIcon from "@mui/icons-material/Add";
import SimpleInput from "../../../../app/components/SimpleInput";
import SearchIcon from "@mui/icons-material/Search";

const AppointmentInTabPanel = () => {
  const {
    inAppointmentList,
    inLoading,
    inpagination,
    appointmentList,
    loading,
    pagination,
  } = useSelector((state) => state.AppointmentSlice);
  const { status, patients } = useSelector((state) => state.patientSlice);
  const { doctors, getStatus } = useSelector((state) => state.DoctorSlice);
  const dispatch = useDispatch();
  const [ptInputVal, setPtInputVal] = useState("");
  const [ptName, setPtName] = useState("");
  const [docInputVal, setDocInputVal] = useState("");
  const [docName, setDocName] = useState("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [patientOption, setPatientOption] = useState(null);
  const [doctorOption, setDoctorOption] = useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const emptyRows =
    page > 0
      ? rowsPerPage - inAppointmentList?.length
      : rowsPerPage - inAppointmentList?.length;

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
      getInAppointmentList({
        page: page + 1,
        limit: rowsPerPage,
        docName,
        ptName,
      })
    );
  }, [page, rowsPerPage, docName, ptName]);

  const appointmentSearchHandler = (e) => {
    e.preventDefault();

    dispatch(
      getInAppointmentList({
        page: page + 1,
        limit: rowsPerPage,
      })
    )
      .unwrap()
      .then((result) => {
        // console.log({ result });
      });
  };

  return (
    <Box component={Paper} fullWidth sx={{ padding: "25px 0px" }}>
      <TableToolbar>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems={"center"}
          spacing={2}
          sx={{
            flex: "1 1 100%",
            margin: "0 0 30px 0",
          }}
        >
          <Stack
            spacing={2}
            direction={"row"}
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
              {/* <MkAutoComplete
                label="Patient Option"
                placeholder="Choose Patient Name"
                options={patients ?? []}
                getOptionLabel={(option) =>
                  option.firstName + " " + option.lastName
                }
                isOptionEqualToValue={(option, value) =>
                  option._id === value._id
                }
                onChange={(event, newValue) => {
                  setPatientOption(newValue);
                }}
                value={patientOption}
                name="Patient list"
              /> */}
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
              {/* <MkAutoComplete
                label="Doctor Option"
                placeholder="Choose Your Doctor"
                options={doctors}
                getOptionLabel={(option) =>
                  option.firstName + " " + option.lastName
                }
                isOptionEqualToValue={(option, value) =>
                  option._id === value._id
                }
                onChange={(event, newValue) => {
                  setDoctorOption(newValue);
                }}
                value={doctorOption}
                name="Doctor list"
              /> */}
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
            {/* <InAppointmentDrawer open={open} setOpen={setOpen} /> */}
          </Stack>
        </Stack>
      </TableToolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {inTitles.map((title) => (
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
            <TableRow>
              <TableCell colSpan={6} rowSpan={3} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            <>
              {inAppointmentList?.length > 0 ? (
                <>
                  <TableBody>
                    {inAppointmentList?.map((row, index) => (
                      <AppointmentIndoorTableItem
                        item={row}
                        setOpen={setOpen}
                      />
                    ))}
                    {emptyRows > 0 && (
                      <TableRow
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
                    tableList={inpagination?.total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </>
              ) : (
                <>
                  <TableRow>
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

export default AppointmentInTabPanel;

const inTitles = [
  { id: "token", label: "Token No.", position: "center" },
  { id: "patient full name", label: "Patient Name", position: "left" },
  { id: "doc full name", label: "Doctor Name", position: "left" },
  { id: "token status", label: "Status", position: "center" },
  { id: "request time", label: "Request Time", position: "center" },
  // { id: " action", label: "Action", position: "center" },
];
