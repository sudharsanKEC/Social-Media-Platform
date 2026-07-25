package com.socialMedia.platform.post.controller;

import com.socialMedia.platform.post.dto.comment.CommentResponse;
import com.socialMedia.platform.post.dto.comment.CreateCommentRequest;
import com.socialMedia.platform.post.dto.comment.UpdateCommentRequest;
import com.socialMedia.platform.post.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/posts")
public class CommentController {
    private final CommentService commentService;
    CommentController(CommentService commentService){
        this.commentService = commentService;
    }

    @PostMapping("/{postId}/comments")
    public ResponseEntity<CommentResponse> addComment(@PathVariable String postId, @RequestBody CreateCommentRequest request){
        return ResponseEntity.ok(commentService.addComment(postId, request));
    }

    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<CommentResponse>> getComments(@PathVariable String postId){
        return ResponseEntity.ok(commentService.getComments(postId));
    }

    @GetMapping("/my-comments")
    public ResponseEntity<List<CommentResponse>> getMyComments(){
        return ResponseEntity.ok(commentService.getMyComments());
    }

    @PutMapping("/comments/{commentId}")
    public ResponseEntity<CommentResponse> updateComment(@PathVariable String commentId, @RequestBody UpdateCommentRequest request){
        return ResponseEntity.ok(commentService.updateComment(commentId,request));
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable String commentId){
        commentService.deleteComment(commentId);
        return ResponseEntity.ok("Comment deleted successfully.");
    }
}
