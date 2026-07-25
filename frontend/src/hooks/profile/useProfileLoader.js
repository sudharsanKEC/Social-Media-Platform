import { useState, useEffect } from "react";
import { getMe } from "../../services/userService";
import { getMyPosts } from "../../services/postService";
import { getMyComments } from "../../services/commentService";
import { getLikedPosts } from "../../services/likeService";
import { getFriends } from "../../services/friendService";
import { getFollowers, getFollowing } from "../../services/followService";

export function useProfileLoader() {
    // UI tabs state
    const [profileTab, setProfileTab] = useState("posts"); // "posts" | "liked" | "comments" | "friends" | "followers"
    const [loadingData, setLoadingData] = useState(false);

    // Entities state
    const [currentUser, setCurrentUser] = useState(null);
    const [myPosts, setMyPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [myComments, setMyComments] = useState([]);
    const [friends, setFriends] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [likedPostIds, setLikedPostIds] = useState(new Set());

    // Profile Editing Form states
    const [editDescription, setEditDescription] = useState("");
    const [editSummary, setEditSummary] = useState("");
    const [editPrivacy, setEditPrivacy] = useState("PUBLIC");
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    // Load profile data
    const loadProfileData = async (silent = false) => {
        if (!silent) setLoadingData(true);
        try {
            const profile = await getMe();
            setCurrentUser(profile);
            setEditDescription(profile.description || "");
            setEditSummary(profile.summary || "");
            setEditPrivacy(profile.followPrivacy || "PUBLIC");

            const postsList = await getMyPosts().catch(() => []);
            setMyPosts(postsList);

            const liked = await getLikedPosts().catch(() => []);
            setLikedPosts(liked);
            setLikedPostIds(new Set(liked.map(p => p.postId)));

            const commentsList = await getMyComments().catch(() => []);
            setMyComments(commentsList);

            const friendsList = await getFriends().catch(() => []);
            setFriends(friendsList);

            const followersList = await getFollowers().catch(() => []);
            setFollowers(followersList);

            const followingList = await getFollowing().catch(() => []);
            setFollowing(followingList);

        } catch (err) {
            console.error("Failed to load profile data", err);
        } finally {
            if (!silent) setLoadingData(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadProfileData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        profileTab,
        setProfileTab,
        loadingData,
        setLoadingData,
        currentUser,
        setCurrentUser,
        myPosts,
        setMyPosts,
        likedPosts,
        setLikedPosts,
        myComments,
        setMyComments,
        friends,
        setFriends,
        followers,
        setFollowers,
        following,
        setFollowing,
        likedPostIds,
        setLikedPostIds,
        editDescription,
        setEditDescription,
        editSummary,
        setEditSummary,
        editPrivacy,
        setEditPrivacy,
        isSavingProfile,
        setIsSavingProfile,
        isEditingProfile,
        setIsEditingProfile,
        loadProfileData
    };
}
