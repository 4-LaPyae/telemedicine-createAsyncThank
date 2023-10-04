import {
    Avatar,
    FormControlLabel,
    Stack,
    Switch,
    TableCell,
    TableRow,
} from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteAdmin, getAdminList } from "../features/SystemAdminApi";
import { useDispatch } from "react-redux";
import { setUpdateAdmin } from "../features/SystemAdminSlice";
import AdminAlertBox from "./AdminAlertBox";

const AdminTableItem = ({ item, setIsDrawerOpen }) => {
    const [openAlert, setOpenAlert] = useState(false);
    const [checked, setChecked] = useState(item.status ? true : false);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const updateHandler = (e, id) => {
        e.preventDefault();
        dispatch(setUpdateAdmin(item));
        setIsDrawerOpen(true);
    };

    const deleteHandler = (e) => {
        e.preventDefault();
        setOpenAlert(true);
    };

    return (
        <>
            <TableRow>
                <TableCell>
                    <Avatar
                        sx={{ width: 40, height: 40, margin: "0 auto" }}
                        variant='rounded'
                        src={item.profile}
                        alt='admin'
                    >
                        {item.firstName.charAt(0).toUpperCase()}
                    </Avatar>
                </TableCell>
                <TableCell align='center'>
                    {item.firstName} {item.lastName}
                </TableCell>
                <TableCell align='center'>{item.email}</TableCell>
                <TableCell align='center'>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={checked}
                                onChange={handleChange}
                                color='success'
                            />
                        }
                    />
                </TableCell>
                <TableCell>
                    <Stack
                        direction={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        spacing={2}
                    >
                        <EditIcon
                            onClick={(e) => updateHandler(e, item._id)}
                            sx={{ color: "blue", cursor: "pointer" }}
                        />
                        <DeleteIcon
                            onClick={deleteHandler}
                            sx={{ color: "red", cursor: "pointer" }}
                        />
                    </Stack>
                </TableCell>
            </TableRow>
            <AdminAlertBox
                item={item}
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
            />
        </>
    );
};

export default AdminTableItem;
