package com.socialMedia.platform.friend.service;

import com.socialMedia.platform.exception.ResourceNotFoundException;
import com.socialMedia.platform.friend.dto.FriendResponse;
import com.socialMedia.platform.friend.dto.PendingFriendRequestResponse;
import com.socialMedia.platform.friend.model.Friend;
import com.socialMedia.platform.friend.model.FriendRequestStatus;
import com.socialMedia.platform.friend.repository.FriendRepository;
import com.socialMedia.platform.model.User;
import com.socialMedia.platform.post.service.util.AuthenticatedUserProvider;
import com.socialMedia.platform.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class FriendQueryServiceImpl implements FriendQueryService{

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;
    private final AuthenticatedUserProvider authenticatedUserProvider;

    @Override
    public List<PendingFriendRequestResponse> getPendingFriendRequests(){
        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();

        List<Friend> requests = friendRepository
                .findAllByReceiverUserIdAndStatusOrderByCreatedAtDesc(
                        currentUser.getUserId(),
                        FriendRequestStatus.PENDING
                );
        List<PendingFriendRequestResponse> response = new ArrayList<>();

        for(Friend friend : requests){

            User sender = userRepository.findById(friend.getRequestUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found. "));

            response.add(
                    PendingFriendRequestResponse.builder()
                            .friendRequestId(friend.getFriendId())
                            .senderUserId(sender.getUserId())
                            .senderUserName(sender.getUserName())
                            .senderProfilePhotoUrl(sender.getUserProfilePhotoUrl())
                            .requestSentTime(friend.getCreatedAt())
                            .build()
            );
        }
        return response;
    }

    @Override
    public List<PendingFriendRequestResponse> getSentFriendRequests(){

        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();

        List<Friend> requests = friendRepository
                .findAllByRequestUserIdAndStatusOrderByCreatedAtDesc(
                        currentUser.getUserId(),
                        FriendRequestStatus.PENDING
                        );

        List<PendingFriendRequestResponse> response = new ArrayList<>();

        for(Friend friend : requests){

            User receiver = userRepository.findById(friend.getReceiverUserId())
                    .orElseThrow(()-> new ResourceNotFoundException("User not found. "));

            response.add(
                    PendingFriendRequestResponse.builder()
                            .friendRequestId(friend.getFriendId())
                            .senderUserId(receiver.getUserId())
                            .senderUserName(receiver.getUserName())
                            .senderProfilePhotoUrl(receiver.getUserProfilePhotoUrl())
                            .requestSentTime(friend.getCreatedAt())
                            .build()
            );
        }
        return response;
    }

    @Override
    public List<FriendResponse> getFriends() {

        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();

        List<Friend> friends =
                friendRepository.findAllByStatusAndRequestUserIdOrStatusAndReceiverUserId(
                        FriendRequestStatus.ACCEPTED,
                        currentUser.getUserId(),
                        FriendRequestStatus.ACCEPTED,
                        currentUser.getUserId()
                );

        List<FriendResponse> response = new ArrayList<>();

        for (Friend friend : friends) {

            String friendUserId;

            if (friend.getRequestUserId().equals(currentUser.getUserId())) {
                friendUserId = friend.getReceiverUserId();
            } else {
                friendUserId = friend.getRequestUserId();
            }

            User friendUser = userRepository.findById(friendUserId)
                    .orElseThrow(() ->
                            new ResourceNotFoundException("User not found."));

            response.add(
                    FriendResponse.builder()
                            .userId(friendUser.getUserId())
                            .userName(friendUser.getUserName())
                            .profilePhotoUrl(friendUser.getUserProfilePhotoUrl())
                            .build()
            );
        }

        return response;
    }

}
