package com.socialMedia.platform.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Friends")
public class Friends {

    @Id
    private Long friends_id;
    private Long request_userId;
    private Long receiver_userId;
    private String request_status;
    private Boolean isFriends;
    private Long endedByUserId;

}
