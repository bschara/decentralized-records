import React, { useState, useEffect } from "react";
import axios from "axios";
import HPSideBar from "../../../components/HPSidebar/HPSidebar";
import "./appointmentSystem.css";

const AppointmentSystem = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    hcpWalletAddress: "",
    date: "",
    place: "",
    patientWalletAddress: "",
    healthcareProfessional: "",
  });
  const walletAddress = process.env.ADDRESS2;

  useEffect(() => {
    fetchAppointments();
  }, [walletAddress]);

  const fetchAppointments = () => {
    // Use the correct route for fetching appointments by patient ID
    axios
      .get(`http://localhost:3001/getAppointmentsByHCP/${walletAddress}`)
      .then((response) => {
        console.log(response.data);
        setAppointments(response.data);
      })
      .catch((error) => console.error("Error fetching appointments:", error));
  };

  const handleAdd = () => {
    axios
      .post("http://localhost:3001/addAppointment", newAppointment)
      .then(() => {
        setNewAppointment({
          hcpWalletAddress: "",
          date: "",
          place: "",
          patientWalletAddress: "",
          healthcareProfessional: "",
        });
        fetchAppointments(); // Fetch appointments after adding a new one
      })
      .catch((error) => console.error("Error adding appointment:", error));
  };
  const handleUpdate = (id) => {
    const appointmentToUpdate = appointments.find(
      (appointment) => appointment._id === id
    );
    if (appointmentToUpdate) {
      axios
        .put(`/api/appointments/${id}`, appointmentToUpdate)
        .then((response) => {
          console.log("Appointment updated successfully!", response.data);
          // Update the state
          const updatedAppointments = appointments.map((app) =>
            app._id === id ? response.data : app
          );
          setAppointments(updatedAppointments);
        })
        .catch((error) => console.error("Error updating appointment:", error));
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        console.log("Appointment deleted successfully!");
        // Update the state
        const updatedAppointments = appointments.filter(
          (appointment) => appointment._id !== id
        );
        setAppointments(updatedAppointments);
      })
      .catch((error) => console.error("Error deleting appointment:", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prevState) => ({ ...prevState, [name]: value }));
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
            <th>Actions</th>
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
              <td>
                <button onClick={() => handleUpdate(appointment._id)}>
                  Update
                </button>
                <button onClick={() => handleDelete(appointment._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Add New Appointment</h2>
        <input
          type="text"
          name="hcpWalletAddress"
          placeholder="HCP Wallet Address"
          value={newAppointment.hcpWalletAddress}
          onChange={handleChange}
        />
        <input
          type="text"
          name="date"
          placeholder="Date"
          value={newAppointment.date}
          onChange={handleChange}
        />
        <input
          type="text"
          name="place"
          placeholder="Location"
          value={newAppointment.place}
          onChange={handleChange}
        />
        <input
          type="text"
          name="patientWalletAddress"
          placeholder="Patient ID"
          value={newAppointment.patientWalletAddress}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Add Appointment</button>
      </div>
    </div>
  );
};

export default AppointmentSystem;
