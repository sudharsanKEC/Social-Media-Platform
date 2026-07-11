package com.socialMedia.platform.post.repository;

import com.socialMedia.platform.post.model.postActivities.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findAllByPostIdAndIsDeletedFalseOrderByCreatedAtAsc(String postId);
    List<Comment> findAllByAuthorUserIdAndIsDeletedFalseOrderByCreatedAtDesc(String authorUserId);
}
