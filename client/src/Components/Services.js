import * as React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

export default function Services({ head, buttonHead ,onclick}) {
    return (
        <Card
            elevation={6}
            sx={{
                minWidth: "300px",
                padding: "10px",
                backgroundColor: "#D3F4DE",
                borderRadius: "10px",
                marginTop: "3px",
            }}
        >
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {head}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="success"
                    sx={{
                        width: "100px"
                    }}

                    onClick={onclick}
                >
                    {buttonHead}
                </Button>
            </CardActions>
        </Card>
    );
}
