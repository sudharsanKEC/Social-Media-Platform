package com.socialMedia.platform.post.dto.post;

import com.socialMedia.platform.post.model.post.MediaType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostMediaRequest {
    @NotNull(message = "Media type is required.")
    private MediaType mediaType;
    @NotBlank(message="Media URL is required")
    private String mediaUrl;
    private String thumbnailUrl;
    private Integer mediaOrder;
}
