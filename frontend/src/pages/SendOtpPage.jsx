import { useState } from 'react';
import { sendOtp } from '../services/authService';
import VerifyOtp from './VerifyOtpPage';
export default function SendOtpPage({setCurrentPage, setVerifiedEmail}) {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const handleOtp = async (event) => {
        event.preventDefault();

        setLoading(true);
        setMessage("");
        try {
            setOtpSent(false);
            const response = await sendOtp(email);
            setOtpSent(true);
            setMessage(response.message);
        } catch (error) {
            setMessage(error.message);
            setOtpSent(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ color: "black" }}>
            <h1 className="text-center">Social Media Platform</h1> <br />
            <h1>Email:</h1>
            <form onSubmit={handleOtp}>
                <input
                    type="email" 
                    id="email" 
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-brand focus:border-brand block px-3 py-2 shadow-xs placeholder:text-body w-[200px] inline-block mr-5" 
                    placeholder="john.doe@company.com" 
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                        setMessage("");
                        setOtpSent(false);
                    }}
                    required
                />
                <button 
                    type='submit'
                    className = "text-heading bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-md text-sm px-4 py-2.5 text-center leading-5 cursor-pointer"
                >
                    {
                        loading ? "Sending OTP..." : "Send Otp"
                    }
                </button>
            </form>
            {message && <p>{message}</p>}
            <p>Already have an account?</p>
            <p>Click below to login</p>
            <button 
                type="button"
                className="rounded-xl bg-gray-100 px-5 py-3 text-base font-medium text-blue-700 hover:bg-gray-200 active:bg-gray-300"
                onClick={()=>{
                    setCurrentPage("LOGIN")
                }}> LOGIN</button>
            <br />
            {otpSent && <VerifyOtp 
                email={email} 
                setCurrentPage={setCurrentPage} 
                setVerifiedEmail={setVerifiedEmail}/>
            }
        </div>
    )
}



