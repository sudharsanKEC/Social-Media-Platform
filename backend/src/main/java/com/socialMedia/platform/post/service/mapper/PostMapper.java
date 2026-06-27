package com.socialMedia.platform.post.service.mapper;

import com.socialMedia.platform.post.dto.PostMediaRequest;
import com.socialMedia.platform.post.dto.PostMediaResponse;
import com.socialMedia.platform.post.dto.PostResponse;
import com.socialMedia.platform.post.model.Post;
import com.socialMedia.platform.post.model.PostMedia;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostMapper {

    public List<PostMedia> mapToPostMediaList(List<PostMediaRequest> mediaRequests){
        List<PostMedia> mediaList = new ArrayList<>();

        if(mediaRequests == null || mediaRequests.isEmpty()){
            return mediaList;
        }

        for(PostMediaRequest mediaRequest : mediaRequests){
            mediaList.add(new PostMedia(
                    mediaRequest.getMediaType(),
                    mediaRequest.getMediaUrl(),
                    mediaRequest.getThumbnailUrl(),
                    mediaRequest.getMediaOrder()
            ));
        }

        return mediaList;
    }

    public PostResponse mapToPostResponse(Post post){
        return PostResponse.builder() // building the PostResponse step by step.
                .postId(post.getPostId()) // assigning the post id
                .authorUserId(post.getAuthorUserId()) // assigning the author id
                .authorUserName(post.getAuthorUserName()) // assigning the author name
                .authorProfilePhotoUrl(post.getAuthorProfilePhotoUrl()) // assigning the author profile photo url
                .postType(post.getPostType()) // getting the post type
                .visibility(post.getVisibility()) // assigning the visibility
                .content(post.getContent()) // assigning the content
                .mediaList(mapToPostMediaResponseList(post.getMediaList())) // converting the PostMedia types in the List to PostMediaResponse
                .likeCount(post.getLikeCount()) // assigning the like count
                .commentCount(post.getCommentCount()) // assigning the comment count
                .shareCount(post.getShareCount()) // assigning the share count
                .isEdited(post.getIsEdited()) // assigning the isEdited
                .isDeleted(post.getIsDeleted()) // assigning the isDeleted
                .createdAt(post.getCreatedAt()) // assigning the created time of the post
                .updatedAt(post.getUpdatedAt()) // assigning the updated time
                .build(); // finially building and returning the PostResponse object
    }

    public List<PostMediaResponse> mapToPostMediaResponseList(List<PostMedia> mediaList){

        List<PostMediaResponse> responseList = new ArrayList<>();

        if(mediaList == null || mediaList.isEmpty()){
            return responseList;
        }

        for(PostMedia media : mediaList){
            responseList.add(new PostMediaResponse(
                    media.getMediaType(),
                    media.getMediaUrl(),
                    media.getThumbnailUrl(),
                    media.getMediaOrder()
            ));
        }

        return responseList;
    }

    public List<PostResponse> mapToPostResponseList(List<Post> posts){

        List<PostResponse> responseList = new ArrayList<>();

        if(posts == null || posts.isEmpty()){
            return responseList;
        }

        for(Post post : posts){
            responseList.add(mapToPostResponse(post));
        }

        return responseList;
    }
}
