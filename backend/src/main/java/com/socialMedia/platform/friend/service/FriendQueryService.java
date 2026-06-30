package com.socialMedia.platform.friend.service;

import com.socialMedia.platform.friend.dto.FriendResponse;
import com.socialMedia.platform.friend.dto.PendingFriendRequestResponse;

import java.util.List;

public interface FriendQueryService {
    List<PendingFriendRequestResponse> getPendingFriendRequests();
    List<PendingFriendRequestResponse> getSentFriendRequests();
    List<FriendResponse> getFriends();
}
