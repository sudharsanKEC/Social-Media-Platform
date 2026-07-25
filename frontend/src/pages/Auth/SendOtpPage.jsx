import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../../services/authService';
import { Mail, ArrowRight, Compass } from 'lucide-react';

export function SendOtpPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleOtp = async (event) => {
        event.preventDefault();
        setMessage("");
        setError("");

        if (!email || email.trim() === "") {
            setError("Please enter your email address");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setError("Please enter a valid email address");
            return;
        }

        setLoading(true);

        try {
            const response = await sendOtp(email);
            setMessage(response.message);
            setTimeout(() => {
                navigate("/verify-otp", { state: { email } });
            }, 1000);
        } catch (error) {
            setError(error.message);
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
                {/* Logo and title */}
                <div className="flex flex-col items-center mb-8">
                    <div className="p-3 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl shadow-lg shadow-indigo-600/10 mb-4 animate-pulse">
                        <Compass className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 tracking-tight text-center">
                        Antigravity Social
                    </h1>
                    <p className="text-slate-500 text-sm mt-2 text-center">
                        Connect, share, and engage with the world
                    </p>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Get Started</h2>
                    <p className="text-slate-500 text-xs">
                        Enter your email address to receive a one-time verification code.
                    </p>
                </div>

                <form onSubmit={handleOtp} className="space-y-4" noValidate>
                    <div>
                        <label htmlFor="email" className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Mail className="w-5 h-5" />
                            </span>
                            <input
                                type="email"
                                id="email"
                                className="w-full bg-white border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-950 rounded-xl py-3 pl-10 pr-4 outline-none transition-all duration-200 placeholder:text-slate-400 text-sm font-medium"
                                placeholder="name@domain.com"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                    setMessage("");
                                    setError("");
                                }}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-500/20 outline-none transition-all duration-250 cursor-pointer flex justify-center items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                Sending OTP...
                            </span>
                        ) : (
                            <>
                                Send Verification Code
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </>
                        )}
                    </button>
                </form>

                {message && (
                    <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs text-center font-medium animate-fade-in">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs text-center font-medium animate-fade-in">
                        {error}
                    </div>
                )}

                <div className="mt-8 border-t border-slate-100 pt-6 space-y-4">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-medium">Already have an account?</span>
                        <button
                            type="button"
                            className="text-indigo-600 hover:text-indigo-500 font-bold transition-colors cursor-pointer"
                            onClick={() => navigate("/login")}
                        >
                            Log In
                        </button>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-medium">Already verified?</span>
                        <button
                            type="button"
                            className="text-purple-600 hover:text-purple-500 font-bold transition-colors cursor-pointer"
                            onClick={() => navigate("/signup")}
                        >
                            Complete Signup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
