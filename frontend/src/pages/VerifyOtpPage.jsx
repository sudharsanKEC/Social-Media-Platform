import { useState } from "react";
import { otpVerificationService } from "../services/otpVerificationService";
import { Popup } from "./SuccessPopup";
export default function VerifyOtp({email, setCurrentPage, setVerifiedEmail}){
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");    
    const [showPopup, setShowPopup] = useState(false);
    
    // React/browser passes the event object automatically.
    // It was passed here through the onSubmit attribute of the form tag below.
    const otpVerificationResponse = async (event)=>{
        event.preventDefault();
        try{
            setLoading(true);
            const response = await otpVerificationService(otp, email);
            setMessage(response.message);
            setShowPopup(true);
            // setTimeout(()=>setShowPopup(false),8000);
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
                    {/* When form submits:
                            browser creates submit event
                            React wraps/handles it
                            passes it into your function automatically
                    Conceptually:
                            otpVerificationResponse(eventObject); */}
                <input
                    type="number"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-md focus:ring-brand focus:border-brand block px-3 py-2 shadow-xs placeholder:text-body w-[200px] inline-block mr-5" 
                    placeholder="Enter the OTP"
                    value={otp}
                    onChange={(event)=>{
                        setOtp(event.target.value);
                    }}
                    /*
                    When the input changes:
                        User types something
                        browser creates an event object automatically.
                        React receives it and passes it into your function.
                    */
                    required
                />
                <button type="submit"
                className = "text-heading bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-md text-sm px-4 py-2.5 text-center leading-5 cursor-pointer"
                >
                    {
                        loading ? "Verifying" : "Verify"
                    }
                </button>
            </form>
            {message && <p>{message}</p>}
            {showPopup && <Popup message={message} email={email} setCurrentPage={setCurrentPage} setVerifiedEmail={setVerifiedEmail}/>}
        </div>
    );
}

/*
Why event parameter works even though you never pass it
    Because callback/event systems automatically inject arguments.
    Same happens in plain JavaScript.
React event system
    React listens to browser events internally.
    When event occurs:
        browser event occurs
        ↓
        React catches it
        ↓
        React calls your handler
        ↓
        passes event object
What is inside event?
    Example:
        console.log(event);
    You’ll see properties like:
        event.target
        event.type
        event.preventDefault ---> This stops browser default form behavior.
                                    Normally form submit causes:
                                                    page refresh/reload
                                    React apps usually prevent that.
        event.currentTarget

*/