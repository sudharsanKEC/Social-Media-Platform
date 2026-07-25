import { useState } from "react";
import { Heart, MessageSquare, Edit2, Trash2, Globe, Users, User, Lock, ChevronDown } from "lucide-react";

const visibilityConfig = {
    PUBLIC: { label: "Public", icon: Globe, color: "text-blue-500" },
    FRIENDS_ONLY: { label: "Friends and Connections Only", icon: Users, color: "text-emerald-500" },
    FOLLOWERS_ONLY: { label: "Followers Only", icon: User, color: "text-violet-500" },
    PRIVATE: { label: "Only Me (Private)", icon: Lock, color: "text-amber-500" }
};

export function PostCard({
    post,
    activeUsername,
    likedPostIds = new Set(),
    editingPostId,
    editingContent,
    setEditingContent,
    editingVisibility,
    setEditingVisibility,
    onEdit,
    onSave,
    onDelete,
    onCancelEdit,
    onLikeToggle,
    onOpenComments
}) {
    const isPostOwner = post.authorUserName === activeUsername;
    const isLiked = likedPostIds.has(post.postId);
    const isEditing = editingPostId === post.postId;
    const [isOpen, setIsOpen] = useState(false);

    const getInitials = (name) => {
        if (!name) return "?";
        return name.slice(0, 2).toUpperCase();
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden hover:border-slate-300 transition-all duration-300">
            {/* Post Author info */}
            <div className="p-5 flex items-start justify-between">
                <div className="flex items-center gap-3">
                    {post.authorProfilePhotoUrl ? (
                        <img
                            src={post.authorProfilePhotoUrl}
                            alt={post.authorUserName}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-200 to-indigo-100 flex items-center justify-center font-bold text-indigo-650 text-sm">
                            {getInitials(post.authorUserName)}
                        </div>
                    )}
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800 text-sm">{post.authorUserName}</span>
                            {isPostOwner && (
                                <span className="bg-indigo-50 border border-indigo-200 text-indigo-600 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                                    You
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-slate-400">
                            <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Just now"}</span>
                            <span>•</span>
                            {(() => {
                                const config = visibilityConfig[post.visibility] || visibilityConfig.PUBLIC;
                                const VisibilityIcon = config.icon;
                                return (
                                    <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-wider text-slate-400">
                                        <VisibilityIcon className={`w-3 h-3 ${config.color}`} />
                                        <span>{config.label.toUpperCase()}</span>
                                    </span>
                                );
                            })()}
                        </div>
                    </div>
                </div>

                {/* Edit / Delete actions */}
                {isPostOwner && !isEditing && (
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={() => onEdit(post)}
                            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                            title="Edit Post"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(post.postId)}
                            className="p-1.5 hover:bg-rose-50 hover:text-rose-600 rounded-lg text-slate-400 transition-colors cursor-pointer"
                            title="Delete Post"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* Post Content */}
            <div className="px-5 pb-4">
                {isEditing ? (
                    <div className="space-y-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <textarea
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            className="w-full bg-white border border-slate-205 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 text-slate-900 rounded-xl p-3 text-sm outline-none resize-none"
                            rows={3}
                        />
                        <div className="flex items-center justify-between gap-4">
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-2 hover:bg-slate-50 transition-colors cursor-pointer select-none font-medium"
                                >
                                    {(() => {
                                        const currentConfig = visibilityConfig[editingVisibility] || visibilityConfig.PUBLIC;
                                        const CurrentIcon = currentConfig.icon;
                                        return (
                                            <>
                                                <CurrentIcon className={`w-3.5 h-3.5 ${currentConfig.color}`} />
                                                <span>{currentConfig.label}</span>
                                            </>
                                        );
                                    })()}
                                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                                </button>
                                {isOpen && (
                                    <div className="absolute left-0 bottom-full mb-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-20 animate-fade-in">
                                        {Object.entries(visibilityConfig).map(([key, cfg]) => {
                                            const Icon = cfg.icon;
                                            return (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    onClick={() => {
                                                        setEditingVisibility(key);
                                                        setIsOpen(false);
                                                    }}
                                                    className="flex items-center gap-2.5 w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer font-medium"
                                                >
                                                    <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                                                    <span>{cfg.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={onCancelEdit}
                                    className="px-3 py-1.5 border border-slate-200 hover:bg-white text-slate-500 rounded-lg text-xs font-semibold cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => onSave(post.postId)}
                                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-slate-805 text-sm leading-relaxed whitespace-pre-line font-medium">
                        {post.content}
                    </p>
                )}

                {/* Media display */}
                {post.mediaList && post.mediaList.length > 0 && !isEditing && (
                    <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden bg-slate-50 flex justify-center max-h-96">
                        {post.mediaList[0].mediaType === "VIDEO" ? (
                            <video src={post.mediaList[0].mediaUrl} className="w-full object-contain max-h-96" controls muted playsInline />
                        ) : (
                            <img
                                src={post.mediaList[0].mediaUrl}
                                alt="Post media"
                                className="w-full object-contain max-h-96 hover:scale-[1.005] transition-transform duration-350"
                                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600"; }}
                            />
                        )}
                    </div>
                )}
            </div>

            {/* Action Bar */}
            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center gap-6 text-xs font-semibold">
                <button
                    onClick={() => onLikeToggle(post)}
                    className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isLiked ? "text-rose-600" : "text-slate-500 hover:text-slate-800"
                    }`}
                >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-600 stroke-rose-600" : ""}`} />
                    <span>{post.likeCount || 0} Likes</span>
                </button>

                <button
                    onClick={() => onOpenComments(post)}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-slate-805 cursor-pointer"
                >
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.commentCount || 0} Comments</span>
                </button>
            </div>
        </div>
    );
}
