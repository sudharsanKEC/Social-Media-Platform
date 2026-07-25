package com.socialMedia.platform.post.dto.post;

import com.socialMedia.platform.post.model.post.PostType;
import com.socialMedia.platform.post.model.post.PostVisibility;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostResponse {

    private String postId;

    private String authorUserId;
    private String authorUserName;
    private String authorProfilePhotoUrl;

    @NotNull(message="Post type is required.")
    private PostType postType;
    private PostVisibility visibility;

    @NotBlank(message = "Post content cannot be empty.")
    @Size(max = 5000, message = "Post content cannot exceed 5000 characters.")
    private String content;

    private List<PostMediaResponse> mediaList;

    private Long likeCount;
    private Long commentCount;
    private Long shareCount;

    private Boolean isEdited;
    private Boolean isDeleted;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
