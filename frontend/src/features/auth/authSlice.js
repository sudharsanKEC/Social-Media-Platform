import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
    verifiedEmail: localStorage.getItem("verifiedEmail") || "",
    activeUsername: localStorage.getItem("activeUsername") || "",
    // isAuthenticated: false
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    token: localStorage.getItem("token") || ""
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

            setVerifiedEmail: (state, action)=>{
                state.verifiedEmail = action.payload;
                localStorage.setItem("verifiedEmail", action.payload);
                console.log("state: ",state);
                console.log("action: ",action);
            },

            setActiveUsername: (state, action)=>{
                state.activeUsername = action.payload;
                localStorage.setItem("activeUsername", action.payload);
                console.log("state: ",state);
                console.log("action: ",action);
            },

            setIsAuthenticated: (state, action)=>{
                state.isAuthenticated = action.payload;
                localStorage.setItem("isAuthenticated", action.payload);
                console.log("state: ",state);
                console.log("action: ",action);
            },

            setToken: (state, action)=>{
                state.token = action.payload;
                localStorage.setItem("token", action.payload);
            },

            logout: (state) => {
                
                state.verifiedEmail = "";
                state.activeUsername = "";
                state.isAuthenticated = false;
                state.token = "";
                
                localStorage.removeItem("verifiedEmail");
                localStorage.removeItem("activeUsername");
                localStorage.removeItem("isAuthenticated");
                localStorage.removeItem("token");
            }
    }
});



export const {
    setVerifiedEmail,
    setActiveUsername,
    setIsAuthenticated,
    setToken,
    logout
} = authSlice.actions;

export default authSlice.reducer;
































