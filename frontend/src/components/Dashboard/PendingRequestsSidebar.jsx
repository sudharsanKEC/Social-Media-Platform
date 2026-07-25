import { Check, X, UserCheck } from "lucide-react";

export function PendingRequestsSidebar({
    incomingFriendRequests = [],
    outgoingFriendRequests = [],
    incomingFollowRequests = [],
    outgoingFollowRequests = [],
    onAcceptFriend,
    onRejectFriend,
    onCancelFriend,
    onAcceptFollow,
    onRejectFollow,
    onCancelFollow
}) {
    const getInitials = (name) => {
        if (!name) return "?";
        return name.slice(0, 2).toUpperCase();
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <UserCheck className="w-5 h-5 text-indigo-650" />
                <h3 className="text-sm font-bold text-slate-800">Pending Requests</h3>
            </div>

            {/* Friend Requests Section */}
            <div>
                <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">
                    Friend Requests ({incomingFriendRequests.length})
                </h4>
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    {incomingFriendRequests.length === 0 ? (
                        <p className="text-slate-400 text-[10px] italic">No pending friend requests.</p>
                    ) : (
                        incomingFriendRequests.map((req) => (
                            <div key={req.friendRequestId} className="p-2.5 bg-slate-50 rounded-xl border border-slate-150 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 min-w-0">
                                    <div className="w-7 h-7 rounded-full bg-slate-255 flex items-center justify-center font-bold text-slate-600 text-[10px] flex-shrink-0">
                                        {getInitials(req.senderUserName)}
                                    </div>
                                    <span className="font-bold text-slate-800 text-xs truncate">{req.senderUserName}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => onAcceptFriend(req.friendRequestId)}
                                        className="p-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded cursor-pointer"
                                        title="Accept"
                                    >
                                        <Check className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => onRejectFriend(req.friendRequestId)}
                                        className="p-1 bg-slate-200 hover:bg-slate-300 text-rose-600 rounded cursor-pointer"
                                        title="Reject"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Outgoing Friend Requests (Sent Requests) */}
            {outgoingFriendRequests.length > 0 && (
                <div>
                    <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">
                        Sent Friend Requests ({outgoingFriendRequests.length})
                    </h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                        {outgoingFriendRequests.map((req) => (
                            <div key={req.friendRequestId} className="p-2 bg-slate-50 rounded-xl border border-slate-150 flex items-center justify-between gap-2">
                                <span className="text-xs text-slate-705 font-bold truncate">{req.senderUserName}</span>
                                <button
                                    onClick={() => onCancelFriend(req.friendRequestId)}
                                    className="text-[10px] text-rose-605 hover:text-rose-700 font-semibold cursor-pointer border border-rose-200 bg-rose-50/50 hover:bg-rose-50 px-2 py-0.5 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Follow Requests Section */}
            <div className="border-t border-slate-150 pt-4">
                <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">
                    Follow Requests ({incomingFollowRequests.length})
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {incomingFollowRequests.length === 0 ? (
                        <p className="text-slate-400 text-[10px] italic">No pending follow requests.</p>
                    ) : (
                        incomingFollowRequests.map((req) => (
                            <div key={req.followId} className="p-2.5 bg-slate-50 rounded-xl border border-slate-150 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 min-w-0">
                                    <div className="w-7 h-7 rounded-full bg-slate-205 flex items-center justify-center font-bold text-slate-600 text-[10px] flex-shrink-0">
                                        {getInitials(req.userName)}
                                    </div>
                                    <span className="font-bold text-slate-800 text-xs truncate">{req.userName}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => onAcceptFollow(req.followId)}
                                        className="p-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded cursor-pointer"
                                        title="Accept"
                                    >
                                        <Check className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => onRejectFollow(req.followId)}
                                        className="p-1 bg-slate-200 hover:bg-slate-300 text-rose-600 rounded cursor-pointer"
                                        title="Reject"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Outgoing Follow Requests (Sent Requests) */}
            {outgoingFollowRequests.length > 0 && (
                <div>
                    <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">
                        Sent Follow Requests ({outgoingFollowRequests.length})
                    </h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                        {outgoingFollowRequests.map((req) => (
                            <div key={req.followId} className="p-2 bg-slate-50 rounded-xl border border-slate-150 flex items-center justify-between gap-2">
                                <span className="text-xs text-slate-705 font-bold truncate">{req.userName}</span>
                                <button
                                    onClick={() => onCancelFollow(req.followId)}
                                    className="text-[10px] text-rose-605 hover:text-rose-700 font-semibold cursor-pointer border border-rose-200 bg-rose-50/50 hover:bg-rose-50 px-2 py-0.5 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
