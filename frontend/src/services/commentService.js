import { apiFetch, handleResponse, handleTextResponse } from "./api";

export async function addComment(postId, commentRequest) {
    try {
        const response = await apiFetch(`/posts/${postId}/comments`, {
            method: "POST",
            body: JSON.stringify(commentRequest)
        });
        return await handleResponse(response, "Failed to add comment");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function getComments(postId) {
    try {
        const response = await apiFetch(`/posts/${postId}/comments`, {
            method: "GET"
        });
        return await handleResponse(response, "Failed to fetch comments");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function getMyComments() {
    try {
        const response = await apiFetch("/posts/my-comments", {
            method: "GET"
        });
        return await handleResponse(response, "Failed to fetch my comments");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function updateComment(commentId, commentRequest) {
    try {
        const response = await apiFetch(`/posts/comments/${commentId}`, {
            method: "PUT",
            body: JSON.stringify(commentRequest)
        });
        return await handleResponse(response, "Failed to update comment");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function deleteComment(commentId) {
    try {
        const response = await apiFetch(`/posts/comments/${commentId}`, {
            method: "DELETE"
        });
        return await handleTextResponse(response, "Failed to delete comment");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}
