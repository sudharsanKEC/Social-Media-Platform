import { useState } from "react";
import { getPost } from "../../services/postService";

export function usePostDetails({ triggerMessage }) {
    // Post details view modal state
    const [selectedPostDetails, setSelectedPostDetails] = useState(null);
    const [loadingPostDetails, setLoadingPostDetails] = useState(false);

    // View related post details modal
    const viewPostDetails = async (postId) => {
        setLoadingPostDetails(true);
        try {
            const post = await getPost(postId);
            setSelectedPostDetails(post);
        } catch (err) {
            console.error("Failed to load post details", err);
            triggerMessage("Failed to load post details", "error");
        } finally {
            setLoadingPostDetails(false);
        }
    };

    return {
        selectedPostDetails,
        setSelectedPostDetails,
        loadingPostDetails,
        viewPostDetails
    };
}
