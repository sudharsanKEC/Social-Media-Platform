package com.socialMedia.platform.post.repository;

import com.socialMedia.platform.post.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostRepository extends MongoRepository<Post, String> {

    List<Post> findAllByIsDeletedFalseOrderByCreatedAtDesc();
    List<Post> findAllByAuthorUserIdAndIsDeletedFalseOrderByCreatedAtDesc(String authorUserId);
}
