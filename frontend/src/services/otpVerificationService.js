import { apiFetch } from "./api";

const otpVerificationService = async (otp, email)=>{

    const url = `/auth/verify-otp`;
    console.log(import.meta.env.VITE_API_BASE_URL);
    try{
        const response = await apiFetch(url, {
            method: "POST",
            body: JSON.stringify({otp:otp, email:email})
        });

        const data = await response.json();
        if(!response.ok){
            throw new Error( data.message || "OTP can't be verified");
        }
        return data;
    }catch(err){
        throw new Error(
            err.message || "Something went wrong!"
        )
    }
}

export {otpVerificationService};