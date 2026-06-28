package com.socialMedia.platform.post.repository;

import com.socialMedia.platform.post.model.post.Post;
import com.socialMedia.platform.post.model.post.PostVisibility;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostRepository extends MongoRepository<Post, String> {

    List<Post> findAllByVisibilityAndIsDeletedFalseOrderByCreatedAtDesc(PostVisibility visibility);
    List<Post> findAllByAuthorUserIdAndIsDeletedFalseOrderByCreatedAtDesc(String authorUserId);
}
