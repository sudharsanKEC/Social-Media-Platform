import { useState } from "react"
import SignupError from "./SignupError.jsx"
import { Eye, EyeOff } from "lucide-react"
import { userRegister } from "../../services/userSignupService.js";
import { Popup } from "./SignupSuccessPopup.jsx"

import { useSelector, useDispatch  } from "react-redux";
import { setActiveUsername, setIsAuthenticated } from "../../features/auth/authSlice.js";

function Signup(/*{ verifiedEmail, setActiveUsername }*/) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [message, setMessage] = useState(""); // for errors
    const [successPopup, setSuccessPopup] = useState(false);
    const [successMessage, setSuccessMessage] = useState(""); // for success message
    const [email, setEmail] = useState(verifiedEmail || "");

    const dispatch = useDispatch();

    const verifiedEmail = useSelector(
        state => state.auth.verifiedEmail
    );

    const validateSignup = async (event) => {

        event.preventDefault();

        if (username.trim().length === 0 && (password.trim().length < 6 || password.trim().length > 25)) {
            setMessage("Please provide valid username and password");
            setShowErrorPopup(true);
            return;
        }

        if (username.trim().length === 0) {
            setMessage("Username can't be empty");
            setShowErrorPopup(true);
            return;
        }
        if (password !== confirmPassword) {
            setMessage("Both passwords should match!");
            setShowErrorPopup(true);
            return;
        }
        if (password.trim().length < 6 || password.trim().length > 25) {
            setMessage("Password length must be greater than or equal to 6 and less than or equal to 25");
            setShowErrorPopup(true);
            return;
        }

        try {
            setMessage("");
            const response = await userRegister(email, username, password, confirmPassword);
            console.log(response.message);
            setSuccessMessage(response.message);
            // setActiveUsername(username)
            dispatch(setActiveUsername(username));
            dispatch(setIsAuthenticated(true));
            setSuccessPopup(true);
        } catch (error) {
            console.log(error);
            setMessage(error.message);
        }


    }
    return (
        <div>
            <h1 className="text-center">Social Media Platform</h1> <br />
            <h1 className="text-center">Signup Page</h1> <br />
            <form onSubmit={validateSignup} className="flex flex-col gap-4 w-[300px] mx-auto">
                <input
                    type="email"
                    value={email}
                    className="border p-2"
                    readOnly={!!verifiedEmail}
                    placeholder={!verifiedEmail ? "Enter your email" : ""}
                    onChange={(event)=>setEmail(event.target.value)}
                />

                <input
                    type="text"
                    // id="username"
                    value={username}
                    className="border p-2"
                    placeholder="Enter username"
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                />
                <div className="relative">
                    <input

                        // id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        placeholder="Enter password"
                        className="border p-2 pr-10 w-full"
                        onChange={(event) => {
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
                        {password.length !== 0 && (showPassword ? <EyeOff size={15} /> : <Eye size={15} />)}
                    </button>
                </div>

                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        // id="confirmPassword"
                        value={confirmPassword}
                        className="border p-2 pr-10 w-full"
                        placeholder="Re-Enter password for confirmation"
                        onChange={(event) => {
                            setConfirmPassword(event.target.value);
                        }}
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => {
                            setShowConfirmPassword(!showConfirmPassword);
                        }}
                    >
                        {confirmPassword.length !== 0 && (showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />)}
                    </button>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded cursor-pointer"

                >
                    Signup
                </button>
            </form>
            {
                showErrorPopup &&
                <SignupError errorMessage={message} setShowErrorPopup={setShowErrorPopup} />
            }
            {message && <p>{message}</p>}
            {successPopup && <Popup successMessage={successMessage} username={username} />}
        </div>
    )
}

export { Signup };