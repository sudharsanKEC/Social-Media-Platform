package com.socialMedia.platform.post.service.validator;

import com.socialMedia.platform.post.dto.CreatePostRequest;
import com.socialMedia.platform.post.dto.PostMediaRequest;
import com.socialMedia.platform.post.model.MediaType;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostValidator {

    public void validateCreatePostRequest(CreatePostRequest request){

        if(request == null){
            throw new IllegalArgumentException("Post request cannot be null");
        }

        if(request.getPostType() == null){
            throw new IllegalArgumentException("Post type is required");
        }

        List<PostMediaRequest> mediaList = request.getMediaList() == null ? new ArrayList<>() : request.getMediaList();
        String content = trimToNull(request.getContent()); // trimToNull(): it trims whitespace from both ends of a string, but if the resulting string is completely empty (or if the input was already null), it returns null instead of an empty string ("").

        // New switch case syntax introduced in java 14.
        switch(request.getPostType()){
            case TEXT -> validateTextPost(content, mediaList); // the arrow doesn't mean lambda here, it simply means: if this case(TEXT) matches, execute the code on the right side.
            case IMAGE -> validateImagePost(mediaList);
            case VIDEO -> validateVideoPost(mediaList);
            default -> throw new IllegalArgumentException("Unsupported post type");
        }
    }

    // validating the text post
    public void validateTextPost(String content, List<PostMediaRequest> mediaList) {

        if(content == null || content.isBlank()){
            throw new IllegalArgumentException("Text post must contain content");
        }

        if(!mediaList.isEmpty()){
            throw new IllegalArgumentException("Text post cannot contain media");
        }
    }

    public void validateImagePost(List<PostMediaRequest> mediaList){
        if (mediaList.isEmpty()) {
            throw new IllegalArgumentException("Image post can contain only image media");
        }

        for(PostMediaRequest media : mediaList) {
            if(media.getMediaType() != MediaType.IMAGE) {
                throw new IllegalArgumentException("Image post can contain only image media");
            }

            if(media.getMediaUrl() == null || media.getMediaUrl().isBlank()){
                throw new IllegalArgumentException("Image media URL cannot be blank");
            }
        }
    }

    public void validateVideoPost(List<PostMediaRequest> mediaList){
        if(mediaList.size() != 1){
            throw new IllegalArgumentException("Video post must contain exactly one video");
        }

        PostMediaRequest media = mediaList.get(0);

        if(media.getMediaType() != MediaType.VIDEO) {
            throw new IllegalArgumentException("Video post must contain video media");
        }

        if(media.getMediaUrl() == null || media.getMediaUrl().isBlank()){
            throw new IllegalArgumentException("Video media URL cannot be blank");
        }
    }

    private String trimToNull(String value){{
        if(value == null) return null;
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

    }
}
