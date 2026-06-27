package com.socialMedia.platform.post.service;

import com.socialMedia.platform.post.dto.CreatePostRequest;
import com.socialMedia.platform.post.dto.PostResponse;
import com.socialMedia.platform.post.dto.UpdatePostRequest;
import org.springframework.data.mongodb.core.query.Update;

import java.util.List;

public interface PostService {
    PostResponse createPost(CreatePostRequest request);
    PostResponse getPostById(String postId);
    List<PostResponse> getAllPosts();
    PostResponse updatePost(String postId, UpdatePostRequest request);
    void deletePost(String postId);
}
