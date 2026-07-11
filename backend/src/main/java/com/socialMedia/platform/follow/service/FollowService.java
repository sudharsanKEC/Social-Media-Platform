package com.socialMedia.platform.follow.service;

public interface FollowService {
    void follow(String userId);
    void acceptFollowRequest(String followId);
    void rejectFollowRequest(String followId);
    void cancelFollowRequest(String followId);
    void unfollow(String userId);
    void removeFollower(String followingUserId);
}
