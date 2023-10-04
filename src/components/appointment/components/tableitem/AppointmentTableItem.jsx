import React from "react";
import { Avatar, Stack, TableCell, TableRow, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AppointmentTableItem = ({ item }) => {
  console.log({ item });

  const deleteHandler = (e, id) => {
    console.log(id);
  };

  return (
    <TableRow key={item._id}>
      <TableCell align="center">{item.token}</TableCell>
      <TableCell align="left">
        {item.patient.firstName} {item.patient.lastName}
      </TableCell>
      <TableCell align="left">
        {item.doctor.firstName} {item.doctor.lastName}
      </TableCell>

      <TableCell align="center">
        <Chip
          label={item.status === "ACCEPT" ? "EXAMINING" : item.status}
          color={
            item.status == "PENDING"
              ? "warning"
              : item.status == "COMPLETE"
              ? "success"
              : item.status == "DENIED"
              ? "error"
              : "info"
          }
        />
      </TableCell>
      <TableCell align="center">{item.requestTime}</TableCell>
      <TableCell>
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={2}
        >
          {/* <EditIcon
            // onClick={(e) => updateHandler(e, item._id)}
            sx={{ color: "blue", cursor: "pointer" }}
          /> */}
          {/* <DeleteIcon
            onClick={(e) => deleteHandler(e, item._id)}
            sx={{ color: "red", cursor: "pointer" }}
          /> */}
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default AppointmentTableItem;
