import { useState } from "react";
import { createPost, updatePost, deletePost } from "../services/postService";
import { likePost, unlikePost } from "../services/likeService";

/**
 * usePostActions — handles all post CRUD, like toggle, and the post composer form state.
 */
export function usePostActions({ likedPostIds, setLikedPostIds, loadAllData, triggerMessage }) {
    const [newPostContent, setNewPostContent] = useState("");
    const [newPostVisibility, setNewPostVisibility] = useState("PUBLIC");
    const [newPostType, setNewPostType] = useState("TEXT");
    const [newMediaUrl, setNewMediaUrl] = useState("");
    const [createLoading, setCreateLoading] = useState(false);

    const [editingPostId, setEditingPostId] = useState(null);
    const [editingContent, setEditingContent] = useState("");
    const [editingVisibility, setEditingVisibility] = useState("PUBLIC");

    const handleCreatePost = async () => {
        if (newPostContent.trim() === "") return;
        setCreateLoading(true);
        try {
            const mediaList = newMediaUrl.trim()
                ? [{ mediaType: newPostType === "VIDEO" ? "VIDEO" : "IMAGE", mediaUrl: newMediaUrl, thumbnailUrl: newMediaUrl, mediaOrder: 1 }]
                : null;

            await createPost({
                content: newPostContent,
                postType: newMediaUrl.trim() ? newPostType : "TEXT",
                visibility: newPostVisibility,
                mediaList
            });
            setNewPostContent("");
            setNewMediaUrl("");
            setNewPostType("TEXT");
            triggerMessage("Post published successfully!");
            loadAllData(true);
        } catch (err) {
            triggerMessage(err.message, "error");
        } finally {
            setCreateLoading(false);
        }
    };

    const handleEditPost = (post) => {
        setEditingPostId(post.postId);
        setEditingContent(post.content);
        setEditingVisibility(post.visibility || "PUBLIC");
    };

    const handleSavePostEdit = async (postId) => {
        try {
            await updatePost(postId, { content: editingContent, visibility: editingVisibility });
            setEditingPostId(null);
            triggerMessage("Post updated successfully!");
            loadAllData(true);
        } catch (err) {
            triggerMessage(err.message, "error");
        }
    };

    const handleDeletePost = async (postId) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        try {
            await deletePost(postId);
            triggerMessage("Post deleted.");
            loadAllData(true);
        } catch (err) {
            triggerMessage(err.message, "error");
        }
    };

    const handleLikeToggle = async (post) => {
        const isLiked = likedPostIds.has(post.postId);
        const updated = new Set(likedPostIds);
        try {
            if (isLiked) {
                updated.delete(post.postId);
                setLikedPostIds(updated);
                await unlikePost(post.postId);
            } else {
                updated.add(post.postId);
                setLikedPostIds(updated);
                await likePost(post.postId);
            }
            loadAllData(true);
        } catch (err) {
            console.error("Like failed", err);
        }
    };

    return {
        // Create post form
        newPostContent, setNewPostContent,
        newPostVisibility, setNewPostVisibility,
        newPostType, setNewPostType,
        newMediaUrl, setNewMediaUrl,
        createLoading,
        // Edit post
        editingPostId, editingContent, setEditingContent,
        editingVisibility, setEditingVisibility,
        // Handlers
        handleCreatePost, handleEditPost,
        handleSavePostEdit, handleDeletePost,
        handleLikeToggle,
        cancelPostEdit: () => setEditingPostId(null)
    };
}
