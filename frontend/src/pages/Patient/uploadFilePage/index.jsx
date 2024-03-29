import FileUploadComponent from "./fileUploadComponent";
import SideBar from "../../../components/sidebar/SideBar";
import "./fileUpload.css";
// import Header from "../mainDashboard/components/header";

const UploadFile = () => {
  return (
    <>
      <div className="head-page">{/* <Header /> */}</div>
      <div className="nabil">
        <div className="elemnts-1">
          <SideBar />
        </div>
        <div className="file-form">
          <FileUploadComponent />
        </div>
      </div>
    </>
  );
};

export default UploadFile;
