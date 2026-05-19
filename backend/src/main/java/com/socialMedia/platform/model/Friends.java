package com.socialMedia.platform.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Friends")
public class Friends {

    @Id
    private Long friendsId;
    private Long requestUserId;
    private Long receiverUserId;
    private String requestStatus;
    private Boolean isFriends;
    private Long endedByUserId;

}
