import { X, MessageSquare, Trash2, Send } from "lucide-react";

export function CommentsModal({
    post,
    onClose,
    comments = [],
    commentText = "",
    onCommentTextChange,
    onAddComment,
    onDeleteComment,
    submittingComment,
    activeUsername
}) {
    if (!post) return null;

    const getInitials = (name) => {
        if (!name) return "?";
        return name.slice(0, 2).toUpperCase();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh] shadow-2xl border border-slate-200 animate-slide-up">
                {/* Modal Header */}
                <div className="p-4 border-b border-slate-150 flex justify-between items-center bg-slate-50">
                    <div className="min-w-0 flex-1 pr-4">
                        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                            <MessageSquare className="w-4.5 h-4.5 text-indigo-650" />
                            Comments Thread
                        </h3>
                        <p className="text-slate-500 text-[11px] truncate mt-0.5">
                            Post by @{post.authorUserName}: "{post.content}"
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Modal Body: Comments List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
                    {comments.length === 0 ? (
                        <div className="text-center py-10">
                            <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                            <p className="text-slate-400 text-xs italic">No comments yet. Write the first one!</p>
                        </div>
                    ) : (
                        comments.map((comment) => {
                            const isCommentOwner = comment.authorUserName === activeUsername;
                            return (
                                <div key={comment.commentId} className="flex gap-2.5 items-start bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    {comment.authorProfilePhotoUrl ? (
                                        <img
                                            src={comment.authorProfilePhotoUrl}
                                            alt={comment.authorUserName}
                                            className="w-8 h-8 rounded-full object-cover border border-slate-200 flex-shrink-0"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                                            {getInitials(comment.authorUserName)}
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-slate-800 text-xs">{comment.authorUserName}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-slate-400">
                                                    {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ""}
                                                </span>
                                                {isCommentOwner && (
                                                    <button
                                                        onClick={() => onDeleteComment(comment.commentId)}
                                                        className="text-rose-650 hover:text-rose-550 p-0.5 rounded cursor-pointer transition-colors"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-slate-650 text-xs mt-1 leading-relaxed whitespace-pre-wrap">
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Modal Footer: Comment Input Form */}
                <div className="p-4 border-t border-slate-150 bg-slate-50 flex gap-2">
                    <input
                        type="text"
                        value={commentText}
                        onChange={(e) => onCommentTextChange(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") onAddComment();
                        }}
                        placeholder="Write a comment..."
                        className="w-full bg-white border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 text-slate-800 rounded-xl py-2 px-4 outline-none text-xs"
                    />
                    <button
                        onClick={onAddComment}
                        disabled={submittingComment || commentText.trim() === ""}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl transition-colors cursor-pointer flex-shrink-0 disabled:opacity-50"
                    >
                        <Send className="w-4.5 h-4.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
