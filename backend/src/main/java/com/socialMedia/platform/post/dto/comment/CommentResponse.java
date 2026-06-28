package com.socialMedia.platform.post.dto.comment;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public class CommentResponse {
    private String postId;
    private String commentId;
    private String authorUserId;
    private String authorUserName;
    private String authorProfilePhotoUrl;
    private String content;
    private Boolean isEdited;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
