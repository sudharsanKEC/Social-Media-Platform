import { handleResponse } from "./api";

export async function uploadFile(file) {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);

    const headers = {};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    // Call fetch directly to avoid application/json content-type override
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload`, {
        method: "POST",
        headers,
        body: formData
    });

    return await handleResponse(response, "Failed to upload file");
}
