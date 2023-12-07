// import LoginPage from "../LoginPage/loginPage";
import image from "../../assets/landing.jpg";
// import "./landingPage.css";
import { Box } from "@mui/material";
import { Navbar } from "../LandingPage/Navbar";
import { HeroBanner } from "./HeroBanner";

const LandingPage = () => {
  return (
    <Box>
      <Navbar />
      <HeroBanner />
    </Box>
  );
};

export default LandingPage;
