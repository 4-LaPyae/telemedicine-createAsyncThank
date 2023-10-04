import React from "react";
import { Typography, Box, Modal, Stack } from "@mui/material";
import MkButton from "../../../app/assets/theme/MkButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteAdmin, getAdminList } from "../features/SystemAdminApi";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    padding: "30px 10px",
    borderRadius: "10px",
};

const AdminAlertBox = ({ openAlert, setOpenAlert, item }) => {
    const { deleteLoading } = useSelector((state) => state.SystemAdminSlice);
    const dispatch = useDispatch();
    const handleClose = () => setOpenAlert(false);
    const deleteHandler = (e) => {
        e.preventDefault();
        dispatch(deleteAdmin({ admin_id: item._id }))
            .unwrap()
            .then((result) => {
                if (!result.error) {
                    dispatch(getAdminList());
                    setOpenAlert(false);
                }
            });
    };

    return (
        <Modal open={openAlert} onClose={handleClose}>
            <Box sx={style}>
                <Typography
                    id='modal-modal-description'
                    sx={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        mb: 1,
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    Delete
                </Typography>
                <Typography
                    id='modal-modal-description'
                    sx={{
                        fontSize: "15px",
                        mb: 3,
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    Are you sure want to delete?
                </Typography>
                <Stack
                    direction='row'
                    justifyContent='flex-start'
                    alignItems='center'
                    spacing={2}
                >
                    <MkButton
                        fullWidth
                        variant='outlined'
                        mkcolor='linear-gradient(310deg, #2152ff, #02c6f3)'
                        onClick={handleClose}
                    >
                        Cancel
                    </MkButton>

                    <MkButton
                        disabled={deleteLoading ? true : false}
                        fullWidth
                        variant='outlined'
                        mkcolor='linear-gradient(310deg, #2152ff, #02c6f3)'
                        onClick={deleteHandler}
                    >
                        {deleteLoading ? "Deleting" : "Delete"}
                    </MkButton>
                </Stack>
            </Box>
        </Modal>
    );
};

export default AdminAlertBox;
