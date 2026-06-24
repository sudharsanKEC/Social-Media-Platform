package com.socialMedia.platform.post.service;

import com.socialMedia.platform.post.dto.CreatePostRequest;
import com.socialMedia.platform.post.dto.PostResponse;

public interface PostService {
    PostResponse createPost(CreatePostRequest request);
}
