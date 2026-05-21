import { useState } from "react"
import SignupError from "./SignupError.jsx"
function Signup({email}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    // const message = "Confirm password doesn't match password";
    const validateSignup = (event)=>{

        event.preventDefault();
        if(username.trim().length === 0){
            setMessage("Username can't be empty");
        }
        if(password !== confirmPassword){
            setMessage("Both passwords should match!");
        }
        if(password.trim().length<6 || password.trim().length>25){
            setMessage("Password length must be greater than or equal to 6 and less than or equal to 25");
        }



    }
    return(
        <div>
            <form onSubmit={validateSignup}>
                <input
                    type="email"
                    id="email"
                    value={email}
                    readOnly
                />
                <input 
                type="text" 
                id="username"
                value={username}
                onChange={(event)=>{
                    setUsername(event.target.value);
                }}
                />
                <input 
                type="password" 
                id="password"
                value={password}
                onChange={(event)=>{
                    setPassword(event.target.value);
                }}
                />
                <input 
                type="password" 
                id="confirmPassword"
                value={confirmPassword}
                onChange={(event)=>{
                    setConfirmPassword(event.target.value);
                    {password !== confirmPassword && <p>{message}</p>}
                }}
                />
                <button 
                type="submit" >
                    Signup
                </button>
            </form>  
        </div>
    )
}

export {Signup};