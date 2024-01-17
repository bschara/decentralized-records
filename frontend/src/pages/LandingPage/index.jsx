// import LoginPage from "../LoginPage/loginPage";
import { Box, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import "./landingPage.css";

const LandingPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#28ceb2",
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Typography variant="h4">Decentralized Medical Records</Typography>
        <Typography maxWidth={"350px"}>
          The Decentralized Medical Record Project is a groundbreaking
          initiative to create a secure and privacy-focused system for storing
          and retrieving medical records. By leveraging blockchain technology,
          this project ensures that patient data remains owned by the client,
          and access is granted instantly with a clear audit trail.
        </Typography>
        <Stack spacing={2} alignItems="center" direction={"row"}>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/reqaccesspage">Access as a healthcare provider</Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LandingPage;
