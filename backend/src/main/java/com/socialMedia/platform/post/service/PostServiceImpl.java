package com.socialMedia.platform.post.service;

import com.socialMedia.platform.exception.ResourceNotFoundException;
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

    private final PostRepository postRepository; // bean for accessing the post model
    private final UserRepository userRepository; // bean for accessing the user model

    @Override
    // the below method is the actual code for creating the post, it has received the paramet request from the Dto class CreatePostRequest
    public PostResponse createPost(CreatePostRequest request){

        User currentUser = getCurrentAuthenticatedUser(); // will give the current authenticated user's email

        validateCreatePostRequest(request); // validating the post that it whether contains the necessary details or not.

        LocalDateTime now = LocalDateTime.now(); // current time

        Post post = Post.builder() // starts the builder object of the Post class
                .authorUserId(currentUser.getUserId()) // makes the current user of the thread as the author of this post
                .authorUserName(currentUser.getUserName()) // name of the current user will be assigned for the authorUserName
                .authorProfilePhotoUrl(currentUser.getUserProfilePhotoUrl()) // profile photo url of the author
                .postType(request.getPostType()) // assigning the post type: TEXT, IMAGE or VIDEO
                .visibility(request.getVisibility() != null ? request.getVisibility() : PostVisibility.PUBLIC) // get the visibility of the post, if visibility is null then PUBLIC will be the default visibility of the post
                .content(trimToNull(request.getContent())) // trimToNull: it trims whitespace from both ends of a string, but if the resulting string is completely empty (or if the input was already null), it returns null instead of an empty string (""), not a default method, definition is written at the end.
                .mediaList(mapToPostMediaList(request.getMediaList()))
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

        return mapToPostResponse(savedPost); // changing the response of savedPost from Post(Actual Model class) to PostResponse(dto)

    }

    private User getCurrentAuthenticatedUser(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        // SecurityContextHolder contains the current requests security information. SecurityContextHolder -> SecurityContext -> Authentication
        // We can get the current user details, because we have already stored the authenticated user's information in JwtAuthenticationFilter using the UsernamePasswordAuthenticationToken and SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        // the .getPrincipal() will return the email. And principal will have the email in it. The type of it(principal) is object because the subject can be anything.
        String userEmail;

        if(principal instanceof User user){
            // Three things are happening in the above conditional checking:
            //      1) Checks the Type: It verifies if the principal object is an instance of the User class.
            //      2) Creates a Local Variable: If (and only if) the check is true, it automatically declares a new local variable named user of type User.
            //      3) Casts and Assigns the Value: It casts principal to User behind the scenes and assigns it to the user variable.
            // This was introduced in the java 16, it is called Pattern Matching for instanceof, it combines type checking and type casting into a single line. Before the introduction of this, the older way was liek:
            /*
                    if (principal instanceof User) {
                        User user = (User) principal; // Tedious explicit casting
                    }


            */

            userEmail = user.getUserEmail();
        } else if(principal instanceof String email){
            // Again pattern match making
            // Equivalent to:
            /*
                else if(principal instanceof String){
                    String email = (String) principal;
                }


            */
            userEmail = email;
        } else{
            throw new RuntimeException("Unable to identify authenticated user"); // if the current user is not have proper jwt, this error will be thrown.
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
