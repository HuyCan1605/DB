import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import "../App.css";
const Page2 = (zone1, zone2) => {
  const getAvailabilityColor = (slotStatus) => {
    return slotStatus ? "green" : "red";
  };
  console.log(zone1);
  const renderParkingSlotsTable = (zone, zoneData) => (
    <Grid item xs={12} sm={6}>
      <TableContainer component={Paper}>
        <Typography gutterBottom>{`Tracking Parking Slots ${zone}`}</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Slot</TableCell>
              <TableCell>Slot Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {zoneData.map((row) => (
              <TableRow key={row.stt}>
                <TableCell>{row.stt}</TableCell>
                <TableCell>{row.slot}</TableCell>
                <TableCell>
                  <span
                    style={{
                      color: getAvailabilityColor(row.slotStatus),
                    }}
                  >
                    {row.slotStatus ? "Available" : "Parked"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
  return (
    <div className="centered">
      <Box
        sx={{
          margin: "1rem",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "1rem",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          style={{ color: "#66a3ff" }}
        >
          Tracking Parking Slots
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {renderParkingSlotsTable("Zone 1", zone1)}
        {renderParkingSlotsTable("Zone 2", zone2)}
      </Grid>
    </div>
  );
};
export default Page2;
