import React from 'react'
import Navbar from '../Components/Navbar'
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import Services from '../Components/Services';
import { useNavigate } from 'react-router-dom';

export default function Booking() {

  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Box
        sx={{
          marginLeft: "50px",
          marginRight: "50px",
          marginTop: "50px",
        }}
      >
        <Typography gutterBottom variant="h6" component="div">
          Services
        </Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-around"
          alignItems="center"
          sx={{
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <Services head={"Book LPG Gas Cylinder"} buttonHead={"Book"} onclick={() => {
            navigate("/bookforgas");
          }}/>
          <Services head={"Register New LPG Cylinder"} buttonHead={"Register"} onclick={() => {
            navigate("/RegisterGas");
          }} />
          <Services head={"Your Orders"} buttonHead={"View"} onclick={() => {
            navigate("/orderhistory");
          }}/>
        </Box>
      </Box>
      
    </>
  )
}
