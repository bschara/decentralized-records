import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="container">
      <div className="sidebar">
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
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
