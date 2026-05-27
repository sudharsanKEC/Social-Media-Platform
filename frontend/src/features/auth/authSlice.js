import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    verifiedEmail: localStorage.getItem("verifiedEmail") || "",
    activeUsername: localStorage.getItem("activeUsername") || "",
    // isAuthenticated: false
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true"
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

            setVerifiedEmail: (state, action)=>{
                state.verifiedEmail = action.payload;
                localStorage.setItem("verifiedEmail", action.payload);
            },

            setActiveUsername: (state, action)=>{
                state.activeUsername = action.payload;
                localStorage.setItem("activeUsername", action.payload);
            },

            setIsAuthenticated: (state, action)=>{
                state.isAuthenticated = action.payload;
                localStorage.setItem("isAuthenticated", action.payload);
            },

            logout: (state) => {
                
                state.verifiedEmail = "";
                state.activeUsername = "";
                state.isAuthenticated = false;
                
                localStorage.removeItem("verifiedEmail");
                localStorage.removeItem("activeUsername");
                localStorage.removeItem("isAuthenticated");
            }
    }
});



export const {
    setVerifiedEmail,
    setActiveUsername,
    setIsAuthenticated,
    logout
} = authSlice.actions;

export default authSlice.reducer;
































