import { useState } from "react";
import SendOtpPage from "./pages/SendOtpPage.jsx"
import { Signup } from "./pages/SignupPage.jsx";
import Home from "./pages/Home.jsx"
import LoginPage from "./pages/LoginPage.jsx";
function App() {

  const [currentPage, setCurrentPage] = useState("SEND_OTP");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [activeUsername, setActiveUsername] = useState("");
  return (
    <div>
      {
        currentPage === "SEND_OTP" && <SendOtpPage
          setCurrentPage={setCurrentPage}
          setVerifiedEmail={setVerifiedEmail}
        />
      }
      {
        currentPage === "SIGNUP" && <Signup
          email={verifiedEmail}
          setActiveUsername={setActiveUsername}
          setCurrentPage={setCurrentPage}
        />
      }
      {
        currentPage === "HOME" && <Home activeUsername={activeUsername}/>
      }
      {
        currentPage === "LOGIN" && <LoginPage 
        setActiveUsername={setActiveUsername} 
        setCurrentPage={setCurrentPage}/>
      }
    </div>
  );
}

export default App;