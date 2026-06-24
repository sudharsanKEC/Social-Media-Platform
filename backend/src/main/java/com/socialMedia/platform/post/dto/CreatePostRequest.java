package com.socialMedia.platform.post.dto;

import com.socialMedia.platform.post.model.PostType;
import com.socialMedia.platform.post.model.PostVisibility;
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
