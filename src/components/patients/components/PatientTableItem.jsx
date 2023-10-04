import { Avatar, Stack, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { updatePatinetHandalar } from "../features/PatientSlice";
import { Switch, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PatientAlertBox from "./PatientAlertBox";

const PatientTableItem = ({ item, setOpenDrawer }) => {
    // console.log(item);
    const [checked, setChecked] = useState(true);
    const [openAlet, setOpenAlert] = useState(false);
    const navigate = useNavigate();
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const dispatch = useDispatch();
    const handleDrawerOpen = (e, item) => {
        console.log(item);
        e.preventDefault();
        dispatch(updatePatinetHandalar(item));
        setOpenDrawer(true);
    };
    const showAlertHandlar = () => {
        setOpenAlert(true);
    };

    const patientDetailHandlar = () => {
        navigate(
            `/patients/${(item.firstName + item.lastName).replace(/\s/g, "")}`,
            {
                state: {
                    data: item,
                },
            }
        );
    };
    if (item.status === 0) setChecked(false);

    return (
        <>
            <TableRow key={item._id}>
                <TableCell align="center">
                    <Avatar
                        sx={{
                            width: 40,
                            height: 40,
                            margin: "0 auto",
                            cursor: "pointer",
                        }}
                        variant="rounded"
                        src={item.profile}
                        alt="doctor"
                        onClick={patientDetailHandlar}
                    >
                        {item.firstName.charAt(0).toUpperCase()}
                    </Avatar>
                </TableCell>
                <TableCell align="center">
                    {item.firstName} {item.lastName}
                </TableCell>
                <TableCell align="center">{item.email || "N/A"}</TableCell>
                <TableCell align="center">{item.phone}</TableCell>
                <TableCell align="center">{item.dob}</TableCell>
                <TableCell align="center">{item.gender}</TableCell>
                <TableCell align="center">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={checked}
                                onChange={handleChange}
                                color="success"
                            />
                        }
                    />
                </TableCell>

                <TableCell align="center">
                    <Stack
                        direction={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        spacing={2}
                    >
                        <EditIcon
                            sx={{ color: "blue", cursor: "pointer" }}
                            onClick={(e) => handleDrawerOpen(e, item)}
                        />
                        <DeleteIcon
                            sx={{ color: "red", cursor: "pointer" }}
                            onClick={() => showAlertHandlar()}
                        />
                    </Stack>
                </TableCell>
            </TableRow>
            <PatientAlertBox
                item={item}
                setOpenAlert={setOpenAlert}
                openAlert={openAlet}
            />
        </>
    );
};

export default PatientTableItem;
