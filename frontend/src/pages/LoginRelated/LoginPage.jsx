import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { verifyLoginService } from "../../services/verifyLoginService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveUsername } from "../../features/auth/authSlice";
import { setIsAuthenticated } from "../../features/auth/authSlice";

export const LoginPage = (/*{setActiveUsername, setCurrentPage}*/)=>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (event)=>{
        event.preventDefault();
        if(email.trim().length === 0 && password.trim().length === 0){
            setMessage("Please provide email and password")
            return;
        }
        if(email.trim().length === 0){
            setMessage("Please provide a valid email");
            return;
        }

        if(password.trim().length === 0){
            setMessage("Please provide a valid password");
            return;
        }

        if(password.length<6 || password.length>25){
            setMessage("Password length must be betwee 6 and 25(both inclusive)");
            return;
        }

        try{
            setMessage("");
            const response = await verifyLoginService(email, password);
            // setActiveUsername(response.username);
            dispatch(setActiveUsername(response.username));
            dispatch(setIsAuthenticated(true));
            navigate("/home");
        }catch(error){
            setMessage(error.message);
        }
    }

    return (
        <div>
            <h1>Login Page</h1>
            <br />
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-[10px] focus:ring-brand focus:border-brand block px-3 py-2 shadow-xs placeholder:text-body w-[200px] inline-block mr-5" 
                    value={email}
                    placeholder="Enter your email"
                    onChange={(event)=>{
                        setEmail(event.target.value);
                    }}
                />
                <br /> <br />
                <div className="relative w-50">
                    <input 
                        type={showPassword ? "text" : "password"}
                        value={password}
                        className="border p-2 pr-10 w-full rounded-[10px]"
                        placeholder="Enter your password"
                        onChange={(event)=>{
                            setPassword(event.target.value);
                        }}
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => {
                            setShowPassword(!showPassword);
                        }}
                    >
                        {password.length !== 0 && (showPassword ? <EyeOff size={15}/> : <Eye size={15}/>)}
                    </button>
                </div>
                <br />
                <button 
                    type="submit"
                    className="rounded-xl bg-gray-100 px-5 py-3 text-base font-medium text-blue-700 hover:bg-gray-200 active:bg-gray-300"
                >
                        Login
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}
