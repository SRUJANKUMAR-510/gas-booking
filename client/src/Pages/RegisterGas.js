import React, { useEffect ,useRef} from "react";
import Navbar from "../Components/Navbar";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Dialog from "../Components/Dialog";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import getUserFromCache from "../Utils/getUserFromCache";
import axios from "axios";
import Slide from "@mui/material/Slide";

const RegisterGas = () => {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = React.useState(false);
    const [gastypes, setgastypes] = React.useState([]);
    const [gastype, setgastype] = React.useState([]);
    const [gasprovider, setgasprovider] = React.useState([]);
    const [selectedProvider, setselectedProvider] = React.useState("");
    const gas_type_ref = useRef();
    const handleClick = () => {
        
        const username = getUserFromCache();
        if (selectedProvider !== "") {
            setOpen(true);
            axios
                .post(process.env.REACT_APP_SERVER_URL + "/api/updateCompany", {
                    company: selectedProvider,
                    username: username,
                })
                .then((response) => console.log(response.data))
                .catch((error) => console.log(error));
        }
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        axios
            .get(process.env.REACT_APP_SERVER_URL + "/api/getGasCompanies")
            .then((res) => {
                console.log(res.data);
                setgasprovider(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .get(process.env.REACT_APP_SERVER_URL + "/api/getGasTypes")
            .then((res) => {
                console.log(res.data);
                setgastypes(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Navbar />
            <div
                className="container"
                style={{
                    display: "flex",
                    height: "80vh",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={gasprovider.map((option) => option.company_name)}
                    sx={{ width: 300 }}
                    onChange={(_, newValue) => {
                        const ele = gas_type_ref.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0];
                        if (ele) ele.click();
                        if (newValue != null) {
                            setselectedProvider(newValue);
                            setgastype(
                                gastypes
                                    .filter(
                                        (gas) => gas.company_name === newValue
                                    )
                                    .map(
                                        (gas) =>
                                            gas.gas_type +
                                            " (Rs." +
                                            gas.price +
                                            ")"
                                    )
                            );
                        } else {
                            setselectedProvider("");
                            setgastype([]);

                        }
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Company" />
                    )}
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    ref={gas_type_ref}
                    options={gastype}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Type"
                        />
                    )}
                />
                <Dialog
                    display_text="Register"
                    display_message="Are you Sure you want to register a new gas provider?"
                    success={() => {
                        handleClick();
                    }}
                />
                <Snackbar
                    open={open}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    TransitionComponent={(props) => (
                        <Slide {...props} direction="right" />
                    )}
                >
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        Registered new gas provider!
                    </Alert>
                </Snackbar>
            </div>
        </>
    );
};

export default RegisterGas;
