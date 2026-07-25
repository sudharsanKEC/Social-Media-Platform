import { useNavigate } from "react-router-dom";

export function UserProfileCard({ currentUser, activeUsername }) {
    const navigate = useNavigate();

    const getInitials = (name) => {
        if (!name) return "?";
        return name.slice(0, 2).toUpperCase();
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
            <div className="relative pt-8 flex flex-col items-center text-center">
                {currentUser?.profilePhotoUrl ? (
                    <img
                        src={currentUser.profilePhotoUrl}
                        alt="Profile Avatar"
                        className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-lg bg-white"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                ) : (
                    <div className="w-20 h-20 rounded-full border-4 border-white bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-2xl shadow-lg">
                        {getInitials(activeUsername)}
                    </div>
                )}
                <h2 className="mt-3 font-bold text-lg text-slate-900">{activeUsername}</h2>
                <p className="text-slate-500 text-xs">{currentUser?.userEmail || "Authenticated User"}</p>
                
                {currentUser?.description && (
                    <p className="text-slate-600 text-xs mt-3 bg-slate-50 p-3 rounded-xl border border-slate-100 w-full italic">
                        "{currentUser.description}"
                    </p>
                )}

                <div className="grid grid-cols-2 gap-4 w-full mt-5 pt-5 border-t border-slate-200">
                    <div className="flex flex-col items-center">
                        <span className="text-indigo-600 font-extrabold text-base">{currentUser?.followersCount || 0}</span>
                        <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Followers</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-purple-600 font-extrabold text-base">{currentUser?.friendsCount || 0}</span>
                        <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Friends</span>
                    </div>
                </div>

                <button
                    onClick={() => navigate("/profile")}
                    className="w-full mt-5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold py-2.5 px-4 rounded-xl border border-indigo-200 text-xs transition-colors cursor-pointer"
                >
                    View / Edit Profile
                </button>
            </div>
        </div>
    );
}
