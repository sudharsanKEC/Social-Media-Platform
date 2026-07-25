import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { otpVerificationService } from "../../services/otpVerificationService";
import { Popup } from "../../components/Auth/SuccessPopup";
import { useDispatch } from "react-redux";
import { setVerifiedEmail } from "../../features/auth/authSlice";
import { ShieldCheck, LockKeyhole, ArrowLeft } from "lucide-react";

export function VerifyOtpPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    if (!email) {
        return <Navigate to="/send-otp" replace />;
    }

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const dispatch = useDispatch();

    const otpVerificationResponse = async (event) => {
        event.preventDefault();
        setError("");
        setMessage("");

        if (!otp || otp.trim() === "") {
            setError("Please enter the verification code");
            return;
        }

        if (otp.length !== 6) {
            setError("Verification code must be exactly 6 digits");
            return;
        }

        setLoading(true);

        try {
            const response = await otpVerificationService(otp, email);
            dispatch(setVerifiedEmail(email));
            setMessage(response.message || "Email verification done!");
            setShowPopup(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 relative overflow-hidden select-none">
            {/* Background decorative gradients */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

            <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-xl relative z-10">
                {/* Back button */}
                <button
                    type="button"
                    onClick={() => navigate("/send-otp")}
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 font-semibold mb-6 cursor-pointer transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Email
                </button>

                {/* Logo and title */}
                <div className="flex flex-col items-center mb-8">
                    <div className="p-3 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-2xl shadow-lg shadow-emerald-500/10 mb-4 animate-pulse">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight text-center">
                        Verify Your Email
                    </h1>
                    <p className="text-slate-500 text-xs mt-2 text-center break-all">
                        We sent a 6-digit OTP code to <strong className="text-indigo-600 font-semibold">{email}</strong>
                    </p>
                </div>

                {!showPopup ? (
                    <form onSubmit={otpVerificationResponse} className="space-y-4" noValidate>
                        <div>
                            <label htmlFor="otp" className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">
                                Verification Code (OTP)
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <LockKeyhole className="w-5 h-5" />
                                </span>
                                <input
                                    type="text"
                                    id="otp"
                                    maxLength={6}
                                    pattern="\d{6}"
                                    className="w-full bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-950 rounded-xl py-3 pl-10 pr-4 outline-none tracking-widest text-center text-lg font-bold transition-all duration-200 placeholder:text-slate-300"
                                    placeholder="000000"
                                    value={otp}
                                    onChange={(event) => {
                                        const cleanVal = event.target.value.replace(/\D/g, "");
                                        setOtp(cleanVal);
                                        setError("");
                                        setMessage("");
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-emerald-600/10 hover:shadow-emerald-500/20 outline-none transition-all duration-250 cursor-pointer flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Verifying...
                                </span>
                            ) : (
                                "Verify Code"
                            )}
                        </button>
                    </form>
                ) : (
                    <Popup message={message} verifiedEmail={email} />
                )}

                {error && (
                    <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs text-center font-medium animate-fade-in">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}