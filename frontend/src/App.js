import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Patient/LoginPage/index.jsx";
import LandingPage from "./pages/LandingPage/index.jsx";
import SignUpPage from "./pages/Patient/SignUpPage/index.jsx";
import MainDashboard from "./pages/Patient/mainDashboard/index.jsx";
import UploadFile from "./pages/Patient/uploadFilePage/index.jsx";
import { RequestAccessPage } from "./pages/HPProvider/requestAccessPage/requestAccess.jsx";
import { EmergencyPortal } from "./pages/HPProvider/EmergencyPortal/index.jsx";
import HPMainDashboard from "./pages/HPProvider/mainDashboard/index.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/fileupload" element={<UploadFile />} />
        <Route path="/requestAccess" element={<RequestAccessPage />} />
        <Route path="/emergencyAccess" element={<EmergencyPortal />} />
        <Route path="/hpdashboard" element={<HPMainDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
