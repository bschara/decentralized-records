import SideBar from "../../../components/sidebar/SideBar.jsx";
import "./mainDashboard.css";
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "./components/header.jsx";

const MainDashboard = () => {
  return (
    <>
      <div className="head-page">
        <SideBar />
        <div className="header-component">
          <Header />
        </div>
      </div>
      <Accordion style={{ width: "400px", marginLeft: "27rem" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Diagnoses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This is the content of the accordion. You can add any React
            components or text here.
          </Typography>
        </AccordionDetails>
      </Accordion>{" "}
      <Accordion style={{ width: "400px" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Prescriptions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This is the content of the accordion. You can add any React
            components or text here.
          </Typography>
        </AccordionDetails>
      </Accordion>{" "}
      <Accordion style={{ width: "400px" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Lab Results</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This is the content of the accordion. You can add any React
            components or text here.
          </Typography>
        </AccordionDetails>
      </Accordion>{" "}
      <Accordion style={{ width: "400px" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Medical Images</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This is the content of the accordion. You can add any React
            components or text here.
          </Typography>
        </AccordionDetails>
      </Accordion>{" "}
      <Accordion style={{ width: "400px" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Treatment History</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This is the content of the accordion. You can add any React
            components or text here.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default MainDashboard;
