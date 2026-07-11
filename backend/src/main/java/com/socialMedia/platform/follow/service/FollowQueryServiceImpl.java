package com.socialMedia.platform.follow.service;

import com.socialMedia.platform.exception.ResourceNotFoundException;
import com.socialMedia.platform.follow.dto.FollowResponse;
import com.socialMedia.platform.follow.model.Follow;
import com.socialMedia.platform.follow.model.FollowStatus;
import com.socialMedia.platform.follow.repository.FollowRepository;
import com.socialMedia.platform.model.User;
import com.socialMedia.platform.post.service.util.AuthenticatedUserProvider;
import com.socialMedia.platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class FollowQueryServiceImpl implements FollowQueryService{
    private final AuthenticatedUserProvider authenticatedUserProvider;
    private final UserRepository userRepository;
    private final FollowRepository followRepository;

    @Override
    public List<FollowResponse> getFollowers() {

        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();

        List<Follow> followers = followRepository
                .findAllByFollowingUserIdAndStatusOrderByRequestedAtDesc(
                        currentUser.getUserId(),
                        FollowStatus.ACCEPTED
                );

        List<FollowResponse> response = new ArrayList<>();

        for (Follow follow : followers) {

            User follower = userRepository.findById(follow.getFollowerUserId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("User not found."));

            response.add(
                    FollowResponse.builder()
                            .userId(follower.getUserId())
                            .userName(follower.getUserName())
                            .profilePhotoUrl(follower.getUserProfilePhotoUrl())
                            .build()
            );
        }

        return response;
    }

    @Override
    public List<FollowResponse> getFollowing() {

        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();

        List<Follow> following = followRepository
                .findAllByFollowerUserIdAndStatusOrderByRequestedAtDesc(
                        currentUser.getUserId(),
                        FollowStatus.ACCEPTED
                );

        List<FollowResponse> response = new ArrayList<>();

        for (Follow follow : following) {

            User followingUser = userRepository.findById(
                            follow.getFollowingUserId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("User not found."));

            response.add(
                    FollowResponse.builder()
                            .userId(followingUser.getUserId())
                            .userName(followingUser.getUserName())
                            .profilePhotoUrl(followingUser.getUserProfilePhotoUrl())
                            .build()
            );
        }

        return response;
    }

    @Override
    public List<FollowResponse> getPendingFollowRequests() {

        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();

        List<Follow> requests = followRepository
                .findAllByFollowingUserIdAndStatusOrderByRequestedAtDesc(
                        currentUser.getUserId(),
                        FollowStatus.PENDING
                );

        List<FollowResponse> response = new ArrayList<>();

        for (Follow follow : requests) {

            User requester = userRepository.findById(
                            follow.getFollowerUserId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("User not found."));

            response.add(
                    FollowResponse.builder()
                            .followId(follow.getFollowId())   // Important
                            .userId(requester.getUserId())
                            .userName(requester.getUserName())
                            .profilePhotoUrl(requester.getUserProfilePhotoUrl())
                            .build()
            );
        }

        return response;
    }

    @Override
    public List<FollowResponse> getSentFollowRequests() {

        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();

        List<Follow> sentRequests = followRepository
                .findAllByFollowerUserIdAndStatusOrderByRequestedAtDesc(
                        currentUser.getUserId(),
                        FollowStatus.PENDING
                );

        List<FollowResponse> response = new ArrayList<>();

        for (Follow follow : sentRequests) {

            User receiver = userRepository.findById(
                            follow.getFollowingUserId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("User not found."));

            response.add(
                    FollowResponse.builder()
                            .followId(follow.getFollowId())
                            .userId(receiver.getUserId())
                            .userName(receiver.getUserName())
                            .profilePhotoUrl(receiver.getUserProfilePhotoUrl())
                            .build()
            );
        }

        return response;
    }
}
