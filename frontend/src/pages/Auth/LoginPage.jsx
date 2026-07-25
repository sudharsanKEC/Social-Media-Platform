import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Compass } from "lucide-react";
import { verifyLoginService } from "../../services/verifyLoginService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveUsername, setToken, setIsAuthenticated } from "../../features/auth/authSlice";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (event) => {
        event.preventDefault();
        if (email.trim().length === 0 && password.trim().length === 0) {
            setMessage("Please provide email and password");
            return;
        }
        if (email.trim().length === 0) {
            setMessage("Please provide a valid email");
            return;
        }
        if (password.trim().length === 0) {
            setMessage("Please provide a valid password");
            return;
        }
        if (password.length < 6 || password.length > 25) {
            setMessage("Password length must be between 6 and 25 characters");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await verifyLoginService(email, password);
            dispatch(setActiveUsername(response.username));
            dispatch(setToken(response.token));
            dispatch(setIsAuthenticated(true));
            navigate("/home");
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
                <div className="flex flex-col items-center mb-8">
                    <div className="p-3 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl shadow-lg shadow-indigo-600/10 mb-4 cursor-pointer" onClick={() => navigate("/")}>
                        <Compass className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 tracking-tight text-center">
                        Welcome Back
                    </h1>
                    <p className="text-slate-500 text-sm mt-2 text-center">
                        Log in to your social media account
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4" noValidate>
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
                                }}
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
                                className="w-full bg-white border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-950 rounded-xl py-3 pl-10 pr-10 outline-none transition-all duration-200 placeholder:text-slate-400 text-sm font-medium"
                                placeholder="••••••••"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                    setMessage("");
                                }}
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-500/20 outline-none transition-all duration-250 cursor-pointer flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                Logging In...
                            </span>
                        ) : (
                            "Log In"
                        )}
                    </button>
                </form>

                {message && (
                    <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs text-center font-medium animate-fade-in">
                        {message}
                    </div>
                )}

                <div className="mt-8 border-t border-slate-100 pt-6 text-center text-xs">
                    <span className="text-slate-500">Don't have an account yet? </span>
                    <button
                        type="button"
                        className="text-indigo-600 hover:text-indigo-500 font-bold transition-colors cursor-pointer"
                        onClick={() => navigate("/send-otp")}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};
