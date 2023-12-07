// import LoginPage from "../LoginPage/loginPage";
import { Box, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import image from "../../assets/landing.jpg";
import "./landingPage.css";

const LandingPage = () => {
  return (
    // <div className="whole-page">
    //   <div className="main">
    //     <body>
    //       <p className="title">Decentralized medical records</p>
    //       <div className="middle-component">
    //         <img src={image} alt="records storage" className="landing-image" />
    //         <p className="description">
    //           The Decentralized Medical Record Project is a groundbreaking
    //           initiative to create a secure and privacy-focused system for
    //           storing and retrieving medical records. By leveraging blockchain
    //           technology, this project ensures that patient data remains owned
    //           by the client, and access is granted instantly with a clear audit
    //           trail.
    //         </p>

    //         <a href="/login">Already have an account ? Sign in </a>
    //         <a href="/signup">Already have an account ? Sign up</a>
    //         <a href="/requestAccess">access as a helathcare provider</a>
    //       </div>
    //     </body>
    //   </div>
    // </div>

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
          <Link to="/requestAccess">Access as a healthcare provider</Link>
        </Stack>
      </Stack>
    </Box>

    // <Box
    //   sx={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: "100vh",
    //     backgroundColor: "#28ceb2",
    //   }}
    // >
    //   <Stack spacing={2} alignItems="center">
    //     <Typography variant="h4">Login</Typography>
    //     <Button
    //       onClick={requestWalletAddress}
    //       variant="contained"
    //       color="primary"
    //     >
    //       Connect Wallet (MetaMask)
    //     </Button>
    //     <div>
    //       {walletAddress && <p>Connected Wallet Address: {walletAddress}</p>}
    //     </div>
    //     <Button onClick={handleLogin} variant="contained" color="primary">
    //       Login
    //     </Button>
    //   </Stack>
    // </Box>
  );
};

export default LandingPage;
