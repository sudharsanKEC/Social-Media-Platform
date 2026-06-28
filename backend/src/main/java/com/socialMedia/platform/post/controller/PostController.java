package com.socialMedia.platform.post.controller;

import com.socialMedia.platform.post.dto.comment.CommentResponse;
import com.socialMedia.platform.post.dto.comment.CreateCommentRequest;
import com.socialMedia.platform.post.dto.comment.UpdateCommentRequest;
import com.socialMedia.platform.post.dto.post.CreatePostRequest;
import com.socialMedia.platform.post.dto.post.PostResponse;
import com.socialMedia.platform.post.dto.post.UpdatePostRequest;
import com.socialMedia.platform.post.service.CommentService;
import com.socialMedia.platform.post.service.LikeService;
import com.socialMedia.platform.post.service.PostService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/posts")
public class PostController {

    private final PostService postService;
    private final LikeService likeService;
    private final CommentService commentService;

    public PostController(PostService postService, LikeService likeService, CommentService commentService){
        this.postService = postService;
        this.likeService = likeService;
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<PostResponse> createPost(@Valid @RequestBody CreatePostRequest postRequest){
        PostResponse postResponse = postService.createPost(postRequest);
        return ResponseEntity.ok(postResponse); // the postResponse object will be converted to json later by jackson.
    }

    @GetMapping("{id}")
    public ResponseEntity<PostResponse> getPost(@PathVariable("id") String postId){
        PostResponse postResponse = postService.getPostById(postId);
        return ResponseEntity.ok(postResponse);
    }

    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPosts() {
        return ResponseEntity.ok(
          postService.getAllPosts()
        );
    }

    @PutMapping("/{postId}")
    public ResponseEntity<PostResponse> updatePost(@PathVariable String postId, @RequestBody UpdatePostRequest request){
        return ResponseEntity.ok(postService.updatePost(postId, request));
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable String postId){
        postService.deletePost(postId);
        return ResponseEntity.ok("Post deleted successfully.");
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<String> likePost(@PathVariable String postId){
        likeService.likePost(postId);
        return ResponseEntity.ok("Post liked successfully.");
    }

    @DeleteMapping("/{postId}/like")
    public ResponseEntity<String> unlikePost(@PathVariable String postId){
        likeService.unlikePost(postId);
        return ResponseEntity.ok("Post unliked successfully.");
    }

    @PostMapping("/{postId}/comments")
    public ResponseEntity<CommentResponse> addComment(@PathVariable String postId, @RequestBody CreateCommentRequest request){
        return ResponseEntity.ok(commentService.addComment(postId, request));
    }

    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<CommentResponse>> getComments(@PathVariable String postId){
        return ResponseEntity.ok(commentService.getComments(postId));
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
