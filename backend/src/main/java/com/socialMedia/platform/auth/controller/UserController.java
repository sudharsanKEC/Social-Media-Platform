package com.socialMedia.platform.auth.controller;

import com.socialMedia.platform.auth.dto.UpdateProfileRequest;
import com.socialMedia.platform.model.User;
import com.socialMedia.platform.model.FollowPrivacy;
import com.socialMedia.platform.repository.UserRepository;
import com.socialMedia.platform.post.service.util.AuthenticatedUserProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import com.socialMedia.platform.auth.dto.UserDto;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final AuthenticatedUserProvider authenticatedUserProvider;

    public UserController(UserRepository userRepository, AuthenticatedUserProvider authenticatedUserProvider) {
        this.userRepository = userRepository;
        this.authenticatedUserProvider = authenticatedUserProvider;
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getMe() {
        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();
        return ResponseEntity.ok(new UserDto(currentUser));
    }

    @PutMapping("/me")
    public ResponseEntity<UserDto> updateProfile(@RequestBody UpdateProfileRequest request) {
        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();
        
        if (request.getDescription() != null) {
            currentUser.setUserDescription(request.getDescription());
        }
        if (request.getSummary() != null) {
            currentUser.setUserSummary(request.getSummary());
        }
        if (request.getFollowPrivacy() != null) {
            try {
                currentUser.setFollowPrivacy(FollowPrivacy.valueOf(request.getFollowPrivacy().toUpperCase()));
            } catch (IllegalArgumentException e) {
                // Ignore invalid values
            }
        }
        if (request.getProfilePhotoUrl() != null) {
            currentUser.setUserProfilePhotoUrl(request.getProfilePhotoUrl());
        }
        
        userRepository.save(currentUser);
        return ResponseEntity.ok(new UserDto(currentUser));
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();
        List<UserDto> users = userRepository.findAll().stream()
                .filter(user -> !user.getUserId().equals(currentUser.getUserId()))
                .map(UserDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchUsers(@RequestParam("query") String query) {
        User currentUser = authenticatedUserProvider.getCurrentAuthenticatedUser();
        List<UserDto> users = userRepository.findAll().stream()
                .filter(user -> !user.getUserId().equals(currentUser.getUserId()) && 
                        (user.getUserName().toLowerCase().contains(query.toLowerCase()) || 
                         user.getUserEmail().toLowerCase().contains(query.toLowerCase())))
                .map(UserDto::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }
}
