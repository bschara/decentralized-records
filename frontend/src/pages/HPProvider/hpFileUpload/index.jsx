import FileUploadComponent from "./fileUploadComponent";
import HBSideBar from "../../../components/HPSidebar/HPSidebar.jsx";
import "./fileUpload.css";
// import Header from "../mainDashboard/components/header";

const HPUploadFile = () => {
  return (
    <>
      <div className="head-page">{/* <Header /> */}</div>
      <div className="nabil">
        <div className="elemnts-1">
          <HBSideBar />
        </div>
        <div className="file-form">
          <FileUploadComponent />
        </div>
      </div>
    </>
  );
};

export default HPUploadFile;
