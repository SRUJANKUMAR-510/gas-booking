import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);    
    };

    return (
        <div>
            <Button
                variant="contained"
                color="success"
                sx={{
                    width: "100px",
                    height: "50px",
                }}
                {...props}
                onClick={handleClickOpen}
            >
                {props.display_text}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.display_message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(handleClose)}>cancle</Button>
                    <Button onClick={() => {
                        handleClose();
                        props.success();
                    }} autoFocus>
                        Proceed
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
