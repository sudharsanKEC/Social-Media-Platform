import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { SendOtpPage } from "./pages/Auth/SendOtpPage.jsx";
import { Signup } from "./pages/Auth/SignupPage.jsx";
import { VerifyOtpPage } from "./pages/Auth/VerifyOtpPage.jsx";
import { Home } from "./pages/Home.jsx";
import { ProfilePage } from "./pages/ProfilePage.jsx";
import { LoginPage } from "./pages/Auth/LoginPage.jsx";
import { LandingPage } from "./pages/LandingPage.jsx";
import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute.jsx";
import { PublicRoute } from "./routes/PublicRoute.jsx";

function App() {

  // const [currentPage, setCurrentPage] = useState("SEND_OTP");
  // const [verifiedEmail, setVerifiedEmail] = useState("");
  // const [activeUsername, setActiveUsername] = useState("");

  return (
    <Routes>
        <Route path="/" element={<PublicRoute> <LandingPage /> </PublicRoute>}/>
        <Route path="/send-otp" element={<PublicRoute> <SendOtpPage /> </PublicRoute>}/>
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/signup" element={<PublicRoute> <Signup /> </PublicRoute>}/>
        <Route path="/login" element={<PublicRoute> <LoginPage /> </PublicRoute>}/>
        <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute> <ProfilePage /> </ProtectedRoute>}/>
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