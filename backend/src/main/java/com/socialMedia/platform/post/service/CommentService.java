package com.socialMedia.platform.post.service;

import com.socialMedia.platform.post.dto.comment.CommentResponse;
import com.socialMedia.platform.post.dto.comment.CreateCommentRequest;
import com.socialMedia.platform.post.dto.comment.UpdateCommentRequest;

import java.util.List;

public interface CommentService {
    CommentResponse addComment(String postId, CreateCommentRequest request);
    List<CommentResponse> getComments(String postId);
    CommentResponse updateComment(String commentId, UpdateCommentRequest request);
    void deleteComment(String commentId);

}
