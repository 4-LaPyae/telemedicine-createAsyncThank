import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import MkButton from "../../../app/assets/theme/MkButton";
import { useDispatch, useSelector } from "react-redux";
import { deletePatient, getPatientList } from "../features/PatientApi";

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

export default function PatientAlertBox({ openAlert, setOpenAlert, item }) {
    const dispatch = useDispatch();
    const { status, pagination } = useSelector((state) => state.patientSlice);
    // console.log(pagination);
    const handleClose = () => setOpenAlert(false);
    const deleteHandlar = () => {
        dispatch(deletePatient(item._id));
        setOpenAlert(false);
    };
    return (
        <Modal
            open={openAlert}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography
                    id="modal-modal-description"
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
                    id="modal-modal-description"
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
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                >
                    <MkButton
                        fullWidth
                        variant="outlined"
                        mkcolor="linear-gradient(310deg, #2152ff, #02c6f3)"
                        disabled={status === "loading" ? true : false}
                        onClick={() => handleClose()}
                    >
                        Cancel
                    </MkButton>
                    {status === "loading" ? (
                        <MkButton
                            fullWidth
                            variant="outlined"
                            mkcolor="linear-gradient(310deg, #2152ff, #02c6f3)"
                            disabled
                        >
                            Deleting
                        </MkButton>
                    ) : (
                        <MkButton
                            fullWidth
                            variant="outlined"
                            mkcolor="linear-gradient(310deg, #2152ff, #02c6f3)"
                            onClick={() => deleteHandlar()}
                        >
                            Delete
                        </MkButton>
                    )}
                </Stack>
            </Box>
        </Modal>
    );
}
