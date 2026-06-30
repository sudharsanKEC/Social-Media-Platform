package com.socialMedia.platform.friend.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PendingFriendRequestResponse {

    private String friendRequestId;
    private String senderUserId;
    private String senderUserName;
    private String senderProfilePhotoUrl;
    private LocalDateTime requestSentTime;

}
