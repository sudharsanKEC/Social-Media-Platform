import { useState, useEffect } from "react";
import { getServerMessage } from "../services/serverService";
import { getMe, getAllUsers, searchUsers } from "../services/userService";
import { getAllPosts, getMyPosts } from "../services/postService";
import { getLikedPosts } from "../services/likeService";
import { getFriends, getPendingFriendRequests, getSentFriendRequests } from "../services/friendService";
import {
    getFollowers,
    getFollowing,
    getPendingFollowRequests,
    getSentFollowRequests
} from "../services/followService";

/**
 * useHomeData — loads and refreshes all data needed for the home dashboard.
 * Returns state slices and a refresh function.
 */
export function useHomeData() {
    const [loadingData, setLoadingData] = useState(false);
    const [welcomeMsg, setWelcomeMsg] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [myPosts, setMyPosts] = useState([]);
    const [likedPostIds, setLikedPostIds] = useState(new Set());
    const [allUsers, setAllUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [friends, setFriends] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [incomingFriendRequests, setIncomingFriendRequests] = useState([]);
    const [outgoingFriendRequests, setOutgoingFriendRequests] = useState([]);
    const [incomingFollowRequests, setIncomingFollowRequests] = useState([]);
    const [outgoingFollowRequests, setOutgoingFollowRequests] = useState([]);

    const loadAllData = async (silent = false) => {
        if (!silent) setLoadingData(true);
        try {
            const [
                welcome, profile, allPosts, mine, liked,
                friendsList, followersList, followingList,
                inFriends, outFriends, inFollows, outFollows
            ] = await Promise.all([
                getServerMessage().catch(() => "Welcome Back!"),
                getMe().catch(() => null),
                getAllPosts().catch(() => []),
                getMyPosts().catch(() => []),
                getLikedPosts().catch(() => []),
                getFriends().catch(() => []),
                getFollowers().catch(() => []),
                getFollowing().catch(() => []),
                getPendingFriendRequests().catch(() => []),
                getSentFriendRequests().catch(() => []),
                getPendingFollowRequests().catch(() => []),
                getSentFollowRequests().catch(() => [])
            ]);

            setWelcomeMsg(welcome);
            if (profile) setCurrentUser(profile);
            setPosts(allPosts);
            setMyPosts(mine);
            setLikedPostIds(new Set(liked.map(p => p.postId)));
            setFriends(friendsList);
            setFollowers(followersList);
            setFollowing(followingList);
            setIncomingFriendRequests(inFriends);
            setOutgoingFriendRequests(outFriends);
            setIncomingFollowRequests(inFollows);
            setOutgoingFollowRequests(outFollows);

            // Refresh discover list with current search query
            const users = await (searchQuery.trim()
                ? searchUsers(searchQuery)
                : getAllUsers()
            ).catch(() => []);
            setAllUsers(users);

        } catch (err) {
            console.error("Error loading home page data:", err);
        } finally {
            if (!silent) setLoadingData(false);
        }
    };

    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        try {
            const users = await (query.trim() ? searchUsers(query) : getAllUsers()).catch(() => []);
            setAllUsers(users);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { loadAllData(); }, []);

    return {
        loadingData, welcomeMsg, currentUser,
        posts, myPosts, likedPostIds, setLikedPostIds,
        allUsers, searchQuery,
        friends, followers, following,
        incomingFriendRequests, outgoingFriendRequests,
        incomingFollowRequests, outgoingFollowRequests,
        loadAllData, handleSearchChange
    };
}
