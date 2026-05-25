package com.socialMedia.platform.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Users")
public class User {

    @Id
    private String userId;

    @Indexed(unique = true)
    private String userName;

    @Indexed(unique = true)
    private String userEmail;

    private String userPassword;
    private Long userFollowersCount;
    private Long userFriendsCount;
    private String userProfilePhotoUrl;
    private String userDescription;
    private String userSummary;

    private LocalDateTime userCreatedAt;

    private Long userPostsCount;

    private LocalDateTime lastLogin;

}
