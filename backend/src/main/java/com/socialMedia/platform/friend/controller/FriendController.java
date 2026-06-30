package com.socialMedia.platform.friend.controller;

import com.socialMedia.platform.friend.dto.FriendRequest;
import com.socialMedia.platform.friend.dto.FriendRequestResponse;
import com.socialMedia.platform.friend.service.FriendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/friends")
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;

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

}
