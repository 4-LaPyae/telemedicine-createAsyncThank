import React from "react";
import { Box } from "@mui/material";
import Tabs from "@mui/base/Tabs";
import TabsList from "@mui/base/TabsList";
import TabPanel from "@mui/base/TabPanel";
import Tab, { tabClasses } from "@mui/base/Tab";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDoctorsList, getInhouseDoctorsList } from "../features/DoctorApi";
import { buttonClasses } from "@mui/base/Button";
import styled from "@emotion/styled";
import { getSpecialistDropdown } from "../../specialize/features/SpecialistApi";
import DoctorCoTabPanel from "../components/tab/DoctorCoTabPanel";
import DoctorInTabPanel from "../components/tab/DoctorInTabPanel";

const Doctors = () => {
    const [cooperate, setCooperate] = useState("COOPERATE");
    const [inhouse, setInhouse] = useState("INHOUSE");

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

    //Call CoDoctor list and InDoctor list
    useEffect(() => {
        dispatch(
            getInhouseDoctorsList({
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

        dispatch(getSpecialistDropdown());
    }, []);

    //Call CoDoctor list and InDoctor list

    return (
        <>
            <Box
                sx={{
                    // width: "300px",
                    padding: "5px 0px",
                    margin: "0px 0px 30px 0px",
                }}
            >
                <Tabs defaultValue={inhouse}>
                    <StyledTabsList>
                        <StyledTab
                            sx={{ textTransform: "capitalize" }}
                            value={inhouse}
                        >
                            Inhouse
                        </StyledTab>
                        <StyledTab
                            sx={{ textTransform: "capitalize" }}
                            value={cooperate}
                        >
                            Cooperate
                        </StyledTab>
                    </StyledTabsList>

                    <TabPanel value={inhouse}>
                        <DoctorInTabPanel type={inhouse} />
                    </TabPanel>
                    <TabPanel value={cooperate}>
                        <DoctorCoTabPanel type={cooperate} />
                    </TabPanel>
                </Tabs>
            </Box>
        </>
    );
};

export default Doctors;
