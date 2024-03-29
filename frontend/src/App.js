import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupComponent from "./pages/Patient/signUpPage/signUpComponent.jsx";
import LoginPage from "./pages/Patient/loginPage/index.jsx";
import MainDashboard from "./pages/Patient/mainDashboard/index.jsx";
import LandingPage from "./pages/LandingPage/index.jsx";
import UploadFile from "./pages/Patient/uploadFilePage/index.jsx";
import AccessRequestsPages from "./pages/Patient/accessRequestsPage/index.jsx";
import HPDashboard from "./pages/HPProvider/dashboard/index.jsx";
import { RequestAccessPage } from "./pages/HPProvider/requestAccess/index.jsx";
import HPUploadFile from "./pages/HPProvider/hpFileUpload/index.jsx";
import EmergencyAccess from "./pages/HPProvider/emergencyAccess/index.jsx";
import AppointmentSystem from "./pages/HPProvider/appointmentSystem/index.jsx";
import PatientAppointmentSystem from "./pages/Patient/patientAppointments/index.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/patientDashboard" element={<MainDashboard />} />
        <Route path="/patientFileUpload" element={<UploadFile />} />
        <Route path="/hpdashboard" element={<HPDashboard />} />
        <Route path="/reqaccesspage" element={<RequestAccessPage />} />
        <Route path="/hpuploadfile" element={<HPUploadFile />} />
        <Route path="/emergencyAccess" element={<EmergencyAccess />} />
        <Route path="/appointmentSystem" element={<AppointmentSystem />} />
        <Route
          path="/patientappointmentSystem"
          element={<PatientAppointmentSystem />}
        />
        <Route
          path="/patientAccessRequests"
          element={<AccessRequestsPages />}
        />
      </Routes>
    </Router>
  );
}

export default App;
