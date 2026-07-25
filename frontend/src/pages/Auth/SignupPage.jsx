import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User as UserIcon, ShieldCheck } from "lucide-react";
import { userRegister } from "../../services/userSignupService.js";
import { Popup } from "../../components/Auth/SignupSuccessPopup.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setActiveUsername, setIsAuthenticated, setToken } from "../../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import { verifyLoginService } from "../../services/verifyLoginService.js";

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const verifiedEmail = useSelector(state => state.auth.verifiedEmail);

    const [email, setEmail] = useState(verifiedEmail || "");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [message, setMessage] = useState(""); // for errors
    const [successPopup, setSuccessPopup] = useState(false);
    const [successMessage, setSuccessMessage] = useState(""); // for success message
    const [loading, setLoading] = useState(false);

    const validateSignup = async (event) => {
        event.preventDefault();
        setMessage("");

        if (!email || email.trim().length === 0) {
            setMessage("Email address can't be empty");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setMessage("Please enter a valid email address");
            return;
        }

        if (!username || username.trim().length === 0) {
            setMessage("Username can't be empty");
            return;
        }

        if (!password || password.trim().length === 0) {
            setMessage("Password can't be empty");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Both passwords should match!");
            return;
        }

        if (password.trim().length < 6 || password.trim().length > 25) {
            setMessage("Password length must be between 6 and 25 characters");
            return;
        }

        setLoading(true);

        try {
            const response = await userRegister(email, username, password, confirmPassword);
            
            // Auto login after successful signup
            const loginResponse = await verifyLoginService(email, password);
            dispatch(setToken(loginResponse.token));
            dispatch(setActiveUsername(loginResponse.username));
            dispatch(setIsAuthenticated(true));

            setSuccessMessage(response.message || "Signup Successful!");
            setSuccessPopup(true);
        } catch (error) {
            setMessage(error.message);
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
                <div className="flex flex-col items-center mb-6">
                    <div className="p-3 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-2xl shadow-lg shadow-purple-600/10 mb-4">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 tracking-tight text-center">
                        Create Account
                    </h1>
                    <p className="text-slate-500 text-xs mt-2 text-center">
                        Provide a username and secure password to finalize your profile
                    </p>
                </div>

                {!successPopup ? (
                    <form onSubmit={validateSignup} className="space-y-4" noValidate>
                        <div>
                            <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Mail className="w-5 h-5" />
                                </span>
                                <input
                                    type="email"
                                    className={`w-full border border-slate-200 rounded-xl py-3 pl-10 pr-4 outline-none text-sm font-medium transition-all duration-200 ${
                                        verifiedEmail 
                                            ? "bg-slate-100 text-slate-500 cursor-not-allowed" 
                                            : "bg-white text-slate-955 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400"
                                    }`}
                                    placeholder="name@domain.com"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    readOnly={!!verifiedEmail}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <UserIcon className="w-5 h-5" />
                                </span>
                                <input
                                    type="text"
                                    id="username"
                                    className="w-full bg-white border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-955 rounded-xl py-3 pl-10 pr-4 outline-none transition-all duration-200 placeholder:text-slate-400 text-sm font-medium"
                                    placeholder="yourusername"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Lock className="w-5 h-5" />
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="w-full bg-white border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-955 rounded-xl py-3 pl-10 pr-10 outline-none transition-all duration-200 placeholder:text-slate-400 text-sm font-medium"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {password.length > 0 && (showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />)}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Lock className="w-5 h-5" />
                                </span>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    className="w-full bg-white border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-955 rounded-xl py-3 pl-10 pr-10 outline-none transition-all duration-200 placeholder:text-slate-400 text-sm font-medium"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors cursor-pointer"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {confirmPassword.length > 0 && (showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />)}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-purple-600/10 hover:shadow-purple-500/20 outline-none transition-all duration-250 cursor-pointer flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Signing Up...
                                </span>
                            ) : (
                                "Signup & Continue"
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                        <Popup successMessage={successMessage} />
                    </div>
                )}

                {message && (
                    <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs text-center font-medium animate-fade-in">
                        {message}
                    </div>
                )}

                <div className="mt-6 border-t border-slate-100 pt-4 text-center text-xs">
                    <span className="text-slate-500">Already verified? </span>
                    <button
                        type="button"
                        className="text-indigo-600 hover:text-indigo-500 font-bold transition-colors cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Log In
                    </button>
                </div>
            </div>
        </div>
    );
}

export { Signup };