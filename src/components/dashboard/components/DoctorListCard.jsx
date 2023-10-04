import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Stack,
    Typography,
} from "@mui/material";
import PortraitIcon from "@mui/icons-material/Portrait";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";

export const DoctorListCard = ({ doctors }) => {
    return (
        <Card
            sx={{
                minWidth: 345,
                minHeight: 150,
                background: "linear-gradient(to right, #21d4fd, #90FCF9)",
                color: "#grey",
            }}
        >
            <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                    Active Doctor
                </Typography>
                <Stack
                    direction="row"
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <FontAwesomeIcon
                        icon={faUserDoctor}
                        style={{ fontSize: "62px" }}
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
                            <Typography variant="h1" fontWeight={"bold"}>
                                {doctors?.total}
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};
