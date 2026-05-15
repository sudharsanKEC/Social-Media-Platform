const BASE_URL = "http://localhost:8080/api/auth";

export const sendOtp = async (email) => {
    const response = await fetch(
        `${BASE_URL}/send-otp`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email:email,
            }),
        }
    );

    const data = await response.json();

    if(!response.ok){
        throw new Error(
            data.message || "Failed to send OTP"
        );
    }
    return data;
};