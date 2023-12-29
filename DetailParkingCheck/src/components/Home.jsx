import {Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "../App.css";
const Home = () => {
  return (
      <>
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '1rem',
          borderRadius: '4px',
        }}
      >
      <Typography variant="h4" component="h1" gutterBottom style={{color: "#66a3ff"}} >
        Smart Parking System
      </Typography>
  
        <Button variant="contained" component={Link} to="/Parking_check">
          Check
        </Button>
        <Typography variant="h6" component="h4" gutterBottom style={{color: "#66a3ff"}} >
        “Press check to look for available parking spots”
      </Typography>
        </Box>
        </>
  );
};

export default Home;
