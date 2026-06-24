package com.socialMedia.platform.post.dto;

import com.socialMedia.platform.post.model.PostType;
import com.socialMedia.platform.post.model.PostVisibility;
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

    private PostType postType;
    private PostVisibility visibility;

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
