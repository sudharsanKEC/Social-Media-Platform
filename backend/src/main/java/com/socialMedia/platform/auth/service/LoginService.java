package com.socialMedia.platform.auth.service;

import com.socialMedia.platform.auth.dto.LoginResponse;
import com.socialMedia.platform.exception.InvalidPasswordException;
import com.socialMedia.platform.exception.UserNotFoundException;
import com.socialMedia.platform.model.User;
import com.socialMedia.platform.repository.UserRepository;
import com.socialMedia.platform.security.JwtService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class LoginService {
    private final UserRepository userRepo;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    public LoginService(UserRepository userRepo, BCryptPasswordEncoder passwordEncoder, JwtService jwtService){
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
//        this.loginResponse = loginResponse;
    }

    public LoginResponse handleLogin(String email, String password){
        User user = userRepo.findByUserEmail(email).orElseThrow(()->{
            return new UserNotFoundException("Invalid email or password");
        });

        if(!(passwordEncoder.matches(password, user.getUserPassword()))){
            throw new InvalidPasswordException("Invalid email or password");
        }

        user.setLastLogin(LocalDateTime.now());
        userRepo.save(user);
        String token = jwtService.generateToken(email);

        return new LoginResponse(email, token, user.getUserName());
    }

}
