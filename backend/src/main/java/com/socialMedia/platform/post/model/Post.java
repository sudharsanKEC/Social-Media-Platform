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
@Builder // makes a builder pattern for this Post class.
public class Post {
    @Id
    private String postId; // id of the post

    private String authorUserId; // ID of the user who created this post
    private String authorUserName; // name of the user who created this post
    private String authorProfilePhotoUrl; // profile photo of the user who created this post

    private PostType postType; // An enum field which holds the enum types such as TEXT, IMAGE or VIDEO
    private PostVisibility visibility; // Visibility of the post decided by the user with enum types: PUBLIC, FRIENDS_ONLY, FOLLOWERS_ONLY, PRIVATE

    private String content; // it contains the text, contents uploaded along with the post.

    @Builder.Default
    private List<PostMedia> mediaList = new ArrayList<>(); // Medias attached to the post. Example: 1 image, 3 images, 1 video later maybe multiple media items

    @Builder.Default
    private Long likeCount = 0L; // like count of the post

    @Builder.Default
    private Long commentCount = 0L; // number of comment in the post

    @Builder.Default
    private Long shareCount = 0L; // number of shares of the post

    @Builder.Default
    private Boolean isEdited = false; // is post edited by author after creating it?

    @Builder.Default
    private Boolean isDeleted = false; // is the post has been deleted by the author?

    private LocalDateTime createdAt; // creation time of the post
    private LocalDateTime updatedAt; // updation time of the post
}
