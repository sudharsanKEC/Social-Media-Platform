import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { getServerMessage } from "../services/serverService";
import { useEffect, useState } from "react";
export function Home() {
    const activeUsername = useSelector(
        state => state.auth.activeUsername
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userWelcome, setUserWelcome] = useState("");

    const handleLogout = () => {

        dispatch(logout());
        navigate("/login");

    }

    useEffect(()=>{
        const fetchProfile = async()=>{
            try{
                const response = await getServerMessage();
                setUserWelcome(response);
            }catch(error){
                console.log(error);
            }
        };
        fetchProfile();
    },[]);

    return (
        <div>
            <h1>Welcome to the platform, {activeUsername}</h1>
            <h2>{userWelcome}</h2>
            <div>
                <button className="rounded-xl bg-gray-100 px-5 py-3 text-base font-medium text-blue-700 hover:bg-gray-200 active:bg-gray-300" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

