package com.socialMedia.platform.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Users")
public class User {

    @Id
    private Long user_id;
    private String user_name;
    private String user_email;
    private String user_password;
    private Long user_followersCount;
    private Long user_friendsCount;
    private String user_profilePhotoUrl;
    private String user_description;
    private String user_summary;

    private LocalDateTime user_createdAt;

    private Long user_postsCount;


}
