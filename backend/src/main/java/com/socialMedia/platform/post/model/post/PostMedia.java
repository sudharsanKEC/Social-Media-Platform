package com.socialMedia.platform.post.model.post;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostMedia {
    private MediaType mediaType; // type of the media uploaded: IMAGE or VIDEO
    private String mediaUrl; // path to the media file
    private String thumbnailUrl; //thumbnail of the media in the post
    private Integer mediaOrder; // This tells the display order of media items inside one post.
}
