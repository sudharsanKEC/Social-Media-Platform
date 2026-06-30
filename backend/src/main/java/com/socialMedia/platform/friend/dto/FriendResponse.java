package com.socialMedia.platform.friend.dto;


import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FriendResponse {

    private String userId;
    private String userName;
    private String profilePhotoUrl;
}
