package com.socialMedia.platform.post.dto;

import com.socialMedia.platform.post.model.MediaType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostMediaResponse {
    private MediaType mediaType;
    private String mediaUrl;
    private String thumbnailUrl;
    private Integer mediaOrder;
}
