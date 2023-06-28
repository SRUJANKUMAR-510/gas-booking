import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
//import Dialog from "../Components/Dialog";
import { useNavigate } from "react-router-dom";
import HomePageNavbar from "../Components/HomePageNavbar";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";

export default function ForgotPas() {
    // const Alert = React.forwardRef(function Alert(props, ref) {
    //     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    //   });
    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    //const [open, setOpen] = React.useState(false);
    // const handleClose = () => {
    //     setOpen(false);
    // };
    const handleClick = () => {
        console.log(username, password, email);
        axios
            .post(process.env.REACT_APP_SERVER_URL + "/api/updatepassword", {
                username,
                password,
                email,
            })
            .then((res) => {
                console.log(res.data);
                navigate("/login");
                // setOpen(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <HomePageNavbar head="Login" link = "/login"/>
            <Box
                component="form"
                sx={{
                    backgroundColor: "white",
                    marginInline: "25vw",
                    display: "flex",
                    marginTop: "5vh",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: "10px",
                    padding: "30px",
                    "& > :not(style)": {
                        m: 1,
                        width: "25ch",
                        marginTop: "20px",
                    },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-basic"
                    label="username"
                    variant="outlined"
                    onChange={(newValue) => {
                        setUsername(newValue.target.value);
                    }}
                />
                <TextField
                    id="outlined-basic"
                    label="Email Id"
                    variant="outlined"
                    onChange={(newValue) => {
                        setEmail(newValue.target.value);
                    }}
                />
                <TextField
                    id="outlined-basic"
                    label="New Password"
                    variant="outlined"
                    onChange={(newValue) => {
                        setPassword(newValue.target.value);
                    }}
                />
                <Button
                    variant="contained"
                    color="success"
                    sx={{
                        marginTop: "20px",
                    }}
                    onClick={handleClick}
                >
                    change password
                </Button>
            </Box>
            {/* <Snackbar
                    open={open}
                    autoHideDuration={4000}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        successfully changed
                    </Alert>
                </Snackbar> */}
        </div>
    );
}
