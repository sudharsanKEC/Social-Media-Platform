import { apiFetch } from "./api";

const userRegister = async (email, username, password, confirmPassword)=>{
    const api = `/auth/signup`;
    try{
        
            const response = await apiFetch(api,{
                method : "POST",
                body :  JSON.stringify({
                    email:email,
                    username: username,
                    password: password,
                    confirmPassword: confirmPassword
                })
            })
            const data = await response.json();
            console.log(data.error);
            if(!response.ok){
                throw new Error(
                    data.message || "Trouble in creating user account, please contact socialmedia.platform.team@gmail.com"
                )
            }
            return data;
        
    }
    catch(err){
        throw new Error(
            err.message || "Something went wrong"
        )
    }
}

export {userRegister};