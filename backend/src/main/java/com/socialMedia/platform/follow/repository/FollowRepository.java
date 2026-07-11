package com.socialMedia.platform.follow.repository;
import com.socialMedia.platform.follow.model.Follow;
import com.socialMedia.platform.follow.model.FollowStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FollowRepository extends MongoRepository<Follow, String> {

    boolean existsByFollowerUserIdAndFollowingUserId(
            String followerUserId,
            String followingUserId
    );

    Follow findByFollowerUserIdAndFollowingUserId(
            String followerUserId,
            String followingUserId
    );

    List<Follow> findAllByFollowingUserIdAndStatusOrderByRequestedAtDesc(
            String followingUserId,
            FollowStatus status
    );

    List<Follow> findAllByFollowerUserIdAndStatusOrderByRequestedAtDesc(
            String followerUserId,
            FollowStatus status
    );
}