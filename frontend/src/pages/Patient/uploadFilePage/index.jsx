import FileUploadComponent from "./fileUploadComponent";
import SideBar from "../../../components/sidebar/SideBar";
import "./fileUpload.css";

const UploadFile = () => {
  return (
    <div className="top-fileupload">
      <SideBar />
      <div className="file-form">
        <FileUploadComponent />
      </div>
    </div>
  );
};

export default UploadFile;
