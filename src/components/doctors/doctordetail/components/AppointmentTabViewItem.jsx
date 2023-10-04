import { Chip, Stack, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";

const AppointmentTabViewItem = ({ item }) => {
  // console.log(item);
  return (
    <>
      <TableRow key={item._id}>
        <TableCell align="center">
          <Typography>{item.token}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>
            {item.patient.firstName} {item.patient.lastName}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>{item.patient.phone}</Typography>
        </TableCell>
        <TableCell align="center">
          <Chip label={item.status} color="success" />
        </TableCell>
        <TableCell align="center">
          <Typography>{item.consultantTime}</Typography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AppointmentTabViewItem;
