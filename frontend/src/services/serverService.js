import { apiFetch } from "./api";

export async function getServerMessage() {
    try{
        const response = await apiFetch("/auth/profile",{
            method:"GET"
        });

        const data = await response.text();
        if(!response.ok){
            throw new Error("Authorization problem");
        }
        return data;
    }catch(err){
        throw new Error(err.message || "Something went wrong");
    }
}