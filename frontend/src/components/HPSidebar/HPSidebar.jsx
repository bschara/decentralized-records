// import "./HPSideBar.css";

const HPSideBar = () => {
  return (
    <div className="container">
      <div className="sidebar">
        <ul>
          <li>
            <a href="/hpdashboard">Dashboard</a>
          </li>
          <li>
            <a href="/hpuploadfile">Upload Files</a>
          </li>
          <li>
            <a href="/appointmentSystem">Appointments</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HPSideBar;
