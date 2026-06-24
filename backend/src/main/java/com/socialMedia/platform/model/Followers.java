package com.socialMedia.platform.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "Followers")
public class Followers {
    @Id
    private Long followId;
    private String followerUserId;
    private String followingUserId;
    private String followRequestStatus;
    private Boolean isFollower;
    private LocalDateTime followRequestTimestamp;
    private LocalDateTime followAcceptTimestamp;
    private LocalDateTime followRemoveTimestamp;

}
