import { Eye } from "lucide-react";

export function MyCommentsTab({
    comments = [],
    onDeleteComment,
    onViewRelatedPost
}) {
    return (
        <div className="space-y-4">
            {comments.length === 0 ? (
                <p className="text-slate-505 text-xs text-center py-8 bg-white border border-slate-200 rounded-2xl">
                    You haven't made any comments yet.
                </p>
            ) : (
                comments.map((comment) => (
                    <div key={comment.commentId} className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-400 font-medium">
                                Commented on {new Date(comment.createdAt).toLocaleDateString()}
                            </span>
                            <button
                                onClick={() => onDeleteComment(comment.postId, comment.commentId)}
                                className="text-rose-600 hover:text-rose-700 text-xs font-semibold cursor-pointer"
                            >
                                Delete Comment
                            </button>
                        </div>

                        <p className="text-slate-800 text-sm font-semibold italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                            "{comment.content}"
                        </p>

                        <div className="flex justify-between items-center pt-2">
                            <span className="text-[10px] text-slate-500">Related Post ID: {comment.postId}</span>
                            <button
                                onClick={() => onViewRelatedPost(comment.postId)}
                                className="flex items-center gap-1 text-[11px] text-indigo-600 hover:text-indigo-700 font-bold cursor-pointer"
                            >
                                <Eye className="w-3.5 h-3.5" />
                                View Related Post
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
