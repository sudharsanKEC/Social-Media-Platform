import { apiFetch, handleResponse } from "./api";

export async function getMe() {
    try {
        const response = await apiFetch("/users/me", {
            method: "GET"
        });
        return await handleResponse(response, "Failed to fetch profile");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function getAllUsers() {
    try {
        const response = await apiFetch("/users", {
            method: "GET"
        });
        return await handleResponse(response, "Failed to fetch users");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function searchUsers(query) {
    try {
        const response = await apiFetch(`/users/search?query=${encodeURIComponent(query)}`, {
            method: "GET"
        });
        return await handleResponse(response, "Failed to search users");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

export async function updateMe(profileData) {
    try {
        const response = await apiFetch("/users/me", {
            method: "PUT",
            body: JSON.stringify(profileData)
        });
        return await handleResponse(response, "Failed to update profile");
    } catch (err) {
        throw new Error(err.message || "Something went wrong");
    }
}

