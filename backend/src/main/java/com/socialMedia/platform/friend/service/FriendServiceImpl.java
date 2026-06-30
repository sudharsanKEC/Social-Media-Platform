package com.socialMedia.platform.friend.service;

import com.socialMedia.platform.exception.ResourceNotFoundException;
import com.socialMedia.platform.friend.dto.FriendRequestResponse;
import com.socialMedia.platform.friend.model.Friend;
import com.socialMedia.platform.friend.model.FriendRequestStatus;
import com.socialMedia.platform.friend.repository.FriendRepository;
import com.socialMedia.platform.model.User;
import com.socialMedia.platform.post.service.util.AuthenticatedUserProvider;
import com.socialMedia.platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService{

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;
    private final AuthenticatedUserProvider authenticatedUserProvider;

    @Override
    public FriendRequestResponse sendFriendRequest(String receiverUserId){

        User sender = authenticatedUserProvider.getCurrentAuthenticatedUser();

        User receiver = userRepository.findById(receiverUserId)
                .orElseThrow(()->new ResourceNotFoundException("User not found."));

        if(sender.getUserId().equals(receiver.getUserId())){
            throw new IllegalArgumentException("You cannot send a friend request to yourself.");
        }

        Optional<Friend> existingFriend =
                friendRepository.findByRequestUserIdAndReceiverUserIdAndStatus(
                        sender.getUserId(),
                        receiver.getUserId(),
                        FriendRequestStatus.ACCEPTED
                );

        if(existingFriend.isPresent()){
            throw new IllegalArgumentException("You are already friends.");
        }

        Friend reverseRequest = friendRepository
                .findByRequestUserIdAndReceiverUserIdAndStatus(
                        receiverUserId,
                        sender.getUserId(),
                        FriendRequestStatus.PENDING
                )
                .orElse(null);

        if (reverseRequest != null) {

            reverseRequest.setStatus(FriendRequestStatus.ACCEPTED);
            reverseRequest.setRespondedAt(LocalDateTime.now());

            sender.setUserFriendsCount(sender.getUserFriendsCount() + 1);
            receiver.setUserFriendsCount(receiver.getUserFriendsCount() + 1);

            friendRepository.save(reverseRequest);

            userRepository.save(sender);
            userRepository.save(receiver);

            return FriendRequestResponse.builder()
                    .requestId(reverseRequest.getFriendId())
                    .requestSentTime(reverseRequest.getCreatedAt())
                    .status(reverseRequest.getStatus())
                    .build();
        }


        Friend reverseRequestDuplicate = friendRepository
                .findByRequestUserIdAndReceiverUserIdAndStatus(
                        receiverUserId,
                        sender.getUserId(),
                        FriendRequestStatus.ACCEPTED
                )
                .orElse(null);

        if(reverseRequestDuplicate != null){
            throw new IllegalArgumentException("Already friends.");
        }

        if(friendRepository.existsByRequestUserIdAndReceiverUserId(
                sender.getUserId(),
                receiver.getUserId() )){
            throw new IllegalArgumentException("Friend Request Already exists.");
        }

        Friend friend = Friend.builder()
                .requestUserId(sender.getUserId())
                .receiverUserId(receiver.getUserId())
                .status(FriendRequestStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();

        friendRepository.save(friend);
        return FriendRequestResponse.builder()
                .requestId(friend.getFriendId())
                .requestSentTime(friend.getCreatedAt())
                .status(friend.getStatus())
                .build();
    }

    @Override
    public void acceptFriendRequest(String friendRequestId){
        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();

        Friend friendRequest = friendRepository.findById(friendRequestId)
                .orElseThrow(()-> new ResourceNotFoundException("Friend request not found."));

        if(!friendRequest.getReceiverUserId().equals(currentUser.getUserId())){
            throw new IllegalArgumentException("Only the receiver can accept this friend request.");
        }

        if(friendRequest.getStatus() != FriendRequestStatus.PENDING){
            throw new IllegalArgumentException("Friend request has been already responded.");
        }

        User sender = userRepository.findById(friendRequest.getRequestUserId())
                .orElseThrow(()-> new ResourceNotFoundException("Sender not found."));

        User receiver = userRepository.findById(friendRequest.getReceiverUserId())
                .orElseThrow(()->new ResourceNotFoundException("Receiver not found."));

        friendRequest.setStatus(FriendRequestStatus.ACCEPTED);
        friendRequest.setRespondedAt(LocalDateTime.now());

        sender.setUserFriendsCount(sender.getUserFriendsCount()+1);
        receiver.setUserFriendsCount(receiver.getUserFriendsCount()+1);

        friendRepository.save(friendRequest);

        userRepository.save(sender);
        userRepository.save(receiver);

    }
}
