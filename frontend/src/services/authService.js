const BASE_URL = "http://localhost:8080/api/auth";

export const sendOtp = async (email) => {
    const userEmail = {
        email:email
    };
    // Note: fetch() returns a promise, but await of returns the resolved value inside the promise to the variable response below.
    // If the promise was placed in rejected state then the await will throw an error, we should handle them using try-catch
    try{
        const response = await fetch(
            `${BASE_URL}/send-otp`,
            {
                method: "POST",
                // headers are used to provide extra information about the request.
                headers: {
                    "Content-Type": "application/json", // this tells the backend: I am sending JSON data, Content-Type tells the backend server what type of data I am holding. Here it says that the body contains JSON data. 
                    // The data can be json, XML, plain text, File data and backend parses differently.
                },
                // The below body contains the actual data sent to the server
                body: JSON.stringify(userEmail), // JSON.stringify() converts normal JS object into a text, because http can only understand texts.
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

        if(!response.ok){
            throw new Error(
                data.message || "Failed to send OTP"
            );
        }
        return data;
        
    }catch(err){
        throw new Error(err.message || "Something went wrong");
    }

    
};