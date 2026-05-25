const userRegister = async (email, username, password, confirmPassword)=>{
    const api = `${import.meta.env.VITE_API_BASE_URL}/signup`;
    try{
        
            const response = await fetch(api,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
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