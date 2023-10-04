import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Tabs from "@mui/base/Tabs";
import TabsList from "@mui/base/TabsList";
import TabPanel from "@mui/base/TabPanel";
import Tab, { tabClasses } from "@mui/base/Tab";

import {
  getAppointmentList,
  getInAppointmentList,
} from "../features/AppointmentApi";

import { getDoctorsList } from "../../doctors/features/DoctorApi";
import styled from "@emotion/styled";
import { buttonClasses } from "@mui/base/Button";
import AppointmentCoTabPanel from "../components/tab/AppointmentCoTabPanel";
import AppointmentInTabPanel from "../components/tab/AppointmentInTabPanel";
import { useDispatch } from "react-redux";
import { getSpecialistDropdown } from "../../specialize/features/SpecialistApi";
import { getPatientList } from "../../patients/features/PatientApi";

const Appointment = () => {
  const dispatch = useDispatch();

  const blue = {
    50: "#F0F7FF",
    100: "#C2E0FF",
    200: "#80BFFF",
    300: "#66B2FF",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    700: "#0059B2",
    800: "#004C99",
    900: "#003A75",
  };

  const grey = {
    50: "#f6f8fa",
    100: "#eaeef2",
    200: "#d0d7de",
    300: "#afb8c1",
    400: "#8c959f",
    500: "#6e7781",
    600: "#57606a",
    700: "#424a53",
    800: "#32383f",
    900: "#24292f",
  };

  const StyledTab = styled(Tab)`
    font-family: IBM Plex Sans, sans-serif;
    color: ${grey[900]};
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 600;
    background-color: transparent;
    width: 100%;
    padding: 10px 12px;
    margin: 6px 6px;
    border: none;
    border-radius: 7px;
    display: flex;
    justify-content: center;

    &:hover {
      background-color: ${blue[400]};
    }

    &:focus {
      color: #fff;
      outline: 3px solid ${blue[200]};
    }

    &.${tabClasses.selected} {
      background-color: #fff;
      outline: 3px solid ${blue[200]};
      color: ${blue[600]};
    }

    &.${buttonClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  const StyledTabsList = styled(TabsList)(
    ({ theme }) => `
        max-width: 250px;
        // background-color: ${grey[300]};
        background-color:
        border-radius: 12px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        align-content: space-between;
         box-shadow: 0px 4px 30px ${
           theme.palette.mode === "dark" ? grey[600] : grey[200]
         };
        `
  );

  useEffect(() => {
    // dispatch(
    //     getAppointmentList({
    //         doctor_id: "",
    //         patient_id: "",
    //         page: 1,
    //         limit: 10,
    //     })
    // );
    // dispatch(
    //     getInAppointmentList({
    //         page: 1,
    //         limit: 10,
    //         docName: "",
    //         ptName: "",
    //     })
    // );
    dispatch(getSpecialistDropdown());
    dispatch(
      getPatientList({
        page: 1,
        limit: 10,
        filterName: "",
      })
    );
    dispatch(
      getDoctorsList({
        page: 1,
        limit: 10,
        filterName: "",
      })
    );
  }, []);

  // useEffect(() => {
  //     if (appointmentList?.length === 0) {
  //         setRowsPerPage(10);
  //         setPage(0);
  //     }

  //     if (inAppointmentList?.length === 0) {
  //         setRowsPerPage(10);
  //         setPage(0);
  //     }
  // }, [pagination, inpagination]);

  return (
    <>
      <Box
        sx={{
          padding: "5px 0px",
          margin: "0px 0px 30px 0px",
        }}
      >
        <Tabs
          defaultValue={1}
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StyledTabsList>
            <StyledTab sx={{ textTransform: "capitalize" }} value={1}>
              Inhouse
            </StyledTab>
            <StyledTab sx={{ textTransform: "capitalize" }} value={0}>
              Cooperate
            </StyledTab>
          </StyledTabsList>
          <TabPanel value={1}>
            <AppointmentInTabPanel />
          </TabPanel>
          <TabPanel value={0}>
            <AppointmentCoTabPanel />
          </TabPanel>
        </Tabs>
      </Box>
    </>
  );
};

export default Appointment;
