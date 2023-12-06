import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="container">
      <div className="sidebar">
        <h2>Decentralized Medical Records</h2>
        <ul>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/fileupload">Upload Files</a>
          </li>
          <li>
            <a href="#">Appointments</a>
          </li>
          <li>
            <a href="/PatientProfile">Profile</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
