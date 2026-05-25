package com.socialMedia.platform.service;

import com.socialMedia.platform.exception.InvalidPasswordException;
import com.socialMedia.platform.exception.UserNotFoundException;
import com.socialMedia.platform.model.User;
import com.socialMedia.platform.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class LoginService {
    private final UserRepository userRepo;
    private final BCryptPasswordEncoder passwordEncoder;
    public LoginService(UserRepository userRepo, BCryptPasswordEncoder passwordEncoder){
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public String handleLogin(String email, String password){
        User user = userRepo.findByUserEmail(email).orElseThrow(()->{
            return new UserNotFoundException("User doesn't found with that email id");
        });

        if(!(passwordEncoder.matches(password, user.getUserPassword()))){
            throw new InvalidPasswordException("Please enter the correct password");
        }

        user.setLastLogin(LocalDateTime.now());
        return user.getUserName();
    }

}
