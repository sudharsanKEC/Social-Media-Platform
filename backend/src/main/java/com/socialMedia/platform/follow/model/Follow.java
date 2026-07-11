package com.socialMedia.platform.follow.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection="Follows")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@CompoundIndex(
        name = "unique_follow_request",
        def = "{'followerUserId':1,'followingUserId':1}",
        unique = true
)
public class Follow {

    @Id
    private String followId;

    // user who wants to follow
    private String followerUserId;

    // user being followed
    private String followingUserId;

    // current status of this relationship
    private FollowStatus status;

    // when follow was requested
    private LocalDateTime requestedAt;

    // when request was accepted/rejected
    private LocalDateTime respondedAt;
}
