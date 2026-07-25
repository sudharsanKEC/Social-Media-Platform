const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiFetch(
    endpoint,
    options = {}
) {
    const token = localStorage.getItem("token");

    // headers are used to provide extra information about the request.
    const headers = {
        "Content-Type":"application/json", // this tells the backend: I am sending JSON data, Content-Type tells the backend server what type of data I am holding. Here it says that the body contains JSON data. 
                    // The data can be json, XML, plain text, File data and backend parses differently.
        ...options.headers
    };

    if(token){
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
        `${BASE_URL}${endpoint}`,
        {
            ...options,
            headers
        }
    );
    
    return response;
}

export async function handleResponse(response, defaultError = "Something went wrong") {
    if (!response.ok) {
        let errorMsg = defaultError;
        try {
            const text = await response.text();
            try {
                const data = JSON.parse(text);
                errorMsg = data.message || errorMsg;
            } catch (e) {
                errorMsg = text || errorMsg;
            }
        } catch (err) {}
        throw new Error(errorMsg);
    }
    return response.json();
}

export async function handleTextResponse(response, defaultError = "Something went wrong") {
    if (!response.ok) {
        let errorMsg = defaultError;
        try {
            const text = await response.text();
            try {
                const data = JSON.parse(text);
                errorMsg = data.message || errorMsg;
            } catch (e) {
                errorMsg = text || errorMsg;
            }
        } catch (err) {}
        throw new Error(errorMsg);
    }
    return response.text();
}