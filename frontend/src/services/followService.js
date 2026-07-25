import { apiFetch, handleResponse, handleTextResponse } from "./api";

export async function followUser(userId) {
    try {
        const response = await apiFetch(`/follow/${userId}`, {
            method: "POST"
        });
        return await handleTextResponse(response, "Failed to follow user");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function acceptFollowRequest(followId) {
    try {
        const response = await apiFetch(`/follow/${followId}/accept`, {
            method: "PUT"
        });
        return await handleTextResponse(response, "Failed to accept follow request");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function rejectFollowRequest(followId) {
    try {
        const response = await apiFetch(`/follow/${followId}/reject`, {
            method: "PUT"
        });
        return await handleTextResponse(response, "Failed to reject follow request");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function cancelFollowRequest(followId) {
    try {
        const response = await apiFetch(`/follow/${followId}/cancel`, {
            method: "DELETE"
        });
        return await handleTextResponse(response, "Failed to cancel follow request");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function unfollowUser(userId) {
    try {
        const response = await apiFetch(`/follow/${userId}`, {
            method: "DELETE"
        });
        return await handleTextResponse(response, "Failed to unfollow user");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function removeFollower(followerUserId) {
    try {
        const response = await apiFetch(`/follow/followers/${followerUserId}`, {
            method: "DELETE"
        });
        return await handleTextResponse(response, "Failed to remove follower");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function getFollowers() {
    try {
        const response = await apiFetch("/follow/followers", {
            method: "GET"
        });
        return await handleResponse(response, "Failed to fetch followers");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function getFollowing() {
    try {
        const response = await apiFetch("/follow/following", {
            method: "GET"
        });
        return await handleResponse(response, "Failed to fetch following users");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function getPendingFollowRequests() {
    try {
        const response = await apiFetch("/follow/requests", {
            method: "GET"
        });
        return await handleResponse(response, "Failed to fetch pending follow requests");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function getSentFollowRequests() {
    try {
        const response = await apiFetch("/follow/sent-requests", {
            method: "GET"
        });
        return await handleResponse(response, "Failed to fetch sent follow requests");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}
