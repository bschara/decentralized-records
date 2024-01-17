import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="container">
      <div className="sidebar">
        <ul>
          <li>
            <a href="/patientDashboard">Dashboard</a>
          </li>
          <li>
            <a href="/patientFileUpload">Upload Files</a>
          </li>
          <li>
            <a href="/patientAccessRequests">Access Requests</a>
          </li>
          <li>
            <a href="/patientappointmentSystem">Appointments</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
