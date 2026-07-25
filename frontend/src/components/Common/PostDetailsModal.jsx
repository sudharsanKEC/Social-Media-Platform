import { X, Heart, MessageSquare, Info } from "lucide-react";

export function PostDetailsModal({
    post,
    onClose,
    likedPostIds = new Set(),
    onLikeToggle,
    onOpenComments
}) {
    if (!post) return null;

    const isLiked = likedPostIds.has(post.postId);

    const getInitials = (name) => {
        if (!name) return "?";
        return name.slice(0, 2).toUpperCase();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh] shadow-2xl border border-slate-200 animate-slide-up">
                {/* Modal Header */}
                <div className="p-4 border-b border-slate-150 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <Info className="w-4.5 h-4.5 text-indigo-650" />
                        Post Details
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Modal Body */}
                <div className="p-5 overflow-y-auto space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-705 text-xs">
                            {getInitials(post.authorUserName)}
                        </div>
                        <div>
                            <p className="font-bold text-slate-800 text-xs">@{post.authorUserName}</p>
                            <p className="text-[9px] text-slate-400">Published on {new Date(post.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <p className="text-slate-800 text-sm font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-wrap">
                        {post.content}
                    </p>

                    {post.mediaList && post.mediaList.length > 0 && (
                        <div className="border border-slate-200 rounded-xl overflow-hidden max-h-64 flex justify-center bg-slate-100">
                            {post.mediaList[0].mediaType === "VIDEO" ? (
                                <video src={post.mediaList[0].mediaUrl} className="max-h-64 object-contain w-full" controls muted playsInline />
                            ) : (
                                <img src={post.mediaList[0].mediaUrl} alt="media" className="max-h-64 object-contain w-full" />
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-6 text-xs text-slate-500 font-bold border-t border-slate-100 pt-3">
                        <button
                            onClick={() => onLikeToggle(post)}
                            className={`flex items-center gap-1.5 ${isLiked ? "text-rose-650" : "hover:text-slate-700"}`}
                        >
                            <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-650 stroke-rose-650" : ""}`} />
                            <span>{post.likeCount || 0} Likes</span>
                        </button>
                        <button
                            onClick={() => {
                                onClose();
                                onOpenComments(post);
                            }}
                            className="flex items-center gap-1.5 hover:text-slate-700"
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.commentCount || 0} Comments</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
