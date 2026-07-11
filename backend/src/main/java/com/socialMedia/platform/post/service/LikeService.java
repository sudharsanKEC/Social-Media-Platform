package com.socialMedia.platform.post.service;

import com.socialMedia.platform.post.dto.post.PostResponse;

import java.util.List;

public interface LikeService {

    void likePost(String postId);

    void unlikePost(String postId);

    List<PostResponse> getLikedPosts();
}
