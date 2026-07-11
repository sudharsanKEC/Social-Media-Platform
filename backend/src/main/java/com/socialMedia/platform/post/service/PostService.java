package com.socialMedia.platform.post.service;

import com.socialMedia.platform.post.dto.post.CreatePostRequest;
import com.socialMedia.platform.post.dto.post.PostResponse;
import com.socialMedia.platform.post.dto.post.UpdatePostRequest;

import java.util.List;

public interface PostService {
    PostResponse createPost(CreatePostRequest request);
    PostResponse getPostById(String postId);
    List<PostResponse> getAllPosts();
    List<PostResponse> getMyPosts();
    PostResponse updatePost(String postId, UpdatePostRequest request);
    void deletePost(String postId);
}
