import { apiFetch, handleResponse, handleTextResponse } from "./api";

export async function sendFriendRequest(receiverId) {
    try {
        const response = await apiFetch("/friends", {
            method: "POST",
            body: JSON.stringify({ receiverId })
        });
        return await handleResponse(response, "Failed to send friend request");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function acceptFriendRequest(friendRequestId) {
    try {
        const response = await apiFetch(`/friends/${friendRequestId}/accept`, {
            method: "POST"
        });
        return await handleTextResponse(response, "Failed to accept friend request");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function rejectFriendRequest(friendRequestId) {
    try {
        const response = await apiFetch(`/friends/${friendRequestId}/reject`, {
            method: "POST"
        });
        return await handleTextResponse(response, "Failed to reject friend request");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function cancelFriendRequest(friendRequestId) {
    try {
        const response = await apiFetch(`/friends/${friendRequestId}/cancel`, {
            method: "POST"
        });
        return await handleTextResponse(response, "Failed to cancel friend request");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function getPendingFriendRequests() {
    try {
        const response = await apiFetch("/friends/requests", {
            method: "GET"
        });
        return await handleResponse(response, "Failed to fetch pending friend requests");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function getSentFriendRequests() {
    try {
        const response = await apiFetch("/friends/friendRequests", {
            method: "GET"
        });
        return await handleResponse(response, "Failed to fetch sent friend requests");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function getFriends() {
    try {
        const response = await apiFetch("/friends", {
            method: "GET"
        });
        return await handleResponse(response, "Failed to fetch friends");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function unfriend(friendUserId) {
    try {
        const response = await apiFetch(`/friends/${friendUserId}`, {
            method: "DELETE"
        });
        return await handleTextResponse(response, "Failed to unfriend user");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}
