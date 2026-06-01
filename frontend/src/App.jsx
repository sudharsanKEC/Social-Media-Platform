import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { SendOtpPage } from "./pages/OtpRelated/SendOtpPage.jsx"
import { Signup } from "./pages/SignupRelated/SignupPage.jsx";
import { VerifyOtpPage } from "./pages/OtpRelated/VerifyOtpPage.jsx";
import { Home } from "./pages/Home.jsx"
import { LoginPage } from "./pages/LoginRelated/LoginPage.jsx";
import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute.jsx";
import { PublicRoute } from "./routes/PublicRoute.jsx";

function App() {

  // const [currentPage, setCurrentPage] = useState("SEND_OTP");
  // const [verifiedEmail, setVerifiedEmail] = useState("");
  // const [activeUsername, setActiveUsername] = useState("");

  return (
    <Routes>
        <Route path="/" element={<Navigate to="send-otp" replace/>}/>
        <Route path="/send-otp" element={<PublicRoute> <SendOtpPage /> </PublicRoute>}/>
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/signup" element={<PublicRoute> <Signup /> </PublicRoute>}/>
        <Route path="/login" element={<PublicRoute> <LoginPage /> </PublicRoute>}/>
        <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>}/>
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