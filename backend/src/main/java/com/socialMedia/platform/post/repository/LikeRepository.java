package com.socialMedia.platform.post.repository;

import com.socialMedia.platform.post.model.postActivities.Like;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends MongoRepository<Like, String> {

    Optional<Like> findByPostIdAndUserId(String postId, String userId); // to know whether a particular user like a particular post

    List<Like> findAllByPostId(String postId); // Returns all Like documents(Like model) for the given postId.

    Long countByPostId(String postId); // count how many likes a given post have

    boolean existsByPostIdAndUserId(String postId, String userId); // returns true if the given postId was liked by the given userId.

    List<Like> findAllByUserIdOrderByLikedAtDesc(String userId);

}
