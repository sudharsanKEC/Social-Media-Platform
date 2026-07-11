package com.socialMedia.platform.follow.controller;

import com.socialMedia.platform.follow.dto.FollowResponse;
import com.socialMedia.platform.follow.service.FollowQueryService;
import com.socialMedia.platform.follow.service.FollowQueryServiceImpl;
import com.socialMedia.platform.follow.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/follow")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;
    private final FollowQueryService followQueryService;

    @PostMapping("/{userId}")
    public ResponseEntity<Void> follow(@PathVariable String userId){
        followService.follow(userId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{followId}/accept")
    public ResponseEntity<Void> acceptFollowRequest(@PathVariable String followId){
        followService.acceptFollowRequest(followId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{followId}/reject")
    public ResponseEntity<Void> rejectFollowRequest(@PathVariable String followId){
        followService.rejectFollowRequest(followId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{followId}/cancel")
    public ResponseEntity<Void> cancelFollowRequest(
            @PathVariable String followId) {

        followService.cancelFollowRequest(followId);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> unfollow(
            @PathVariable String userId) {

        followService.unfollow(userId);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/followers/{followerUserId}")
    public ResponseEntity<Void> removeFollower(
            @PathVariable String followerUserId) {

        followService.removeFollower(followerUserId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/followers")
    public ResponseEntity<List<FollowResponse>> getFollowers() {

        return ResponseEntity.ok(
                followQueryService.getFollowers()
        );
    }

    @GetMapping("/following")
    public ResponseEntity<List<FollowResponse>> getFollowing() {

        return ResponseEntity.ok(
                followQueryService.getFollowing()
        );
    }

    @GetMapping("/requests")
    public ResponseEntity<List<FollowResponse>> getPendingFollowRequests() {

        return ResponseEntity.ok(
                followQueryService.getPendingFollowRequests()
        );
    }

    @GetMapping("/sent-requests")
    public ResponseEntity<List<FollowResponse>> getSentFollowRequests() {

        return ResponseEntity.ok(
                followQueryService.getSentFollowRequests()
        );
    }

}
