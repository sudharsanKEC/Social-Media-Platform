import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { SendOtpPage } from "./pages/OtpRelated/SendOtpPage.jsx"
import { Signup } from "./pages/SignupRelated/SignupPage.jsx";
import { VerifyOtpPage } from "./pages/OtpRelated/VerifyOtpPage.jsx";
import { Home } from "./pages/Home.jsx"
import { LoginPage } from "./pages/LoginRelated/LoginPage.jsx";
import { Navigate } from "react-router-dom";
function App() {

  // const [currentPage, setCurrentPage] = useState("SEND_OTP");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [activeUsername, setActiveUsername] = useState("");

  return (
    <Routes>
        <Route path="/" element={<Navigate to="send-otp" replace/>}/>
        <Route path="/send-otp" element={<SendOtpPage />}/>
        <Route path="/verify-otp" element={<VerifyOtpPage setVerifiedEmail={setVerifiedEmail}/>} />
        <Route path="/signup" element={<Signup email={verifiedEmail} setActiveUsername={setActiveUsername}/>}/>
        <Route path="/login" element={<LoginPage setActiveUsername={setActiveUsername}/>}/>
        <Route path="/home" element={<Home activeUsername={activeUsername}/>}/>
    </Routes>
    /* // <div>
    //   {
    //     currentPage === "SEND_OTP" && <SendOtpPage
    //       setCurrentPage={setCurrentPage}
    //       setVerifiedEmail={setVerifiedEmail}
    //     />
    //   }
         
    //   {
    //     currentPage === "SIGNUP" && <Signup
    //       email={verifiedEmail}
    //       setActiveUsername={setActiveUsername}
    //       setCurrentPage={setCurrentPage}
    //     />
    //   }
    //   {
    //     currentPage === "HOME" && <Home activeUsername={activeUsername}/>
    //   }
    //   {
    //     currentPage === "LOGIN" && <LoginPage 
    //     setActiveUsername={setActiveUsername} 
    //     setCurrentPage={setCurrentPage}/>
    //   }
    // </div> */

  );
}

export default App;