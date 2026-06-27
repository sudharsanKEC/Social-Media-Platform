package com.socialMedia.platform.post.dto;

import com.socialMedia.platform.post.model.PostVisibility;
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
