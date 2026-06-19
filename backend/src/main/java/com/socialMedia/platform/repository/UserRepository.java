package com.socialMedia.platform.repository;

import com.socialMedia.platform.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, Long> {
    Optional<User> findByUserEmail(String email);
    Optional<User> findByUserName(String username);
    boolean existsByUserName(String username);
}
