const otpVerificationService = async (otp, email)=>{
    const url = "http://localhost:8080/api/auth/verify-otp";
    try{
        const response = await fetch(url, {
            method: "POST",
            headers:{"content-type":"application/json"},
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