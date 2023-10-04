import { Box, Divider, InputLabel, Stack } from "@mui/material";
import React from "react";
import MkAutoComplete from "../../../../app/components/MkAutoComplete";
import { useState } from "react";
import ScheduleBody from "./ScheduleBody";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDoctorDetail } from "../../features/DoctorApi";

const SheduleTabView = ({ id, type }) => {
    const { doctorsDetail, getDetailStatus } = useSelector(
        (state) => state.DoctorSlice
    );
    const dispatch = useDispatch();
    const [gap, setGap] = useState(null);
    const [meetingTime, setMettingTime] = useState(null);
    const gapData = [
        "5 minutes",
        "10 minutes",
        "15 minutes",
        "20 minutes",
        "25 minutes",
        "30 minutes",
        "1 hour",
    ];
    const meetingData = [
        "5 minutes",
        "10 minutes",
        "15 minutes",
        "20 minutes",
        "25 minutes",
        "30 minutes",
        "1 hour",
        "1.5 hours",
        "2 hours",
    ];

    useEffect(() => {
        dispatch(getDoctorDetail({ type, id, page: 1, limit: 10 }))
            .unwrap()
            .then((res) => {
                if (res.data.doctorSession) {
                    setGap(`${res.data.doctorSession.sessionGap} minutes`);
                    setMettingTime(
                        `${res.data.doctorSession.sessionMeetingTime} minutes`
                    );
                }
            });
    }, []);
    return (
        <>
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                spacing={2}
                sx={{ padding: 2 }}
            >
                <Box width={"100%"}>
                    <InputLabel sx={{ mb: 1 }}>Schedule Gap : *</InputLabel>
                    <MkAutoComplete
                        fullWidth
                        label="Shedule Gap"
                        name="schedule gap"
                        placeholder="Select Schedule Gap"
                        options={gapData}
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) =>
                            option === value
                        }
                        onChange={(event, newValue) => {
                            setGap(newValue);
                        }}
                        value={gap}
                    />
                </Box>
                <Box width={"100%"}>
                    <InputLabel sx={{ mb: 1 }}>
                        Schedule Meeting Time : *
                    </InputLabel>
                    <MkAutoComplete
                        fullWidth
                        label="Shedule Gap"
                        name="schedule gap"
                        placeholder="Select Schedule Gap"
                        options={meetingData}
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) =>
                            option === value
                        }
                        onChange={(event, newValue) => {
                            setMettingTime(newValue);
                        }}
                        value={meetingTime}
                    />
                </Box>
            </Stack>
            <Box sx={{ padding: 2 }}>
                <ScheduleBody
                    gap={gap}
                    meetingTime={meetingTime}
                    status={getDetailStatus}
                    doctorsDetail={doctorsDetail}
                />
            </Box>
        </>
    );
};

export default SheduleTabView;
