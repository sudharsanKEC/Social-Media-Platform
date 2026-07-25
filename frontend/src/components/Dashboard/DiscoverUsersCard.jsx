import { Search, UserPlus, UserMinus, Check, X } from "lucide-react";

export function DiscoverUsersCard({
    allUsers = [],
    searchQuery = "",
    onSearchChange,
    isFriend,
    hasIncomingFriendReq,
    hasOutgoingFriendReq,
    isFollowing,
    hasOutgoingFollowReq,
    getFriendReqId,
    getFollowReqId,
    onSendFriendReq,
    onCancelFriendReq,
    onAcceptFriendReq,
    onRejectFriendReq,
    onUnfriend,
    onFollowUser,
    onUnfollowUser,
    onCancelFollowReq
}) {
    const getInitials = (name) => {
        if (!name) return "?";
        return name.slice(0, 2).toUpperCase();
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800">Discover People</h3>
                <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">
                    Connect and follow users
                </span>
            </div>

            <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-4 h-4" />
                </span>
                <input
                    type="text"
                    placeholder="Search by username or email..."
                    value={searchQuery}
                    onChange={onSearchChange}
                    className="w-full bg-white border border-slate-205 focus:border-indigo-500 text-slate-850 rounded-xl py-2.5 pl-9 pr-4 outline-none text-xs placeholder:text-slate-400"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1">
                {allUsers.length === 0 ? (
                    <p className="text-slate-450 text-xs text-center py-8 col-span-2">No other users found.</p>
                ) : (
                    allUsers.map((user) => {
                        const isFr = isFriend(user.userId);
                        const incFrReq = hasIncomingFriendReq(user.userId);
                        const outFrReq = hasOutgoingFriendReq(user.userId);

                        const isFll = isFollowing(user.userId);
                        const outFllReq = hasOutgoingFollowReq(user.userId);

                        const frReqId = getFriendReqId(user.userId);
                        const fllReqId = getFollowReqId(user.userId);

                        return (
                            <div key={user.userId} className="p-4 bg-slate-50 rounded-xl border border-slate-150 flex flex-col gap-3 justify-between">
                                <div className="flex items-start gap-2.5">
                                    {user.profilePhotoUrl ? (
                                        <img
                                            src={user.profilePhotoUrl}
                                            alt={user.userName}
                                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-650 flex items-center justify-center font-bold text-xs flex-shrink-0">
                                            {getInitials(user.userName)}
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <p className="font-bold text-slate-805 text-xs truncate">@{user.userName}</p>
                                        <p className="text-[10px] text-slate-450 truncate">{user.userEmail}</p>
                                        {user.summary && (
                                            <p className="text-[10px] text-indigo-600 font-semibold italic mt-1 line-clamp-2">
                                                "{user.summary}"
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                                    {/* Friend Button */}
                                    {isFr ? (
                                        <button
                                            onClick={() => onUnfriend(user.userId)}
                                            className="flex items-center justify-center gap-1 py-1.5 border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-[9px] font-bold cursor-pointer transition-colors"
                                        >
                                            <UserMinus className="w-3 h-3" />
                                            Unfriend
                                        </button>
                                    ) : incFrReq ? (
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => onAcceptFriendReq(frReqId)}
                                                className="flex-1 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[9px] font-bold cursor-pointer"
                                                title="Accept"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => onRejectFriendReq(frReqId)}
                                                className="py-1 px-1 bg-slate-205 hover:bg-slate-300 text-rose-600 rounded text-[9px] font-bold cursor-pointer"
                                                title="Reject"
                                            >
                                                <X className="w-3 h-3 mx-auto" />
                                            </button>
                                        </div>
                                    ) : outFrReq ? (
                                        <button
                                            onClick={() => onCancelFriendReq(frReqId)}
                                            className="py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded text-[9px] font-bold cursor-pointer"
                                        >
                                            Requested
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => onSendFriendReq(user.userId)}
                                            className="flex items-center justify-center gap-1 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[9px] font-bold cursor-pointer transition-colors"
                                        >
                                            <UserPlus className="w-3 h-3" />
                                            Add Friend
                                        </button>
                                    )}

                                    {/* Follow Button */}
                                    {isFll ? (
                                        <button
                                            onClick={() => onUnfollowUser(user.userId)}
                                            className="py-1.5 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-[9px] font-bold cursor-pointer"
                                        >
                                            Following
                                        </button>
                                    ) : outFllReq ? (
                                        <button
                                            onClick={() => onCancelFollowReq(fllReqId)}
                                            className="py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg text-[9px] font-bold cursor-pointer"
                                        >
                                            Pending
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => onFollowUser(user.userId)}
                                            className="py-1.5 bg-slate-150 hover:bg-slate-200 text-indigo-650 rounded-lg text-[9px] font-bold cursor-pointer"
                                        >
                                            Follow
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
