import { Compass, LogOut, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

export function Header({ loadAllData, loadingData, isGuest = false, currentUser }) {
    const activeUsername = useSelector(state => state.auth.activeUsername);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const getInitials = (name) => {
        if (!name) return "?";
        return name.slice(0, 2).toUpperCase();
    };

    const handleLogoClick = () => {
        if (isGuest) {
            navigate("/");
        } else {
            navigate("/home");
        }
    };

    return (
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/10 cursor-pointer" onClick={handleLogoClick}>
                    <Compass className="w-6 h-6 text-white" />
                </div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900 cursor-pointer" onClick={handleLogoClick}>
                    NetVibe
                </span>
            </div>
            <div className="flex items-center gap-4">
                {loadAllData && (
                    <button
                        onClick={() => loadAllData()}
                        disabled={loadingData}
                        className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-805 transition-colors cursor-pointer disabled:opacity-50"
                        title="Refresh"
                    >
                        <RefreshCw className={`w-5 h-5 ${loadingData ? "animate-spin" : ""}`} />
                    </button>
                )}
                
                {isGuest ? (
                    <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
                        <button
                            onClick={() => navigate("/login")}
                            className="px-4 py-2 text-xs md:text-sm font-bold text-slate-750 hover:bg-slate-100 rounded-xl transition-all duration-200 cursor-pointer border border-slate-200"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate("/send-otp")}
                            className="px-4 py-2 text-xs md:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-750 rounded-xl transition-all duration-200 cursor-pointer shadow-md shadow-indigo-600/10"
                        >
                            Sign Up
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-3 border-l border-slate-250 pl-4 cursor-pointer hover:opacity-85" onClick={() => navigate("/profile")}>
                            {currentUser?.profilePhotoUrl ? (
                                <img
                                    src={currentUser.profilePhotoUrl}
                                    alt={activeUsername}
                                    className="w-9 h-9 rounded-full object-cover border border-slate-200"
                                />
                            ) : (
                                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-sm">
                                    {getInitials(activeUsername)}
                                </div>
                            )}
                            <span className="font-semibold text-sm hidden md:block text-slate-700">{activeUsername}</span>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="p-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 text-sm font-semibold border border-slate-200"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}
