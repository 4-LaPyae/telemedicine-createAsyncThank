import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const AppointmentListCard = ({ appointments }) => {
    return (
        <div>
            <Card
                sx={{
                    minWidth: 345,
                    minHeight: 150,
                    background: "linear-gradient(to right, #90FCF9, #21d4fd)",
                    color: "#grey",
                }}
            >
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div">
                        Appointments
                    </Typography>
                    <Stack
                        direction="row"
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <CalendarMonthIcon
                            sx={{
                                fontSize: "62px",
                            }}
                        />
                        <Box>
                            <Stack
                                alignItems={"center"}
                                justifyContent={"center"}
                                spacing={1}
                            >
                                <Typography variant="h3" color="text.secondary">
                                    Total
                                </Typography>
                                <Typography variant="h1" fontWeight="bold">
                                    {appointments.total ?? 0}
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </div>
    );
};

export default AppointmentListCard;
