package com.socialMedia.platform.auth.dto;

import com.socialMedia.platform.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String userId;
    private String userName;
    private String userEmail;
    private Long followersCount;
    private Long friendsCount;
    private String profilePhotoUrl;
    private String description;
    private String summary;
    private String followPrivacy;

    public UserDto(User user) {
        this.userId = user.getUserId();
        this.userName = user.getUserName();
        this.userEmail = user.getUserEmail();
        this.followersCount = user.getUserFollowersCount() != null ? user.getUserFollowersCount() : 0L;
        this.friendsCount = user.getUserFriendsCount() != null ? user.getUserFriendsCount() : 0L;
        this.profilePhotoUrl = user.getUserProfilePhotoUrl();
        this.description = user.getUserDescription();
        this.summary = user.getUserSummary();
        this.followPrivacy = user.getFollowPrivacy() != null ? user.getFollowPrivacy().name() : "PUBLIC";
    }
}