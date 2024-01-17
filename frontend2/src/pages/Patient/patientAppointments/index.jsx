import React, { useState, useEffect } from "react";
import axios from "axios";
import HPSideBar from "../../../components/HPSidebar/HPSidebar";
import "./appointmentSystem.css";

const PatientAppointmentSystem = () => {
  const [appointments, setAppointments] = useState([]);
  const patientId = "id1"; // Replace with the actual patient ID

  useEffect(() => {
    fetchAppointments();
  }, [patientId]); // Add walletAddress and patientId as dependencies

  const fetchAppointments = () => {
    axios
      .get(`http://localhost:3001/getAppointmentsByPatients/${patientId}`)
      .then((response) => {
        console.log(response.data);
        setAppointments(response.data);
      })
      .catch((error) => console.error("Error fetching appointments:", error));
  };

  return (
    <div className="display-prop">
      <HPSideBar />
      <table className="table-allah">
        <thead>
          <tr>
            <th>ID</th>
            <th>HCP Wallet Address</th>
            <th>Date</th>
            <th>Place</th>
            <th>Patient ID</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment._id}</td>
              <td>{appointment.hcpWalletAddress}</td>
              <td>{appointment.date}</td>
              <td>{appointment.place}</td>
              <td>{appointment.patientWalletAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div></div>
    </div>
  );
};

export default PatientAppointmentSystem;
