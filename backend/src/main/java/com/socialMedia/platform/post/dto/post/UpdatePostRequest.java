package com.socialMedia.platform.post.dto.post;

import com.socialMedia.platform.post.model.post.PostVisibility;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdatePostRequest {
    private String content;
    private PostVisibility visibility;
}
