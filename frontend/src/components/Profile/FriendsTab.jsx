import { UserMinus } from "lucide-react";

export function FriendsTab({
    friends = [],
    onRemoveFriend
}) {
    const getInitials = (name) => {
        if (!name) return "?";
        return name.slice(0, 2).toUpperCase();
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Manage Friends ({friends.length})</h3>
            <div className="space-y-3">
                {friends.length === 0 ? (
                    <p className="text-slate-500 text-xs text-center py-4">Your friends list is empty.</p>
                ) : (
                    friends.map((fr) => (
                        <div key={fr.userId} className="p-3 bg-slate-50 rounded-xl border border-slate-150 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {fr.profilePhotoUrl ? (
                                    <img
                                        src={fr.profilePhotoUrl}
                                        alt={fr.userName}
                                        className="w-8 h-8 rounded-full object-cover"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-705 text-xs">
                                        {getInitials(fr.userName)}
                                    </div>
                                )}
                                <span className="font-bold text-slate-800 text-xs">{fr.userName}</span>
                            </div>
                            <button
                                onClick={() => onRemoveFriend(fr.userId)}
                                className="py-1 px-3 border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                            >
                                <UserMinus className="w-3.5 h-3.5" />
                                Remove Friend
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
