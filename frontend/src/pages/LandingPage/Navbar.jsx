import React from "react";
// import Logo from "../../assets/landing.jpg";
// import "./landingPage.css";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";

// import Logo from 'decentralized-records/frontend/src/assets';

export const Navbar = () => (
  <Stack
    direction="row"
    justifyContent="space-around"
    sx={{
      gap: { sm: "123px", xs: "40px" },
      mt: { sm: "32px", xs: "20px" },
      justifyContent: "none",
    }}
    px="20px"
  >
    {/* <Link to="/">
      <img src={Logo} alt="logo" style={{ width: '48px', height: '48px', margin: '0px 20px' }} />
    </Link> */}
    <Stack
      direction="row"
      gap="40px"
      fontFamily="Alegreya"
      fontSize="24px"
      alignItems="flex-end"
    >
      <Link
        to="/login"
        style={{
          textDecoration: "none",
          color: "#3A1212",
          // borderBottom: '3px solid #FF2625'
        }}
        underline={"hover"}
      >
        Login
      </Link>
      <Link to="/signup" style={{ textDecoration: "none", color: "#3A1212" }}>
        {"Signup"}
      </Link>
    </Stack>
  </Stack>
);

// export default Navbar;
