import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

export function PublicRoute({ children }){
    
    const isAuthenticated = useSelector(
        state => state.auth.isAuthenticated
    );

    if(isAuthenticated){
        return <Navigate to="/home" replace />
    }

    return children;

}