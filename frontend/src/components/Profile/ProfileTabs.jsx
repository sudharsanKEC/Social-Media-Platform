export function ProfileTabs({
    activeTab,
    setActiveTab,
    postsCount = 0,
    likedCount = 0,
    commentsCount = 0,
    friendsCount = 0,
    followersCount = 0
}) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-1.5 flex gap-1 shadow-sm overflow-x-auto">
            <button
                onClick={() => setActiveTab("posts")}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                    activeTab === "posts" ? "bg-slate-100 text-indigo-650" : "text-slate-500 hover:text-slate-850"
                }`}
            >
                My Posts ({postsCount})
            </button>
            <button
                onClick={() => setActiveTab("liked")}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                    activeTab === "liked" ? "bg-slate-100 text-indigo-650" : "text-slate-500 hover:text-slate-850"
                }`}
            >
                Liked Posts ({likedCount})
            </button>
            <button
                onClick={() => setActiveTab("comments")}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                    activeTab === "comments" ? "bg-slate-100 text-indigo-650" : "text-slate-550 hover:text-slate-855"
                }`}
            >
                My Comments ({commentsCount})
            </button>
            <button
                onClick={() => setActiveTab("friends")}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                    activeTab === "friends" ? "bg-slate-100 text-indigo-650" : "text-slate-550 hover:text-slate-855"
                }`}
            >
                Friends ({friendsCount})
            </button>
            <button
                onClick={() => setActiveTab("followers")}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                    activeTab === "followers" ? "bg-slate-100 text-indigo-650" : "text-slate-550 hover:text-slate-855"
                }`}
            >
                Followers ({followersCount})
            </button>
        </div>
    );
}
