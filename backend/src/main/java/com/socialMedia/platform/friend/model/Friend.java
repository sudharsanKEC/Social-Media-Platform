package com.socialMedia.platform.friend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "Friends")
@CompoundIndex(
        name = "friend_request_unique",
        def = "{'requestUserId':1,'receiverUserId':1}",
        unique = true
)
public class Friend{

    @Id
    private String friendId;

    // User who sent the friend request
    private String requestUserId;

    // user who recieved the friend request
    private String receiverUserId;

    // status of the current request
    private FriendRequestStatus status;

    // when the friend request was created
    private LocalDateTime createdAt;

    // when it was accepted/ rejected/ cancelled
    private LocalDateTime respondedAt;
}
