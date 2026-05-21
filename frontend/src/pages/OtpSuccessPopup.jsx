import {Signup} from "./SignupPage"
import { useState } from "react";
function Popup({message, email}){
  const [showSignup, setShowsignup] = useState(false);
  if(showSignup){
    return <signup />
  }
    return (
        <div className="max-w-xl border mt-5 mx-auto shadow-lg rounded-lg">
              <div className="flex flex-col items-center py-12 gap-4 text-center px-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_8px_24px_rgba(16,185,129,0.2)]">
             <span className=" text-white"> ✓ </span>
              </div>
              <div>
                <p className="font-black text-blue text-base">{message}</p>
                <p className="text-[13px] text-text mt-1 max-w-xs">
                  Now you can continue with your signup.
                </p>
              </div>
              <button 
              className="inline-flex items-center justify-center w-40 px-5 py-3.5 rounded-2xl text-xs md:text-sm font-medium uppercase tracking-widest text-white  cursor-pointer transition-all duration-300 ease-in-out border-0 outline-none bg-gradient-to-r from-[#3d7ebb] via-[#1e3a78] to-[#1e3a78] hover:bg-gradient-to-r hover:from-[#183062] hover:via-[#3d7ebb] hover:to-[#1e3a78] w-full px-6" 
              onClick={()=>{
                setShowsignup(true);
              }}
              >
                Continue!
              </button>
            </div>
            </div>
    );
}
export { Popup };

/*
<!-- Success state -->
            <div className="max-w-xl border mt-5 mx-auto shadow-lg rounded-lg">
              <div className="flex flex-col items-center py-12 gap-4 text-center px-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_8px_24px_rgba(16,185,129,0.2)]">
             <span className=" text-white"> ✓ </span>
              </div>
              <div>
                <p className="font-black text-blue text-base">Email verification done!</p>
                <p className="text-[13px] text-text mt-1 max-w-xs">
                  Now you can continue with your signup.
                </p>
              </div>
              <button className="inline-flex items-center justify-center w-40 px-5 py-3.5 rounded-2xl text-xs md:text-sm font-medium uppercase tracking-widest text-white  cursor-pointer transition-all duration-300 ease-in-out border-0 outline-none bg-gradient-to-r from-[#3d7ebb] via-[#1e3a78] to-[#1e3a78] hover:bg-gradient-to-r hover:from-[#183062] hover:via-[#3d7ebb] hover:to-[#1e3a78] w-full px-6" >
                Continue!
              </button>
            </div>
            </div>
*/
