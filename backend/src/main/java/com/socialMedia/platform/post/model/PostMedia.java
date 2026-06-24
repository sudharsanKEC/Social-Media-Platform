package com.socialMedia.platform.post.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostMedia {
    private MediaType mediaType;
    private String mediaUrl;
    private String thumbnailUrl;
    private Integer mediaOrder;
}
