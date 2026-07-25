export function FollowersTab({
    followers = [],
    following = [],
    onRemoveFollower,
    onUnfollow
}) {
    return (
        <div className="space-y-6">
            {/* Followers */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-800">My Followers ({followers.length})</h3>
                <div className="space-y-3">
                    {followers.length === 0 ? (
                        <p className="text-slate-500 text-xs text-center py-4">No followers found.</p>
                    ) : (
                        followers.map((fl) => (
                            <div key={fl.userId} className="p-3 bg-slate-50 rounded-xl border border-slate-150 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {fl.profilePhotoUrl ? (
                                        <img src={fl.profilePhotoUrl} alt={fl.userName} className="w-8 h-8 rounded-full object-cover" />
                                    ) : (
                                        <span className="font-bold text-slate-800 text-xs">{fl.userName}</span>
                                    )}
                                </div>
                                <button
                                    onClick={() => onRemoveFollower(fl.userId)}
                                    className="py-1 px-3 border border-slate-205 hover:bg-slate-100 text-rose-600 rounded-lg text-xs font-bold transition-all cursor-pointer"
                                >
                                    Remove Follower
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Following */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-800">Following ({following.length})</h3>
                <div className="space-y-3">
                    {following.length === 0 ? (
                        <p className="text-slate-500 text-xs text-center py-4">You are not following anyone.</p>
                    ) : (
                        following.map((fl) => (
                            <div key={fl.userId} className="p-3 bg-slate-50 rounded-xl border border-slate-150 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {fl.profilePhotoUrl ? (
                                        <img src={fl.profilePhotoUrl} alt={fl.userName} className="w-8 h-8 rounded-full object-cover" />
                                    ) : (
                                        <span className="font-bold text-slate-805 text-xs">{fl.userName}</span>
                                    )}
                                </div>
                                <button
                                    onClick={() => onUnfollow(fl.userId)}
                                    className="py-1 px-3 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-lg text-xs font-bold transition-all cursor-pointer"
                                >
                                    Unfollow
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
