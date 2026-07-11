package com.socialMedia.platform.follow.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FollowResponse {
    private String followId;
    private String userId;
    private String userName;
    private String profilePhotoUrl;
}
