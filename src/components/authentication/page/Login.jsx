import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SimpleInput from "../../../app/components/SimpleInput";
import { Avatar, InputLabel, Paper, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../features/LoginApi";
import { useNavigate } from "react-router-dom";
import Logo from "../../../app/assets/images/healthyHubLogo.png";
import { ToastContainer } from "react-toastify";
import {
    errorAlert,
    successAlert,
} from "../../../app/components/Alert/ToastAlertBox";
import SnackbarAlert from "../../../app/components/Alert/SnackBarAlert";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                TeleMedicine
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export default function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const { status } = useSelector((state) => state.loginInfo);

    //for alert
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState("");
    //end
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const showPasswordHandler = () => {
        setShowPassword(!showPassword);
    };
    const showAlert = (msg, typeAlert) => {
        setOpenSnackBar(true);
        setMessage(msg);
        setType(typeAlert);
    };
    const valid = Boolean(email) && Boolean(password);
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password,
        };
        if (!valid) {
            showAlert("Email and Password is required!", "error");
        } else {
            dispatch(getToken({ data }))
                .unwrap()
                .then((result) => {
                    if (result.data) {
                        navigate("/");
                    } else {
                        showAlert(result.message, "error");
                    }
                });
        }
    };

    return (
        <>
            <SnackbarAlert
                openSnackBar={openSnackBar}
                setOpenSnackBar={setOpenSnackBar}
                message={message}
                type={type}
            />
            <Container component="main" maxWidth="xs" sx={{ marginTop: "10%" }}>
                <CssBaseline />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Paper
                        sx={{
                            width: 500,
                            padding: 4,
                            borderRadius: "10px",
                        }}
                    >
                        <Stack justifyContent={"center"} alignItems={"center"}>
                            <Avatar
                                alt="HealthyHubLogo"
                                src={Logo}
                                sx={{ width: 94, height: 94 }}
                                variant="square"
                            />
                            <Typography
                                color={"primary"}
                                textTransform={"uppercase"}
                                variant="h1"
                            >
                                Sign in
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                noValidate
                                sx={{ mt: 1, width: "100%" }}
                            >
                                <Stack
                                    spacing={2}
                                    sx={{ width: "100%", mt: 1 }}
                                >
                                    <Box sx={{ mb: 1 }}>
                                        <InputLabel sx={{ mb: 1 }}>
                                            {" "}
                                            Email*
                                        </InputLabel>
                                        <SimpleInput
                                            placeholder="Email"
                                            autoFocus
                                            fullwidth
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                        />
                                    </Box>
                                    <Box sx={{ mb: 1 }}>
                                        <InputLabel sx={{ mb: 1 }}>
                                            {" "}
                                            Password*
                                        </InputLabel>
                                        <SimpleInput
                                            required
                                            fullwidth
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            placeholder="Password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            endAdornment={
                                                showPassword ? (
                                                    <Box
                                                        onClick={
                                                            showPasswordHandler
                                                        }
                                                        sx={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <VisibilityIcon />
                                                    </Box>
                                                ) : (
                                                    <Box
                                                        onClick={
                                                            showPasswordHandler
                                                        }
                                                        sx={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <VisibilityOffIcon />
                                                    </Box>
                                                )
                                            }
                                        />
                                    </Box>
                                </Stack>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="remember"
                                            color="primary"
                                        />
                                    }
                                    label="Remember me"
                                />
                                {status === "pending" ? (
                                    <Button
                                        type="submit"
                                        fullWidth
                                        disabled
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        color="primary"
                                    >
                                        Loading
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        color="primary"
                                    >
                                        Sign In
                                    </Button>
                                )}

                                <Grid container>
                                    <Grid item>
                                        <Link href="/register" variant="body2">
                                            Create an Account?
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Stack>
                    </Paper>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </>
    );
}
