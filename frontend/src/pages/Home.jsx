import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
export function Home(/*{activeUsername}*/) {
    const activeUsername = useSelector(
        state => state.auth.activeUsername
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {

        dispatch(logout());
        navigate("/login");

    }
    return (
        <div>
            <h1>Welcome to the platform, {activeUsername}</h1>
            <div>
                <button className="rounded-xl bg-gray-100 px-5 py-3 text-base font-medium text-blue-700 hover:bg-gray-200 active:bg-gray-300" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

