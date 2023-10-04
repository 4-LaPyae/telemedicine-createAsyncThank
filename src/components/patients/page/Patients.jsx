import React from "react";
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
} from "@mui/material";
import TableToolbar from "../../../app/components/Table/TableToolbar";
import TableFooterPagination from "../../../app/components/Table/TableFooterPagination";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleInput from "../../../app/components/SimpleInput";
import SearchIcon from "@mui/icons-material/Search";
import PatientTableItem from "../components/PatientTableItem";
import { getPatientList } from "../features/PatientApi";
import PatientDrawer from "../components/PatientDrawer";
import { changePaginationData } from "../../../components/doctors/features/DoctorSlice";

const Patients = () => {
  const { pagination, status, patients } = useSelector(
    (state) => state.patientSlice
  );
  const [inputVal, setInputVal] = useState("");
  const [name, setName] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDrawer, setOpenDrawer] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutInput = setTimeout(() => {
      setName(inputVal);
    }, 400);
    return () => clearInterval(timeoutInput);
  }, [inputVal]);
  useEffect(() => {
    dispatch(
      getPatientList({
        page: page + 1,
        limit: rowsPerPage,
        filterName: name,
      })
    );

    // mark to where page reach
    dispatch(
      changePaginationData({
        page: page + 1,
        limit: rowsPerPage,
      })
    );
  }, [page, rowsPerPage, name]);

  useEffect(() => {
    if (patients?.length === 0) {
      setRowsPerPage(10);
      setPage(0);
    }
  }, [pagination]);
  const emptyRows =
    page > 0 ? rowsPerPage - patients?.length : rowsPerPage - patients?.length;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box component={Paper} sx={{ padding: "20px 5px" }}>
      <TableToolbar>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems={"center"}
          // spacing={2}
          sx={{ flex: "1 1 100%", margin: "0px 0 30px 0" }}
        >
          <Box>
            <Stack direction={"row"} spacing={5} alignItems={"center"}>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                Patient List
              </Typography>
              <Box>
                <SimpleInput
                  placeholder="Name or Phone..."
                  onChange={(e) => setInputVal(e.target.value)}
                  startAdornment={
                    <InputAdornment>
                      <IconButton disabled>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Box>
            </Stack>
          </Box>
          <Box>
            <PatientDrawer
              openDrawer={openDrawer}
              setOpenDrawer={setOpenDrawer}
            />
          </Box>
        </Stack>
      </TableToolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((th) => (
                <TableCell align="center">
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {th.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {status === "loading" ? (
            <TableRow>
              <TableCell colSpan={8} rowSpan={3} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            <>
              {patients.length > 0 ? (
                <>
                  <TableBody>
                    {patients?.map((row, index) => (
                      <PatientTableItem
                        item={row}
                        key={index}
                        setOpenDrawer={setOpenDrawer}
                      />
                    ))}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 53.3 * emptyRows,
                        }}
                      >
                        <TableCell colSpan={8} />
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
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Alert severity="error">
                        There is
                        <strong> no </strong>
                        Patient.
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

export default Patients;

const tableHeaders = [
  { id: "profile", label: "Profile" },
  { id: "fullname", label: "FullName" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "dob", label: "Date Of Birth" },
  { id: "gender", label: "Gender" },
  { id: "status", label: "Status" },
  { id: "action", label: "Action" },
];
