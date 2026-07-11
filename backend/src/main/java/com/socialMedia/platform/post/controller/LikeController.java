package com.socialMedia.platform.post.controller;

import com.socialMedia.platform.post.dto.post.PostResponse;
import com.socialMedia.platform.post.service.LikeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/posts")
public class LikeController {

    private final LikeService likeService;
    LikeController(LikeService likeService){
        this.likeService = likeService;
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

    @GetMapping
    public ResponseEntity<List<PostResponse>> getLikedPosts(){
        return ResponseEntity.ok(likeService.getLikedPosts());
    }

}
