package com.socialMedia.platform.auth.service;

import com.socialMedia.platform.auth.model.OtpVerification;
import com.socialMedia.platform.exception.*;
import com.socialMedia.platform.model.User;
import com.socialMedia.platform.auth.repository.OtpVerificationRepository;
import com.socialMedia.platform.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class SignupService {

    private final UserRepository userRepository;
    private final OtpVerificationRepository otpRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    public SignupService(UserRepository userRepository, OtpVerificationRepository otpRepository, BCryptPasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.otpRepository = otpRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private static final Pattern PASSWORD_PATTERN = Pattern.compile("^[A-Za-z0-9!@#$%^&*()_+=<>?/.,;:'\"\\\\|{}\\[\\]-]{6,}$");

    public String createUser(String email, String username, String password, String confirmPassword){

        Optional<OtpVerification> emailInDb = otpRepository.findByEmail(email);
        if(!emailInDb.isPresent()){
            throw new EmailNotFoundException("Email not found, please register and verify your email!");
        }

        OtpVerification emailExists = emailInDb.get();
        if(!emailExists.isVerified()){
            throw new EmailNotVerifiedException("Email is not verified, please verify the Email!");
        }

        Optional<User> existingUser = userRepository.findByUserEmail(email);
        if(existingUser.isPresent()){
            throw new UserAlreadyExistsException("User already exists with that email ID, please do login.");
        }

        if(userRepository.existsByUserName(username)){
            throw new UserNameAlreadyExistsException("Username already taken, please enter a unique username.");
        }

        if(password.length()<6 || password.length()>25){
            throw new InvalidPasswordLengthException("Password length must be greater than or equal to 6 and less than or equal to 25");
        }

        if(!PASSWORD_PATTERN.matcher(password).matches()){
            throw new InvalidPasswordException("Password should only contain A-Z, a-z, 0-9 and special characters");
        }

        if(!password.equals(confirmPassword)){
            throw new PasswordMisMatchException("Password and confirm password doesn't match, please enter both correctly.");
        }

        // password regex
        if(username.trim().length() == 0){

        }


        User user = new User();

        user.setUserName(username);
        user.setUserEmail(email);
        user.setUserPassword(passwordEncoder.encode(password));

        user.setUserFollowersCount(0L);
        user.setUserFriendsCount(0L);

        user.setUserProfilePhotoUrl(null);
        user.setUserDescription(null);
        user.setUserSummary(null);

        user.setUserCreatedAt(LocalDateTime.now());

        user.setUserPostsCount(0L);
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        return "Successfully registered your account, you can start explore!";
    }
}
