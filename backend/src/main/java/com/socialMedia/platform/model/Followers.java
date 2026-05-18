package com.socialMedia.platform.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "Followers")
public class Followers {
    @Id
    private Long follow_id;
    private Long follower_userId;
    private Long following_userId;
    private String follow_request_status;
    private Boolean is_follower;
    private LocalDateTime follow_request_timestamp;
    private LocalDateTime follow_accept_timestamp;
    private LocalDateTime follow_remove_timestamp;

}
