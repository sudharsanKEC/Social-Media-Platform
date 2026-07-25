import { apiFetch, handleResponse, handleTextResponse } from "./api";

export async function likePost(postId) {
    try {
        const response = await apiFetch(`/posts/${postId}/like`, {
            method: "POST"
        });
        return await handleTextResponse(response, "Failed to like post");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function unlikePost(postId) {
    try {
        const response = await apiFetch(`/posts/${postId}/like`, {
            method: "DELETE"
        });
        return await handleTextResponse(response, "Failed to unlike post");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function getLikedPosts() {
    try {
        const response = await apiFetch("/posts/liked", {
            method: "GET"
        });
        return await handleResponse(response, "Failed to fetch liked posts");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}
