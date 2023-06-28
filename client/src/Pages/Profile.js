import { Box, Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import getUserFromCache from "../Utils/getUserFromCache";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import AnimatedNumber from "animated-number-react";

const Profile = () => {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const user = getUserFromCache();
    const [open, setOpen] = React.useState(false);
    const [companySpendings, setcompanySpendings] = useState([]);
    const [SpendingsTotal, setSpendingsTotal] = useState(0);
    const [TotalOrders, setTotalOrders] = useState(0);
    const [PendingOrders, setPendingOrders] = useState([]);
    const [userDetails, setuserDetails] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        phone_number: "",
        address: "",
        pincode: "",
    });
    useEffect(() => {
        axios
            .post(
                process.env.REACT_APP_SERVER_URL +
                "/api/getUserSpendingByCompany",
                { username: user }
            )
            .then((res) => {
                setcompanySpendings(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .post(process.env.REACT_APP_SERVER_URL + "/api/getTotalSpendings", {
                username: user,
            })
            .then((res) => {
                setSpendingsTotal(res.data.total_spendings);
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .post(process.env.REACT_APP_SERVER_URL + "/api/getTotalOrders", {
                username: user,
            })
            .then((res) => {
                setTotalOrders(res.data.total_orders);
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .post(process.env.REACT_APP_SERVER_URL + "/api/getProfile", {
                username: user,
            })
            .then((res) => {
                setuserDetails(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .post(process.env.REACT_APP_SERVER_URL + "/api/getPendingOrders", {
                username: user,
            })
            .then((res) => {
                console.log(res.data);
                setPendingOrders(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [user]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(process.env.REACT_APP_SERVER_URL + "/api/updateProfile", {
                username: userDetails.username,
                address: userDetails.address,
                pincode: userDetails.pincode,
            })
            .then((_) => {
                setOpen(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <Navbar />
            <Box
                sx={{
                    marginTop: "10px",
                    display: "flex",
                    minHeight: "85vh",
                }}
            >
                <div
                    style={{
                        minWidth: "25vw",
                        maxWidth: "25vw",
                        display: "flex",
                        padding: "10px",
                        flexDirection: "column",
                        alignItems: "center",
                        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                        borderRadius: "3px",
                        margin: "5px",
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        <b>Profile</b>
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="dense"
                            key={"username"}
                            label={"userame"}
                            type="text"
                            fullWidth
                            size="small"
                            value={userDetails["username"]}
                            disabled
                        />
                        <TextField
                            margin="dense"
                            key={"firstName"}
                            label={"First Name"}
                            type="text"
                            fullWidth
                            size="small"
                            value={userDetails["firstname"]}
                            disabled
                        />
                        <TextField
                            margin="dense"
                            key={"lastName"}
                            label={"Last Name"}
                            type="text"
                            fullWidth
                            size="small"
                            value={userDetails["lastname"]}
                            disabled
                        />
                        <TextField
                            margin="dense"
                            key={"email"}
                            label={"Email"}
                            type="text"
                            fullWidth
                            size="small"
                            value={userDetails["email"]}
                            disabled
                        />
                        <TextField
                            margin="dense"
                            key={"phone"}
                            label={"Phone"}
                            type="text"
                            fullWidth
                            size="small"
                            value={userDetails["phone_number"]}
                            disabled
                        />
                        <TextField
                            margin="dense"
                            key={"address"}
                            label={"Address"}
                            type="text"
                            fullWidth
                            size="small"
                            value={userDetails["address"]}
                            onChange={(e) =>
                                setuserDetails({
                                    ...userDetails,
                                    address: e.target.value,
                                })
                            }
                            required
                        />
                        <TextField
                            margin="dense"
                            key={"pincode"}
                            label={"Pincode"}
                            type="text"
                            fullWidth
                            size="small"
                            value={userDetails["pincode"]}
                            onChange={(e) =>
                                setuserDetails({
                                    ...userDetails,
                                    pincode: e.target.value,
                                })
                            }
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            style={{
                                width: "100%",
                                marginTop: "10px",
                            }}
                        >
                            Update
                        </Button>
                    </form>
                </div>
                <div
                    style={{
                        flexGrow: 1,
                        display: "flex",
                        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                        borderRadius: "3px",
                        margin: "5px",
                        marginLeft: "7px",
                    }}
                >
                    <Box
                        sx={{
                            height: "100%",
                            width: "100%",
                            paddingInline: "20px",
                            justifyContent: "space-around",
                            alignItems: "center",
                            flexWrap: "wrap",
                            display: "flex",
                            "& > :not(style)": {
                                m: 1,
                                width: 350,
                                height: 200,
                            },
                        }}
                    >
                        <Paper
                            elevation={4}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                padding: "10px",
                                alignItems: "center",
                                backgroundColor: "#ff595e",
                                borderRadius: "10px",
                            }}
                        >
                            <h3 style={{ color: "white" }}>
                                Spendings by company
                            </h3>
                            <hr style={{ width: "90%", marginTop: "3px" }} />
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    flexWrap: "wrap",
                                    marginLeft: "15px",
                                    width: "100%",
                                    maxHeight: "70%",
                                }}
                            >
                                {companySpendings.map((company) => {
                                    return (
                                        <p
                                            style={{
                                                color: "white",
                                                fontSize: "18px",
                                            }}
                                        >
                                            {company.company_name}: ₹
                                            {company.total_spending}
                                        </p>
                                    );
                                })}
                            </div>
                        </Paper>
                        <Paper
                            elevation={4}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                padding: "10px",
                                alignItems: "center",
                                backgroundColor: "#ffca3a",
                                borderRadius: "10px",
                            }}
                        >
                            <h3 style={{ color: "white" }}>Total Spendings</h3>
                            <hr style={{ width: "90%", marginTop: "3px" }} />
                            <br />
                            <h1>
                                ₹{" "}
                                <AnimatedNumber
                                    value={SpendingsTotal}
                                    formatValue={(n) => n.toFixed(0)}
                                />
                            </h1>
                        </Paper>
                        <Paper
                            elevation={4}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                padding: "10px",
                                alignItems: "center",
                                backgroundColor: "#8ac926",
                                borderRadius: "10px",
                            }}
                        >
                            <h3 style={{ color: "white" }}>Total Orders</h3>
                            <hr style={{ width: "90%", marginTop: "3px" }} />
                            <br />
                            <h1>
                                <AnimatedNumber
                                    value={TotalOrders}
                                    formatValue={(n) => n.toFixed(0)}
                                />
                            </h1>
                        </Paper>
                        <Paper
                            elevation={4}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#1982c4",
                                borderRadius: "10px",
                            }}
                        >
                            <h3 style={{ color: "white" }}>Pending Orders</h3>
                            <hr style={{ width: "90%", marginTop: "3px" }} />
                            <br />
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    flexWrap: "wrap",
                                    marginLeft: "15px",
                                    width: "100%",
                                    maxHeight: "70%",
                                }}
                            >
                                <h5 style={{ display: "flex" }}> ORDER ID</h5>

                                {PendingOrders.map((ordersh) => {
                                    return (
                                        <p
                                            style={{
                                                color: "white",
                                                fontSize: "18px",
                                            }}
                                        >
                                            {ordersh.order_id}
                                        </p>
                                    );
                                })}
                            </div>
                        </Paper>
                    </Box>
                </div>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                TransitionComponent={(props) => (
                    <Slide {...props} direction="left" />
                )}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Updated successfully!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Profile;
