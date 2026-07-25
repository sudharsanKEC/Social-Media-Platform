import { apiFetch, handleResponse, handleTextResponse } from "./api";

export async function createPost(postRequest) {
    try {
        const response = await apiFetch("/posts", {
            method: "POST",
            body: JSON.stringify(postRequest)
        });
        return await handleResponse(response, "Failed to create post");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function getPost(postId) {
    try {
        const response = await apiFetch(`/posts/${postId}`, {
            method: "GET"
        });
        return await handleResponse(response, "Failed to fetch post");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function getAllPosts() {
    try {
        const response = await apiFetch("/posts", {
            method: "GET"
        });
        return await handleResponse(response, "Failed to fetch posts");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function getMyPosts() {
    try {
        const response = await apiFetch("/posts/my-posts", {
            method: "GET"
        });
        return await handleResponse(response, "Failed to fetch my posts");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function updatePost(postId, postRequest) {
    try {
        const response = await apiFetch(`/posts/${postId}`, {
            method: "PUT",
            body: JSON.stringify(postRequest)
        });
        return await handleResponse(response, "Failed to update post");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function deletePost(postId) {
    try {
        const response = await apiFetch(`/posts/${postId}`, {
            method: "DELETE"
        });
        return await handleTextResponse(response, "Failed to delete post");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}
