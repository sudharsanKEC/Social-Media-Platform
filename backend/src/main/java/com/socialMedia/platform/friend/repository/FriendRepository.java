package com.socialMedia.platform.friend.repository;

import com.socialMedia.platform.friend.model.Friend;
import com.socialMedia.platform.friend.model.FriendRequestStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface FriendRepository extends MongoRepository<Friend, String> {

    boolean existsByRequestUserIdAndReceiverUserId(String requestUserId, String receiverUserId);
    Optional<Friend> findById(String friendId);
    Optional<Friend> findByRequestUserIdAndReceiverUserIdAndStatus(
            String requestUserId,
            String receiverUserId,
            FriendRequestStatus status
    );

    List<Friend> findAllByReceiverUserIdAndStatusOrderByCreatedAtDesc(String receiverUserId, FriendRequestStatus status);
    List<Friend> findAllByRequestUserIdAndStatusOrderByCreatedAtDesc(String requestUserId, FriendRequestStatus status);
    List<Friend> findAllByStatusAndRequestUserIdOrStatusAndReceiverUserId(FriendRequestStatus status1, String currentUserId1, FriendRequestStatus status2, String currentUserId2);

    Optional<Friend> findByStatusAndRequestUserIdAndReceiverUserIdOrStatusAndRequestUserIdAndReceiverUserId(
            FriendRequestStatus status1,
            String requestUserId1,
            String receiverUserId1,
            FriendRequestStatus status2,
            String requestUserId2,
            String receiverUserId2
    );
}
