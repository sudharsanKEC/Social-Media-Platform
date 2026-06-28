package com.socialMedia.platform.post.service;

import com.socialMedia.platform.exception.ResourceNotFoundException;
import com.socialMedia.platform.model.User;
import com.socialMedia.platform.post.dto.comment.CommentResponse;
import com.socialMedia.platform.post.dto.comment.CreateCommentRequest;
import com.socialMedia.platform.post.dto.comment.UpdateCommentRequest;
import com.socialMedia.platform.post.model.post.Post;
import com.socialMedia.platform.post.model.postActivities.Comment;
import com.socialMedia.platform.post.repository.CommentRepository;
import com.socialMedia.platform.post.repository.PostRepository;
import com.socialMedia.platform.post.service.mapper.CommentMapper;
import com.socialMedia.platform.post.service.util.AuthenticatedUserProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import static org.apache.commons.lang3.StringUtils.trimToNull;

@RequiredArgsConstructor
@Service
public class CommentServiceImpl implements CommentService{

    private final PostRepository postRepository;
    private final AuthenticatedUserProvider authenticatedUserProvider;
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;

    @Override
    public CommentResponse addComment(String postId, CreateCommentRequest request){

        Post post = postRepository.findById(postId)
                .orElseThrow(()->new ResourceNotFoundException("Post not found."));

        if(post.getIsDeleted()){
            throw new IllegalArgumentException("Cannot comment on a deleted post");
        }

        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();

        Comment comment = Comment.builder()
                .postId(postId)
                .authorUserId(currentUser.getUserId())
                .authorUserName(currentUser.getUserName())
                .authorProfilePhotoUrl(currentUser.getUserProfilePhotoUrl())
                .content(request.getContent())
                .parentCommentId(null)
                .isEdited(false)
                .isDeleted(false)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Comment savedComment = commentRepository.save(comment);

        post.setCommentCount(post.getCommentCount()+1);
        postRepository.save(post);

        return commentMapper.mapToCommentResponse(savedComment);
    }

    public List<CommentResponse> getComments(String postId){
        Post post = postRepository.findById(postId)
                .orElseThrow(()->new ResourceNotFoundException("Post is not available"));

        List<Comment> comments = commentRepository.findAllByPostIdAndIsDeletedFalseOrderByCreatedAtAsc(post.getPostId());

        return commentMapper.mapToCommentResponseList(comments);
    }

    public CommentResponse updateComment(String commentId, UpdateCommentRequest commentRequest){
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(()->new ResourceNotFoundException("Comment doesnt exist."));

        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();

        if(!comment.getAuthorUserId().equals(currentUser.getUserId())){
            throw new IllegalArgumentException("You can only edit you own comments.");
        }

        if (comment.isDeleted()) {
            throw new IllegalArgumentException("Deleted comments cannot be edited.");
        }



        if(trimToNull(commentRequest.getContent()) == null){
            throw new IllegalArgumentException("Content cannot be empty.");
        }

        comment.setContent(commentRequest.getContent());
        comment.setEdited(true);
        comment.setUpdatedAt(LocalDateTime.now());
        commentRepository.save(comment);

        return commentMapper.mapToCommentResponse(comment);
    }

    public void deleteComment(String commentId){
        User user = authenticatedUserProvider.getCurrentAuthenticatedUser();

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(()->new ResourceNotFoundException("Comment doesn't found."));

        Post post = postRepository.findById(comment.getPostId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Post not found."));



        if (comment.isDeleted()) {
            throw new IllegalArgumentException("Comment is already deleted.");
        }

        if(!comment.getAuthorUserId().equals(user.getUserId())){
            throw new IllegalArgumentException("You can only delete your own comments.");
        }

        comment.setDeleted(true);;
        comment.setUpdatedAt(LocalDateTime.now());

        post.setCommentCount(
                Math.max(0L, post.getCommentCount() - 1)
        );

        postRepository.save(post);

        commentRepository.save(comment);
    }
}

