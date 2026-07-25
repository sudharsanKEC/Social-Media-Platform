import { useState } from "react";
import { createPost, updatePost, deletePost } from "../../services/postService";

export function useProfilePosts({ loadProfileData, triggerMessage }) {
    // Creating post on profile state
    const [newPostContent, setNewPostContent] = useState("");
    const [newPostVisibility, setNewPostVisibility] = useState("PUBLIC");
    const [newPostType, setNewPostType] = useState("TEXT");
    const [newMediaUrl, setNewMediaUrl] = useState("");
    const [createLoading, setCreateLoading] = useState(false);

    // Editing post state
    const [editingPostId, setEditingPostId] = useState(null);
    const [editingContent, setEditingContent] = useState("");
    const [editingVisibility, setEditingVisibility] = useState("PUBLIC");

    // Create post handler
    const handleCreatePost = async (e) => {
        e?.preventDefault?.();
        if (newPostContent.trim() === "") return;

        setCreateLoading(true);
        try {
            const mediaList = [];
            if (newMediaUrl.trim() !== "") {
                mediaList.push({
                    mediaType: newPostType === "VIDEO" ? "VIDEO" : "IMAGE",
                    mediaUrl: newMediaUrl,
                    thumbnailUrl: newMediaUrl,
                    mediaOrder: 1
                });
            }

            const postRequest = {
                content: newPostContent,
                postType: newMediaUrl.trim() !== "" ? newPostType : "TEXT",
                visibility: newPostVisibility,
                mediaList: mediaList.length > 0 ? mediaList : null
            };

            await createPost(postRequest);
            setNewPostContent("");
            setNewMediaUrl("");
            setNewPostType("TEXT");
            triggerMessage("Post published successfully!");
            loadProfileData(true);
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
            await updatePost(postId, {
                content: editingContent,
                visibility: editingVisibility
            });
            setEditingPostId(null);
            triggerMessage("Post updated!");
            loadProfileData(true);
        } catch (err) {
            triggerMessage(err.message, "error");
        }
    };

    const handleDeletePost = async (postId) => {
        if (!window.confirm("Delete this post?")) return;
        try {
            await deletePost(postId);
            triggerMessage("Post deleted.");
            loadProfileData(true);
        } catch (err) {
            triggerMessage(err.message, "error");
        }
    };

    return {
        newPostContent,
        setNewPostContent,
        newPostVisibility,
        setNewPostVisibility,
        newPostType,
        setNewPostType,
        newMediaUrl,
        setNewMediaUrl,
        createLoading,
        editingPostId,
        setEditingPostId,
        editingContent,
        setEditingContent,
        editingVisibility,
        setEditingVisibility,
        handleCreatePost,
        handleEditPost,
        handleSavePostEdit,
        handleDeletePost
    };
}
