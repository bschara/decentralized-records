// import LoginPage from "../LoginPage/loginPage";
import image from "../../assets/landing.jpg";
import "./landingPage.css";

const LandingPage = () => {
  return (
    <div className="whole-page">
      <div className="main">
        <body>
          <p className="title">Decentralized medical records</p>
          <div className="middle-component">
            <img src={image} alt="records storage" className="landing-image" />
            <p className="description">
              The Decentralized Medical Record Project is a groundbreaking
              initiative to create a secure and privacy-focused system for
              storing and retrieving medical records. By leveraging blockchain
              technology, this project ensures that patient data remains owned
              by the client, and access is granted instantly with a clear audit
              trail.
            </p>

            <a href="/login">Already have an account ? Sign in </a>
            <a href="/signup">Already have an account ? Sign up</a>
          </div>
        </body>
      </div>
    </div>
  );
};

export default LandingPage;
