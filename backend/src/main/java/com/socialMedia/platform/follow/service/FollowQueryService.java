package com.socialMedia.platform.follow.service;

import com.socialMedia.platform.follow.dto.FollowResponse;

import java.util.List;

public interface FollowQueryService {
    List<FollowResponse> getFollowers();
    List<FollowResponse> getFollowing();
    List<FollowResponse> getPendingFollowRequests();
    List<FollowResponse> getSentFollowRequests();
}
