import { useState } from "react"
export default function ErrorPopup({ errorMessage, setShowErrorPopup}) {
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="bg-white rounded-xl shadow-xl p-6 w-[400px]">

                <div className="flex flex-col items-center gap-4">

                    <div className="h-14 w-14 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-2xl">
                        ✕
                    </div>

                    <h2 className="text-xl font-bold text-gray-800">
                        Invalid!
                    </h2>

                    <p className="text-gray-600 text-center">
                        {errorMessage}
                    </p>

                    <button
                        type="button"
                        className="bg-red-600 text-white px-5 py-2 rounded-lg w-full cursor-pointer"
                        onClick={() => {
                            setShowErrorPopup(false);
                        }}
                    >
                        OK
                    </button>

                </div>

            </div>

        </div>
    )
}