import { likePost, unlikePost } from "../../services/likeService";

export function useProfileLikes({ likedPostIds, setLikedPostIds, loadProfileData, selectedPostDetails, viewPostDetails }) {
    // Like handler
    const handleLikeToggle = async (post) => {
        const isLiked = likedPostIds.has(post.postId);
        try {
            const updatedLiked = new Set(likedPostIds);
            if (isLiked) {
                updatedLiked.delete(post.postId);
                setLikedPostIds(updatedLiked);
                await unlikePost(post.postId);
            } else {
                updatedLiked.add(post.postId);
                setLikedPostIds(updatedLiked);
                await likePost(post.postId);
            }
            loadProfileData(true);
            if (selectedPostDetails && selectedPostDetails.postId === post.postId) {
                viewPostDetails(post.postId);
            }
        } catch (err) {
            console.error("Like failed", err);
        }
    };

    return {
        handleLikeToggle
    };
}
