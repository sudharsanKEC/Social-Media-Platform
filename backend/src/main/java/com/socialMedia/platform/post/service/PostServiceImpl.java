package com.socialMedia.platform.post.service;

import com.socialMedia.platform.model.User;
import com.socialMedia.platform.post.dto.CreatePostRequest;
import com.socialMedia.platform.post.dto.PostMediaRequest;
import com.socialMedia.platform.post.dto.PostMediaResponse;
import com.socialMedia.platform.post.dto.PostResponse;
import com.socialMedia.platform.post.model.MediaType;
import com.socialMedia.platform.post.model.Post;
import com.socialMedia.platform.post.model.PostMedia;
import com.socialMedia.platform.post.model.PostVisibility;
import com.socialMedia.platform.post.repository.PostRepository;
import com.socialMedia.platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService{

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Override
    public PostResponse createPost(CreatePostRequest request){

        User currentUser = getCurrentAuthenticatedUser();

        validateCreatePostRequest(request);

        LocalDateTime now = LocalDateTime.now();

        Post post = Post.builder()
                .authorUserId(currentUser.getUserId())
                .authorUserName(currentUser.getUserName())
                .authorProfilePhotoUrl(currentUser.getUserProfilePhotoUrl())
                .postType(request.getPostType())
                .visibility(request.getVisibility() != null ? request.getVisibility() : PostVisibility.PUBLIC)
                .content(trimToNull(request.getContent()))
                .mediaList(mapToPostMediaList(request.getMediaList()))
                .likeCount(0L)
                .commentCount(0L)
                .shareCount(0L)
                .isEdited(false)
                .isDeleted(false)
                .createdAt(now)
                .updatedAt(now)
                .build();

        Post savedPost = postRepository.save(post);

        Long currentPostCount = currentUser.getUserPostsCount() == null ? 0L : currentUser.getUserPostsCount();
        currentUser.setUserPostsCount(currentPostCount+1);
        userRepository.save(currentUser);

        return mapToPostResponse(savedPost);

    }

    private User getCurrentAuthenticatedUser(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String userEmail;

        if(principal instanceof User user){
            userEmail = user.getUserEmail();
        } else if(principal instanceof String email){
            userEmail = email;
        } else{
            throw new RuntimeException("Unable to identify authenticated user");
        }

        return userRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));
    }

    private void validateCreatePostRequest(CreatePostRequest request){

        if(request == null){
            throw new IllegalArgumentException("Post request cannot be null");
        }

        if(request.getPostType() == null){
            throw new IllegalArgumentException("Post type is required");
        }

        List<PostMediaRequest> mediaList = request.getMediaList() == null ? new ArrayList<>() : request.getMediaList();
        String content = trimToNull(request.getContent());

        switch(request.getPostType()){
            case TEXT -> validateTextPost(content, mediaList);
            case IMAGE -> validateImagePost(mediaList);
            case VIDEO -> validateVideoPost(mediaList);
            default -> throw new IllegalArgumentException("Unsupported post type");
        }
    }

    private void validateTextPost(String content, List<PostMediaRequest> mediaList) {

        if(content == null || content.isBlank()){
            throw new IllegalArgumentException("Text post must contain content");
        }

        if(!mediaList.isEmpty()){
            throw new IllegalArgumentException("Text post cannot contain media");
        }
    }

    private void validateImagePost(List<PostMediaRequest> mediaList){
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

    private void validateVideoPost(List<PostMediaRequest> mediaList){
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

    private List<PostMedia> mapToPostMediaList(List<PostMediaRequest> mediaRequests){
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

    private PostResponse mapToPostResponse(Post post){
        return PostResponse.builder()
                .postId(post.getPostId())
                .authorUserId(post.getAuthorUserId())
                .authorUserName(post.getAuthorUserName())
                .authorProfilePhotoUrl(post.getAuthorProfilePhotoUrl())
                .postType(post.getPostType())
                .visibility(post.getVisibility())
                .content(post.getContent())
                .mediaList(mapToPostMediaResponseList(post.getMediaList()))
                .likeCount(post.getLikeCount())
                .commentCount(post.getCommentCount())
                .shareCount(post.getShareCount())
                .isEdited(post.getIsEdited())
                .isDeleted(post.getIsDeleted())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
    }

    private List<PostMediaResponse> mapToPostMediaResponseList(List<PostMedia> mediaList){

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

    private String trimToNull(String value){
        if (value == null){
            return null;
        }

        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
