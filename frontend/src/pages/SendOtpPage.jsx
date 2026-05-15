import { useState } from 'react';
import { sendOtp } from '../services/authService';

function SendOtpPage() {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleOtp = async (event) => {
        event.preventDefault();

        setLoading(true);
        setMessage("");
        try {
            const response = await sendOtp(email);
            setMessage(response.message);
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ color: "black" }}>
            <h1>Email:</h1>
            <form onSubmit={handleOtp}>
                <input
                    type="email"
                    placeholder='Enter your email'
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value)
                    }}
                />
                <button type='submit'>
                    {
                        loading ? "Sending OTP..." : "Send Otp"
                    }
                </button>
            </form>
            {
                message && <p>{message}</p>
            }

        </div>
    )
}

export default SendOtpPage;


