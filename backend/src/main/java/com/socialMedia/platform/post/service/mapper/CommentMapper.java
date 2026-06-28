package com.socialMedia.platform.post.service.mapper;

import com.socialMedia.platform.post.dto.comment.CommentResponse;
import com.socialMedia.platform.post.model.postActivities.Comment;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentMapper {
    public CommentResponse mapToCommentResponse(Comment comment){
        return CommentResponse.builder()
                .postId(comment.getPostId())
                .commentId(comment.getCommentId())
                .updatedAt(comment.getUpdatedAt())
                .createdAt(comment.getCreatedAt())
                .authorProfilePhotoUrl(comment.getAuthorProfilePhotoUrl())
                .authorUserName(comment.getAuthorUserName())
                .authorUserId(comment.getAuthorUserId())
                .content(comment.getContent())
                .isEdited(comment.isEdited())
                .build();
    }

    public List<CommentResponse> mapToCommentResponseList(List<Comment> commentList){
        List<CommentResponse> commentResponseList = new ArrayList<>();

        if(commentList == null || commentList.isEmpty()) return commentResponseList;

        for(Comment comment : commentList){
            commentResponseList.add(mapToCommentResponse(comment));
        }

        return commentResponseList;
    }
}
