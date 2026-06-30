package com.socialMedia.platform.friend.service;

import com.socialMedia.platform.friend.dto.FriendRequestResponse;

public interface FriendService {
    FriendRequestResponse sendFriendRequest(String receiverUserId);
    void acceptFriendRequest(String friendRequestId);

}
