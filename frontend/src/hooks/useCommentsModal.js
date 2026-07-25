import { useState } from "react";
import { addComment, getComments, deleteComment } from "../services/commentService";

/**
 * useCommentsModal — manages the open/close state of the comments modal,
 * the per-post comment list, and add/delete comment actions.
 */
export function useCommentsModal({ loadAllData, triggerMessage }) {
    const [modalPost, setModalPost] = useState(null);
    const [postComments, setPostComments] = useState({});
    const [commentTexts, setCommentTexts] = useState({});
    const [submittingCommentId, setSubmittingCommentId] = useState(null);

    const openCommentsModal = async (post) => {
        setModalPost(post);
        try {
            const list = await getComments(post.postId);
            setPostComments(prev => ({ ...prev, [post.postId]: list }));
        } catch (err) {
            console.error("Failed to load comments", err);
        }
    };

    const closeCommentsModal = () => setModalPost(null);

    const handleAddComment = async () => {
        if (!modalPost) return;
        const postId = modalPost.postId;
        const text = commentTexts[postId];
        if (!text || text.trim() === "") return;

        setSubmittingCommentId(postId);
        try {
            await addComment(postId, { content: text });
            setCommentTexts(prev => ({ ...prev, [postId]: "" }));
            const list = await getComments(postId);
            setPostComments(prev => ({ ...prev, [postId]: list }));
            loadAllData(true);
        } catch (err) {
            triggerMessage(err.message, "error");
        } finally {
            setSubmittingCommentId(null);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!modalPost) return;
        const postId = modalPost.postId;
        try {
            await deleteComment(commentId);
            const list = await getComments(postId);
            setPostComments(prev => ({ ...prev, [postId]: list }));
            loadAllData(true);
        } catch (err) {
            triggerMessage(err.message, "error");
        }
    };

    return {
        modalPost,
        postComments,
        commentTexts,
        setCommentTexts,
        submittingCommentId,
        openCommentsModal,
        closeCommentsModal,
        handleAddComment,
        handleDeleteComment
    };
}
