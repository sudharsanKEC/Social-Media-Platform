import { apiFetch } from "./api";

export const sendOtp = async (email) => {
    // Note: fetch() returns a promise, but await of returns the resolved value inside the promise to the variable response below.
    // If the promise was placed in rejected state then the await will throw an error, we should handle them using try-catch
    try{
        const response = await apiFetch(
            `/auth/send-otp`,
            {
                method: "POST",
                // The below body contains the actual data sent to the server
                body: JSON.stringify({email:email}), // JSON.stringify() converts normal JS object into a text, because http can only understand texts.
                /** 
                    This userEmail is a JavaScript object.
                        But HTTP cannot send raw JS objects.
                        HTTP sends text/binary.
                        So we convert object into JSON string.
                    JSON.stringify() converts:
                        {
                            email: email
                        }
                    into:
                        '{"email":"email"}'
                */
            }
        );
        
        const data = await response.json(); // converts response body into JS object
        console.log(data.error);
        if(!response.ok){
            throw new Error(
                data.message || data.error.email || "Failed to send OTP"
            );
        }
        return data;
        
    }catch(err){
        throw new Error(err.message || "Something went wrong");
    }

    
};