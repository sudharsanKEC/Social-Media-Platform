import {
    sendFriendRequest, acceptFriendRequest, rejectFriendRequest,
    cancelFriendRequest, unfriend
} from "../services/friendService";
import {
    followUser, unfollowUser, cancelFollowRequest,
    acceptFollowRequest, rejectFollowRequest
} from "../services/followService";

/**
 * useConnectionActions — all friend + follow action handlers,
 * plus helper lookup functions for the Discover panel.
 */
export function useConnectionActions({
    friends, following,
    incomingFriendRequests, outgoingFriendRequests,
    incomingFollowRequests, outgoingFollowRequests,
    loadAllData, triggerMessage
}) {
    // ── Friend handlers ─────────────────────────────────────────────────────
    const handleSendFriendReq = async (id) => {
        try { await sendFriendRequest(id); triggerMessage("Friend request sent!"); loadAllData(true); }
        catch (err) { triggerMessage(err.message, "error"); }
    };

    const handleAcceptFriendReq = async (reqId) => {
        try { await acceptFriendRequest(reqId); triggerMessage("Friend request accepted!"); loadAllData(true); }
        catch (err) { triggerMessage(err.message, "error"); }
    };

    const handleRejectFriendReq = async (reqId) => {
        try { await rejectFriendRequest(reqId); triggerMessage("Friend request rejected."); loadAllData(true); }
        catch (err) { triggerMessage(err.message, "error"); }
    };

    const handleCancelFriendReq = async (reqId) => {
        try { await cancelFriendRequest(reqId); triggerMessage("Request cancelled."); loadAllData(true); }
        catch (err) { triggerMessage(err.message, "error"); }
    };

    const handleUnfriendUser = async (friendId) => {
        if (!window.confirm("Unfriend this user?")) return;
        try { await unfriend(friendId); triggerMessage("Unfriended."); loadAllData(true); }
        catch (err) { triggerMessage(err.message, "error"); }
    };

    // ── Follow handlers ──────────────────────────────────────────────────────
    const handleFollowUser = async (id) => {
        try { await followUser(id); triggerMessage("Following / Request sent!"); loadAllData(true); }
        catch (err) { triggerMessage(err.message, "error"); }
    };

    const handleUnfollowUser = async (id) => {
        if (!window.confirm("Unfollow this user?")) return;
        try { await unfollowUser(id); triggerMessage("Unfollowed."); loadAllData(true); }
        catch (err) { triggerMessage(err.message, "error"); }
    };

    const handleCancelFollowReq = async (reqId) => {
        try { await cancelFollowRequest(reqId); triggerMessage("Follow request cancelled."); loadAllData(true); }
        catch (err) { triggerMessage(err.message, "error"); }
    };

    const handleAcceptFollowReq = async (reqId) => {
        try { await acceptFollowRequest(reqId); triggerMessage("Follow request accepted!"); loadAllData(true); }
        catch (err) { triggerMessage(err.message, "error"); }
    };

    const handleRejectFollowReq = async (reqId) => {
        try { await rejectFollowRequest(reqId); triggerMessage("Follow request rejected."); loadAllData(true); }
        catch (err) { triggerMessage(err.message, "error"); }
    };

    // ── Discover lookup helpers ───────────────────────────────────────────────
    const isFriend = (userId) => friends.some(f => f.userId === userId);
    const hasIncomingFriendReq = (userId) => incomingFriendRequests.some(r => r.senderUserId === userId);
    const hasOutgoingFriendReq = (userId) => outgoingFriendRequests.some(r => r.senderUserId === userId);
    const isFollowing = (userId) => following.some(f => f.userId === userId);
    const hasOutgoingFollowReq = (userId) => outgoingFollowRequests.some(r => r.userId === userId);

    const getFriendReqId = (userId) => {
        return (incomingFriendRequests.find(r => r.senderUserId === userId)
            || outgoingFriendRequests.find(r => r.senderUserId === userId))?.friendRequestId ?? null;
    };

    const getFollowReqId = (userId) =>
        outgoingFollowRequests.find(r => r.userId === userId)?.followId ?? null;

    return {
        // Friend handlers
        handleSendFriendReq, handleAcceptFriendReq, handleRejectFriendReq,
        handleCancelFriendReq, handleUnfriendUser,
        // Follow handlers
        handleFollowUser, handleUnfollowUser, handleCancelFollowReq,
        handleAcceptFollowReq, handleRejectFollowReq,
        // Discover lookup helpers
        isFriend, hasIncomingFriendReq, hasOutgoingFriendReq,
        isFollowing, hasOutgoingFollowReq, getFriendReqId, getFollowReqId
    };
}
