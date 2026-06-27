package com.socialMedia.platform.post.service;

import com.socialMedia.platform.exception.ResourceNotFoundException;
import com.socialMedia.platform.model.User;
import com.socialMedia.platform.post.dto.*;
import com.socialMedia.platform.post.model.MediaType;
import com.socialMedia.platform.post.model.Post;
import com.socialMedia.platform.post.model.PostMedia;
import com.socialMedia.platform.post.model.PostVisibility;
import com.socialMedia.platform.post.repository.PostRepository;
import com.socialMedia.platform.post.service.mapper.PostMapper;
import com.socialMedia.platform.post.service.util.AuthenticatedUserProvider;
import com.socialMedia.platform.post.service.validator.PostValidator;
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

    private final PostRepository postRepository; // bean for accessing the post model
    private final UserRepository userRepository; // bean for accessing the user model
    private final AuthenticatedUserProvider authenticatedUserProvider;
    private final PostValidator postValidator;
    private final PostMapper postMapper;

    @Override
    // the below method is the actual code for creating the post, it has received the paramet request from the Dto class CreatePostRequest
    public PostResponse createPost(CreatePostRequest request){

        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser(); // will give the current authenticated user's email

        postValidator.validateCreatePostRequest(request); // validating the post that it whether contains the necessary details or not.

        LocalDateTime now = LocalDateTime.now(); // current time

        Post post = Post.builder() // starts the builder object of the Post class
                .authorUserId(currentUser.getUserId()) // makes the current user of the thread as the author of this post
                .authorUserName(currentUser.getUserName()) // name of the current user will be assigned for the authorUserName
                .authorProfilePhotoUrl(currentUser.getUserProfilePhotoUrl()) // profile photo url of the author
                .postType(request.getPostType()) // assigning the post type: TEXT, IMAGE or VIDEO
                .visibility(request.getVisibility() != null ? request.getVisibility() : PostVisibility.PUBLIC) // get the visibility of the post, if visibility is null then PUBLIC will be the default visibility of the post
                .content(trimToNull(request.getContent())) // trimToNull: it trims whitespace from both ends of a string, but if the resulting string is completely empty (or if the input was already null), it returns null instead of an empty string (""), not a default method, definition is written at the end.
                .mediaList(postMapper.mapToPostMediaList(request.getMediaList()))
                /*
                {
                  "postType": "IMAGE",
                  "content": "My first post",
                  "mediaList": [
                    {
                      "mediaType": "IMAGE",
                      "mediaUrl": "https://abc.com/image.jpg",
                      "thumbnailUrl": null,
                      "mediaOrder": 1
                    }
                  ]
                }
                The mediaList we got in the request was of type PostMediaRequest(Dto), we should change it to PostMedia(original model for db)
                */
                .likeCount(0L) // made like count 0 initially
                .commentCount(0L) // made comment count 0 initially
                .shareCount(0L) // made share count 0 initially
                .isEdited(false) // made post edited false initially
                .isDeleted(false) // made post deleted false initially
                .createdAt(now) // assigned current time for post creation timing
                .updatedAt(now) // updated at also assigned with the current timing.
                .build(); // finishing the build and returning the object.

        Post savedPost = postRepository.save(post); // saving the post to the DB

        Long currentPostCount = currentUser.getUserPostsCount() == null ? 0L : currentUser.getUserPostsCount(); // getting the existing number of posts of the user.
        currentUser.setUserPostsCount(currentPostCount+1); // adding 1 to the existing number of post.
        userRepository.save(currentUser); // saving that count to the respective user's post count.

        return postMapper.mapToPostResponse(savedPost); // changing the response of savedPost from Post(Actual Model class) to PostResponse(dto)

    }

    private String trimToNull(String value){
        if (value == null){
            return null;
        }

        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

    @Override
    public PostResponse getPostById(String postId){
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));
        return postMapper.mapToPostResponse(post);
    }

    @Override
    public List<PostResponse> getAllPosts(){
        List<Post> posts = postRepository.findAllByVisibilityAndIsDeletedFalseOrderByCreatedAtDesc(PostVisibility.PUBLIC);
        return postMapper.mapToPostResponseList(posts);
    }

    @Override
    public PostResponse updatePost(String postId, UpdatePostRequest request){
        Post post = postRepository.findById(postId)
                                  .orElseThrow(() -> new ResourceNotFoundException("Post not found"));

        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();

        if(!post.getAuthorUserId().equals(currentUser.getUserId())){
            throw new IllegalArgumentException("You can only edit your own posts");
        }

        if(post.getIsDeleted()){
            throw new IllegalArgumentException("Deleted posts cannot be edited.");
        }

        post.setContent(request.getContent());
        post.setVisibility(request.getVisibility());
        post.setUpdatedAt(LocalDateTime.now());

        Post updatedPost = postRepository.save(post);

        return postMapper.mapToPostResponse(updatedPost);
    }

    @Override
    public void deletePost(String postId){
        Post post = postRepository.findById(postId).
                orElseThrow(()->new ResourceNotFoundException("Post not found"));

        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();

        if(!post.getAuthorUserId().equals(currentUser.getUserId())){
            throw new IllegalArgumentException("You can delete only your own posts.");
        }

        if(post.getIsDeleted()){
            throw new IllegalArgumentException("Post is already deleted");
        }

        post.setIsDeleted(true);
        post.setUpdatedAt(LocalDateTime.now());

        currentUser.setUserPostsCount(
                currentUser.getUserPostsCount()-1
        );

        postRepository.save(post);
        userRepository.save(currentUser);
    }
}
