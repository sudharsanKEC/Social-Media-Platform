package com.socialMedia.platform.post.dto.post;

import com.socialMedia.platform.post.model.post.MediaType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostMediaRequest {
    private MediaType mediaType;
    private String mediaUrl;
    private String thumbnailUrl;
    private Integer mediaOrder;
}
