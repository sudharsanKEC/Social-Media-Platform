package com.socialMedia.platform.follow.service;

import com.socialMedia.platform.exception.ResourceNotFoundException;
import com.socialMedia.platform.follow.model.Follow;
import com.socialMedia.platform.follow.model.FollowStatus;
import com.socialMedia.platform.follow.repository.FollowRepository;
import com.socialMedia.platform.model.FollowPrivacy;
import com.socialMedia.platform.model.User;
import com.socialMedia.platform.post.service.util.AuthenticatedUserProvider;
import com.socialMedia.platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService{

    private final AuthenticatedUserProvider authenticatedUserProvider;
    private final UserRepository userRepository;
    private final FollowRepository followRepository;

    @Override
    public void follow(String userId){
        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();

        if(currentUser.getUserId().equals(userId)){
            throw new IllegalArgumentException("You cannot follow yourself.");
        }

        User targetUser = userRepository.findById(userId)
                .orElseThrow(()->new ResourceNotFoundException("User not found exception"));

        Follow existingFollow = followRepository.findByFollowerUserIdAndFollowingUserId(currentUser.getUserId(),userId);
        if(existingFollow != null){

            if(existingFollow.getStatus() == FollowStatus.PENDING){
                throw new IllegalArgumentException("Request already exists.");
            }

            if(existingFollow.getStatus() == FollowStatus.ACCEPTED){
                throw new IllegalArgumentException("Already following.");
            }

            // If the existingFollow's status is in REJECTED then the below is the logic that should be applied.
            if (targetUser.getFollowPrivacy() == FollowPrivacy.PUBLIC) {

                existingFollow.setStatus(FollowStatus.ACCEPTED);
                existingFollow.setRespondedAt(LocalDateTime.now());

                targetUser.setUserFollowersCount(targetUser.getUserFollowersCount() + 1);
                userRepository.save(targetUser);

            } else {

                existingFollow.setStatus(FollowStatus.PENDING);
                existingFollow.setRequestedAt(LocalDateTime.now());
                existingFollow.setRespondedAt(null);

            }

            followRepository.save(existingFollow);
            return;
        }

        Follow follow = Follow.builder()
                .followerUserId(currentUser.getUserId())
                .followingUserId(userId)
                .requestedAt(LocalDateTime.now())
                .build();

        if(targetUser.getFollowPrivacy() == FollowPrivacy.PUBLIC){

            follow.setStatus(FollowStatus.ACCEPTED);
            follow.setRespondedAt(LocalDateTime.now());

            targetUser.setUserFollowersCount(targetUser.getUserFollowersCount()+1);

            userRepository.save(targetUser);
        }
        else{
            follow.setStatus(FollowStatus.PENDING);
        }
        followRepository.save(follow);
    }

    @Override
    public void acceptFollowRequest(String followId){
        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();

        Follow follow = followRepository.findById(followId)
                .orElseThrow(()->new ResourceNotFoundException("Follow request not found."));

        if(!follow.getFollowingUserId().equals(currentUser.getUserId())){
            throw new IllegalArgumentException("You are not allowed to accept this follow request.");
        }

        if(follow.getStatus() != FollowStatus.PENDING){
            throw new IllegalArgumentException("Request has already been processed.");
        }

        follow.setStatus(FollowStatus.ACCEPTED);
        follow.setRespondedAt(LocalDateTime.now());

        currentUser.setUserFollowersCount(currentUser.getUserFollowersCount()+1);

        userRepository.save(currentUser);
        followRepository.save(follow);
    }

    public void rejectFollowRequest(String followId){
        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();
        Follow follow = followRepository.findById(followId)
                .orElseThrow(()-> new ResourceNotFoundException("Follow requests not found."));

        // only the receiver can reject.
        if(!follow.getFollowingUserId().equals(currentUser.getUserId())){
            throw new IllegalArgumentException("You are not allowed to reject this follow request.");
        }
        follow.setStatus(FollowStatus.REJECTED);
        follow.setRespondedAt(LocalDateTime.now());

        followRepository.save(follow);
    }

    @Override
    public void cancelFollowRequest(String followId){
        // Logged-in user
        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();

        // Find follow request
        Follow follow = followRepository.findById(followId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Follow request not found."));

        // Only sender can cancel
        if (!follow.getFollowerUserId().equals(currentUser.getUserId())) {
            throw new IllegalArgumentException(
                    "You are not allowed to cancel this follow request."
            );
        }

        // Only pending requests can be cancelled
        if (follow.getStatus() != FollowStatus.PENDING) {
            throw new IllegalArgumentException(
                    "Only pending follow requests can be cancelled."
            );
        }

        // Delete the request
        followRepository.delete(follow);
    }

    @Override
    public void unfollow(String userId) {

        // Logged-in user
        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();

        // Find follow relationship
        Follow follow = followRepository
                .findByFollowerUserIdAndFollowingUserId(
                        currentUser.getUserId(),
                        userId
                );

        if (follow == null) {
            throw new ResourceNotFoundException("Follow relationship not found.");
        }

        // Only accepted follows can be unfollowed
        if (follow.getStatus() != FollowStatus.ACCEPTED) {
            throw new IllegalArgumentException(
                    "You are not following this user."
            );
        }

        // Target user
        User targetUser = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found."));

        // Decrease follower count
        targetUser.setUserFollowersCount(
                targetUser.getUserFollowersCount() - 1
        );

        userRepository.save(targetUser);

        // Remove follow relationship
        followRepository.delete(follow);
    }

    @Override
    public void removeFollower(String followerUserId) {

        // Logged-in user
        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();

        // Find follow relationship
        Follow follow = followRepository.findByFollowerUserIdAndFollowingUserId(
                followerUserId,
                currentUser.getUserId()
        );

        if (follow == null) {
            throw new ResourceNotFoundException("Follower relationship not found.");
        }

        // Only accepted followers can be removed
        if (follow.getStatus() != FollowStatus.ACCEPTED) {
            throw new IllegalArgumentException(
                    "User is not your follower."
            );
        }

        // Decrease current user's follower count
        currentUser.setUserFollowersCount(
                currentUser.getUserFollowersCount() - 1
        );

        userRepository.save(currentUser);

        // Remove follow relationship
        followRepository.delete(follow);
    }
}
