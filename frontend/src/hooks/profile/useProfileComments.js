import { useState } from "react";
import { addComment, getComments, deleteComment } from "../../services/commentService";

export function useProfileComments({ loadProfileData, triggerMessage, selectedPostDetails, viewPostDetails }) {
    // Modal Comments state
    const [modalPost, setModalPost] = useState(null);
    const [postComments, setPostComments] = useState({});
    const [commentTexts, setCommentTexts] = useState({});
    const [submittingCommentId, setSubmittingCommentId] = useState(null);

    // Comments Modal togglers
    const handleOpenCommentsModal = async (post) => {
        setModalPost(post);
        try {
            const list = await getComments(post.postId);
            setPostComments(prev => ({ ...prev, [post.postId]: list }));
        } catch (err) {
            console.error(err);
        }
    };

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
            loadProfileData(true);
            if (selectedPostDetails && selectedPostDetails.postId === postId) {
                viewPostDetails(postId);
            }
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
            loadProfileData(true);
            if (selectedPostDetails && selectedPostDetails.postId === postId) {
                viewPostDetails(postId);
            }
        } catch (err) {
            triggerMessage(err.message, "error");
        }
    };

    // Delete a comment from "My Comments" list
    const handleDeleteOwnCommentFromList = async (postId, commentId) => {
        if (!window.confirm("Delete this comment?")) return;
        try {
            await deleteComment(commentId);
            triggerMessage("Comment deleted.");
            loadProfileData(true);
        } catch (err) {
            triggerMessage(err.message, "error");
        }
    };

    return {
        modalPost,
        setModalPost,
        postComments,
        commentTexts,
        setCommentTexts,
        submittingCommentId,
        handleOpenCommentsModal,
        handleAddComment,
        handleDeleteComment,
        handleDeleteOwnCommentFromList
    };
}
