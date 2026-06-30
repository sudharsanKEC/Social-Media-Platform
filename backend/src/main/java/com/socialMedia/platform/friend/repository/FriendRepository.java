package com.socialMedia.platform.friend.repository;

import com.socialMedia.platform.friend.model.Friend;
import com.socialMedia.platform.friend.model.FriendRequestStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface FriendRepository extends MongoRepository<Friend, String> {
    boolean existsByRequestUserIdAndReceiverUserId(String requestUserId, String receiverUserId);
    Optional<Friend> findById(String friendId);
    Optional<Friend> findByRequestUserIdAndReceiverUserIdAndStatus(
            String requestUserId,
            String receiverUserId,
            FriendRequestStatus status
    );
}
