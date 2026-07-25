import { useState } from "react";

/**
 * useFlashMessage — lightweight flash banner state with auto-dismiss.
 */
export function useFlashMessage(durationMs = 4000) {
    const [message, setMessage] = useState({ text: "", type: "" });

    const triggerMessage = (text, type = "success") => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: "", type: "" }), durationMs);
    };

    return { message, triggerMessage };
}
