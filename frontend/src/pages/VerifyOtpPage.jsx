import { useState } from "react";
import { otpVerificationService } from "../services/otpVerificationService";
export default function VerifyOtp({email}){
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");    
    
    const otpVerificationResponse = async (event)=>{
        event.preventDefault();
        try{
            setLoading(true);
            const response = await otpVerificationService(otp, email);
            setMessage(response.message);
        }catch(err){
            setMessage(err.message);
        }finally{
            setLoading(false);
        }
    }

    return (
        <div>
            <h2>Enter OTP for verification</h2>
            <form onSubmit={otpVerificationResponse}>
                <input
                    type="text"
                    placeholder="Enter the OTP"
                    value={otp}
                    onChange={(event)=>{
                        setOtp(event.target.value);
                    }}
                />
                <button type="submit">
                    {
                        loading ? "Verifying" : "Verify"
                    }
                </button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}