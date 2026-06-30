package com.socialMedia.platform.friend.service;

import com.socialMedia.platform.exception.ResourceNotFoundException;
import com.socialMedia.platform.friend.dto.FriendRequestResponse;
import com.socialMedia.platform.friend.dto.PendingFriendRequestResponse;
import com.socialMedia.platform.friend.model.Friend;
import com.socialMedia.platform.friend.model.FriendRequestStatus;
import com.socialMedia.platform.friend.repository.FriendRepository;
import com.socialMedia.platform.model.User;
import com.socialMedia.platform.post.service.util.AuthenticatedUserProvider;
import com.socialMedia.platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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

        // Already friends? (sender -> receiver)
        Optional<Friend> existingFriend =
                friendRepository.findByRequestUserIdAndReceiverUserIdAndStatus(
                        sender.getUserId(),
                        receiver.getUserId(),
                        FriendRequestStatus.ACCEPTED
                );

        if(existingFriend.isEmpty()){
            existingFriend = friendRepository
                    .findByRequestUserIdAndReceiverUserIdAndStatus(
                            receiver.getUserId(),
                            sender.getUserId(),
                            FriendRequestStatus.ACCEPTED
                    );
        }

        if(existingFriend.isPresent()){
            throw new IllegalArgumentException("You are already friends.");
        }
        /*
            Why the above condition?
                    When User A sends a request User B.
                    And lets consider that was accepted.
                    Now the requestedUserId will be the User A and the receiverUserId will be the User B.
                    Now we are checking whether that combination of document exists in the db first with the friendship status accepted, in this line: Optional<Friend> existingFriend =friendRepository.findByRequestUserIdAndReceiverUserIdAndStatus(...);
                    If not, then we are checking whether User B requested the User A and from that combination the status = accepted is existing or not, in this line: if(existingFriend.isEmpty()) and inside it the mongoDB querying: existingFriend = friendRepository.findByRequestUserIdAndReceiverUserIdAndStatus(...);
                    If any of the condition was true, then the exception You are already friends will be thrown.
            Note: In the mongoDB querying lines:
                        i)  findByRequestUserIdAndReceiverUserIdAndStatus(sender.getUserId(), receiver.getUserId(), FriendRequestStatus.ACCEPTED);
                        ii) findByRequestUserIdAndReceiverUserIdAndStatus(receiver.getUserId(), sender.getUserId(), FriendRequestStatus.ACCEPTED);
                    Notice how the parameter passing changes according to the sender and receiver.

        */

        // checking whether current request's receiver have already sent a request to the current send.
        // If that exists then the request will be considered accepted automatically.
        Friend reverseRequest = friendRepository
                .findByRequestUserIdAndReceiverUserIdAndStatus(
                        receiverUserId,
                        sender.getUserId(),
                        FriendRequestStatus.PENDING
                )
                .orElse(null);

        // If that kind requests exists already, then the logic for making each others friends is written below.
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

        Friend savedFriend = friendRepository.save(friend);
        return FriendRequestResponse.builder()
                .requestId(savedFriend.getFriendId())
                .requestSentTime(savedFriend.getCreatedAt())
                .status(savedFriend.getStatus())
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

    @Override
    public void rejectFriendRequest(String friendRequestId){
        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();

        Friend friendRequest = friendRepository.findById(friendRequestId)
                .orElseThrow(()->new ResourceNotFoundException("Friend request not found."));

        // Only receiver can reject
        if(!friendRequest.getReceiverUserId().equals(currentUser.getUserId())){
            throw new IllegalArgumentException("Only the receiver can reject this friend request. ");
        }

        if(friendRequest.getStatus() != FriendRequestStatus.PENDING){
            throw new IllegalArgumentException("Friend request has already been processed. ");
        }

        friendRequest.setStatus(FriendRequestStatus.REJECTED);
        friendRequest.setRespondedAt(LocalDateTime.now());

        friendRepository.save(friendRequest);
    }

    @Override
    public void cancelFriendRequest(String friendRequestId){
        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();

        Friend friendRequest = friendRepository.findById(friendRequestId)
                .orElseThrow(()-> new ResourceNotFoundException("Friend request not found. "));

        if(!friendRequest.getRequestUserId().equals(currentUser.getUserId())){
            throw new IllegalArgumentException("Only the sender can cancel this friend request. ");
        }

        if(friendRequest.getStatus() != FriendRequestStatus.PENDING){
            throw new IllegalArgumentException("Only pending friend requests can be cancelled. ");
        }

        friendRequest.setStatus(FriendRequestStatus.CANCELLED);
        friendRequest.setRespondedAt(LocalDateTime.now());

        friendRepository.save(friendRequest);
    }

}
