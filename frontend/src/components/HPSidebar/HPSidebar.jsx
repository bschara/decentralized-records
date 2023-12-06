import "./HPSideBar.css";

const HPSideBar = () => {
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
            <a href="#">Emergency Portal</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HPSideBar;
