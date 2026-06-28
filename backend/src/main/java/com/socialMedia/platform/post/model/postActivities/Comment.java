package com.socialMedia.platform.post.model.postActivities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "Comments")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    @Id
    private String commentId;

    private String postId;

    private String authorUserId;
    private String authorUserName;
    private String authorProfilePhotoUrl;
    private String parentCommentId;

    private String content;

    private boolean isEdited;
    private boolean isDeleted;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
