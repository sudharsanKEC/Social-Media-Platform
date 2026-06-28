package com.socialMedia.platform.post.dto.post;

import com.socialMedia.platform.post.model.post.PostType;
import com.socialMedia.platform.post.model.post.PostVisibility;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreatePostRequest {
    private String content;
    private PostType postType;
    private PostVisibility visibility;
    private List<PostMediaRequest> mediaList;
}
