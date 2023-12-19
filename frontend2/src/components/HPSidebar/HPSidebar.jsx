// import "./HPSideBar.css";

const HPSideBar = () => {
  return (
    <div className="container">
      <div className="sidebar">
        <h2>Decentralized Medical Records</h2>
        <ul>
          <li>
            <a href="/hpdashboard">Dashboard</a>
          </li>
          <li>
            <a href="/hpuploadfile">Upload Files</a>
          </li>
          <li>
            <a href="#">Appointments</a>
          </li>
          <li>
            <a href="/emergencyAccess">Emergency Portal</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HPSideBar;
