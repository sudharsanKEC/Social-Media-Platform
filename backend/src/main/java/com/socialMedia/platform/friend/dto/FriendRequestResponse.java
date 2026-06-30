package com.socialMedia.platform.friend.dto;

import com.socialMedia.platform.friend.model.FriendRequestStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FriendRequestResponse {
    private String requestId;
    private FriendRequestStatus status;
    private LocalDateTime requestSentTime;
}
