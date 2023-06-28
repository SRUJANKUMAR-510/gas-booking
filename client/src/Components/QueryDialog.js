import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import axios from "axios";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function QueryDialog({ open, handleClose }) {
  const [value, setValue] = React.useState("SELECT * FROM customer;");
  const [output, setOutput] = React.useState("Answer will be displayed here");
  const [errorOutput, seterrorOutput] = React.useState(true);

  const handleRunQuery = () => {
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/api/runQuery", {
        query: value,
      })
      .then((response) => {
        seterrorOutput(false);
        if (Array.isArray(response.data)) {
          setOutput(response.data);
        } else {
          setOutput([response.data]);
        }
      })
      .catch((error) => {
        setOutput(error.response.data.error);
        seterrorOutput(true);
      });
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
            >
              Query Box
            </Typography>
          </Toolbar>
        </AppBar>
        <div
          style={{
            padding: "30px",
            minWidth: "100%",
            position: "relative",
            marginTop: "15px",
          }}
        >
          <TextField
            id="filled-multiline-static"
            label="Query"
            multiline
            rows={4}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            sx={{
              width: "100%",
            }}
          />
          <Fab
            variant="extended"
            size="small"
            color="secondary"
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              width: "90px",
            }}
            onClick={handleRunQuery}
          >
            <PlayArrowRoundedIcon sx={{ mr: 1 }} />
            Run
          </Fab>
        </div>
        <div
          style={{
            paddingInline: "30px",
            minWidth: "100%",
            marginTop: "15px",
            marginBottom: "15px",
          }}
        >
          <Box
            sx={{
              minWidth: "100%",
              maxWidth: "100%",
              color: "black",
              borderRadius: "5px",
              border: "1px solid #3f51b5",
              minHeight: "270px",
              padding: "10px",
              overflowX: "auto",
            }}
          >
            {errorOutput ? (
              <p
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                {output}
              </p>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr key={'head'}>
                    {Object.keys(output[0]).map((key) => {
                      return <th key={key}>{key}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {output.map((row,index) => {
                    return (
                      <tr key={index}>
                        {Object.keys(row).map((key) => {
                          return <td key={key}>{row[key]}</td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </Box>
        </div>
      </Dialog>
    </div>
  );
}
