import { unfriend } from "../../services/friendService";
import { removeFollower, unfollowUser } from "../../services/followService";

export function useProfileConnections({ loadProfileData, triggerMessage }) {
    // Connections actions
    const handleRemoveFriend = async (friendUserId) => {
        if (!window.confirm("Unfriend this user?")) return;
        try {
            await unfriend(friendUserId);
            triggerMessage("Unfriended successfully.");
            loadProfileData(true);
        } catch (err) {
            triggerMessage(err.message, "error");
        }
    };

    const handleRemoveFollower = async (followerUserId) => {
        if (!window.confirm("Remove this follower?")) return;
        try {
            await removeFollower(followerUserId);
            triggerMessage("Follower removed.");
            loadProfileData(true);
        } catch (err) {
            triggerMessage(err.message, "error");
        }
    };

    const handleUnfollow = async (userId) => {
        if (!window.confirm("Stop following this user?")) return;
        try {
            await unfollowUser(userId);
            triggerMessage("Unfollowed user.");
            loadProfileData(true);
        } catch (err) {
            triggerMessage(err.message, "error");
        }
    };

    return {
        handleRemoveFriend,
        handleRemoveFollower,
        handleUnfollow
    };
}
