package com.socialMedia.platform.friend.service;

import com.socialMedia.platform.friend.dto.FriendRequest;
import com.socialMedia.platform.friend.dto.FriendRequestResponse;
import com.socialMedia.platform.friend.dto.FriendResponse;
import com.socialMedia.platform.friend.dto.PendingFriendRequestResponse;
import com.socialMedia.platform.friend.model.Friend;
import com.socialMedia.platform.friend.model.FriendRequestStatus;

import java.util.List;

public interface FriendService {
    FriendRequestResponse sendFriendRequest(String receiverUserId);
    void acceptFriendRequest(String friendRequestId);
    void rejectFriendRequest(String friendRequestId);
    void cancelFriendRequest(String friendRequestId);
}
