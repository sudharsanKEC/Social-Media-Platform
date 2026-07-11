package com.socialMedia.platform.friend.controller;

import com.socialMedia.platform.friend.dto.FriendRequest;
import com.socialMedia.platform.friend.dto.FriendRequestResponse;
import com.socialMedia.platform.friend.dto.FriendResponse;
import com.socialMedia.platform.friend.dto.PendingFriendRequestResponse;
import com.socialMedia.platform.friend.service.FriendQueryService;
import com.socialMedia.platform.friend.service.FriendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friends")
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;
    private final FriendQueryService friendQueryService;

    @PostMapping
    public ResponseEntity<FriendRequestResponse> friendRequest(@RequestBody FriendRequest request){

        FriendRequestResponse response = friendService.sendFriendRequest(request.getReceiverId());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/{friendRequestId}/accept")
    public ResponseEntity<String> acceptFriendRequest(
            @PathVariable String friendRequestId) {

        friendService.acceptFriendRequest(friendRequestId);

        return ResponseEntity.ok("Friend request accepted.");
    }

    @PostMapping("/{friendRequestId}/reject")
    public ResponseEntity<String> rejectFriendRequest(@PathVariable String friendRequestId){
        friendService.rejectFriendRequest(friendRequestId);
        return ResponseEntity.ok("Friend request rejected. ");
    }

    @PostMapping("/{friendRequestId}/cancel")
    public ResponseEntity<String> cancelFriendRequest(@PathVariable String friendRequestId){
        friendService.cancelFriendRequest(friendRequestId);
        return ResponseEntity.ok("Friend request cancelled. ");
    }

    @GetMapping("/requests")
    public ResponseEntity<List<PendingFriendRequestResponse>> getPendingFriendRequests(){
        return ResponseEntity.ok(friendQueryService.getPendingFriendRequests());
    }

    @GetMapping("/friendRequests")
    public ResponseEntity<List<PendingFriendRequestResponse>> getSentFriendRequests(){
        return ResponseEntity.ok(friendQueryService.getSentFriendRequests());
    }

    @GetMapping
    public ResponseEntity<List<FriendResponse>> getFriends() {
        return ResponseEntity.ok(friendQueryService.getFriends());
    }

    @DeleteMapping("/{friendUserId}")
    public ResponseEntity<Void> unfriend(
            @PathVariable String friendUserId) {

        friendService.unfriend(friendUserId);

        return ResponseEntity.noContent().build();

    }


}
