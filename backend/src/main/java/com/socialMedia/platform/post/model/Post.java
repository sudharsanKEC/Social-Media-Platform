package com.socialMedia.platform.post.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection="Posts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {
    @Id
    private String postId;

    private String authorUserId; // ID of the user who created this post
    private String authorUserName; // name of the user who created this post
    private String authorProfilePhotoUrl; // profile photo of the user who created this post

    private PostType postType; // An enum field which holds the enum types such as TEXT, IMAGE or VIDEO
    private PostVisibility visibility; // Visibility of the post decided by the user with enum types: PUBLIC, FRIENDS_ONLY, FOLLOWERS_ONLY, PRIVATE

    private String content;

    @Builder.Default
    private List<PostMedia> mediaList = new ArrayList<>();

    @Builder.Default
    private Long likeCount = 0L;

    @Builder.Default
    private Long commentCount = 0L;

    @Builder.Default
    private Long shareCount = 0L;

    @Builder.Default
    private Boolean isEdited = false;

    @Builder.Default
    private Boolean isDeleted = false;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
