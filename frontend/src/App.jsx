import { useState } from "react";
import SendOtpPage from "./pages/SendOtpPage.jsx"
import { Signup } from "./pages/SignupPage.jsx";
function App() {

  const [currentPage, setCurrentPage] = useState("SEND_OTP");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  return (
    <div>
      <h1 className="text-center">Social Media Platform</h1> <br />
      {
        currentPage === "SEND_OTP" && <SendOtpPage
          setCurrentPage={setCurrentPage}
          setVerifiedEmail={setVerifiedEmail}
        />
      }
      {
        currentPage === "SIGNUP" && <Signup
          email={verifiedEmail}
        />
      }

    </div>
  );
}

export default App;