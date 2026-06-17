import { apiFetch } from "./api";

const verifyLoginService = async (email, password)=>{
    const api = `/login`;
    try{
        const response =  await apiFetch(api,{
            method: "POST",
            body: JSON.stringify({
                email:email,
                password: password
            })
        });
        // the .fetch() returns a response object. It is an HTTP response wrapper object.
        // The HTTP response wrapper object contains:
        /*
            i)   status
            ii)  headers
            iii) body stream
            iv)  helper methods
                     like:
                            response.json()
                            response.text()
                            response.blob()
        
        */

        const data = await response.json(); // this reads response body and converts JSON text into JavaScript object.
        /*
            response.json() returns Promise
            When called:
                response.json()
            it:
                    reads body stream asynchronously from the response object.
                    converts JSON text into JS object
            So it returns:
                    Promise<Object>

            See the response object printed in the console.
            There:
                Why bodyUsed becomes true
                You saw:
                    bodyUsed: true
                Because:
                    await response.json()
                already consumed/read the body stream.
                Response body can usually be read only once.
            
            Difference between response and data
                    response
                    Full HTTP response metadata wrapper.
            Contains:
                    status
                    headers
                    body stream
                    json()
                    text()
                    ok
            data
                    Parsed JSON converted into JS object.
                Example:
                    {
                    message: "...",
                    username: "..."
                    }
        
        */

        console.log(data);
        console.log(response);
        if(!response.ok){
            throw new Error(data.message || "Login failed" );
        }
        console.log(data.username);
        return data;
    }catch(err){
        throw new Error(err.message || "Something went wrong");
    }
}

export {verifyLoginService};